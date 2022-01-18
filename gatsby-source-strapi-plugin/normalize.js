const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// utils
const isImage = (field) => field.hasOwnProperty('mime');
const isImageOrImages = (field) => {
  if (Array.isArray(field)) {
    return field.some((f) => isImage(f));
  }

  return isImage(field);
};

const extractFields = async (item, ctx) => {
  const {
    actions: { createNode },
    cache,
    createNodeId,
    store,
    strapiConfig: { apiURL },
  } = ctx;
  for (const key of Object.keys(item)) {
    const field = item[key];

    if (Array.isArray(field) && !isImageOrImages(field)) {
      // add recursion to fetch nested strapi references
      await Promise.all(field.map(async (f) => extractFields(f, ctx)));
    }

    // image fields have a mime property among other
    // maybe should find a better test
    if (field !== null && isImageOrImages(field)) {
      const images = await Promise.all(
        (Array.isArray(field) ? field : [field]).map(async (_field) => {
          let fileNodeID;

          // For now always download the file
          if (!fileNodeID) {
            try {
              // full media url
              const source_url = `${_field.url.startsWith('http') ? '' : apiURL}${_field.url}`;
              const fileNode = await createRemoteFileNode({
                url: source_url,
                store,
                cache,
                createNode,
                createNodeId,
              });

              if (fileNode) {
                fileNodeID = fileNode.id;
              }
            } catch (e) {
              // Ignore
              console.log(e);
            }
          }

          return fileNodeID;
        }),
      );

      if (images && images.length > 0) {
        // Here 2 nodes will be resolved by the same GQL field
        item[`${key}___NODE`] = Array.isArray(field) ? images : images[0];

        // Delete the other one
        delete item[key];
      }
    } else if (field !== null && typeof field === 'object') {
      extractFields(field, ctx);
    }
  }
};

// Downloads media from image type fields
exports.downloadMediaFiles = async (entities, ctx, contentTypeUid) =>
  Promise.all(
    entities.map(async (entity) => {
      await extractFields(entity, ctx, contentTypeUid);

      return entity;
    }),
  );
