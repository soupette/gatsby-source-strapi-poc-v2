const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { getContentTypeSchema } = require('./helpers');

// utils
const isImageOrImages = (field) => {
  if (Array.isArray(field)) {
    return field.some((f) => isImage(f));
  }

  return isImage(field);
};

const mimeTypeExtensions = new Map([
  [`image/jpeg`, `.jpg`],
  [`image/jpg`, `.jpg`],
  [`image/gif`, `.gif`],
  [`image/png`, `.png`],
  [`image/webp`, `.webp`],
  [`image/avif`, `.avif`],
]);

const isImage = (field) => mimeTypeExtensions.has(field.mime);

const extractFields = async (item, ctx, uid) => {
  const {
    actions: { createNode },
    cache,
    contentTypesSchemas,
    createNodeId,
    store,
    strapiConfig: { apiURL },
  } = ctx;

  const schema = getContentTypeSchema(contentTypesSchemas, uid);

  for (const attributeName of Object.keys(item)) {
    const value = item[attributeName];

    const attribute = schema.schema.attributes[attributeName];

    if (attribute?.type === 'media' && value) {
      const isMulitple = attribute.multiple;
      const imagesField = isMulitple ? value : [value];
      // const images = imagesField.filter(isImage);
      // Dowload all files
      const files = await Promise.all(
        imagesField.map(async (file) => {
          let fileNodeID;

          // For now always download the file
          if (!fileNodeID) {
            try {
              // full media url
              const source_url = `${file.url.startsWith('http') ? '' : apiURL}${file.url}`;
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

      const images = files.filter((fileNodeID) => fileNodeID);

      if (images && images.length > 0) {
        // Here 2 nodes will be resolved by the same GQL field
        item[`${attributeName}___NODE`] = isMulitple ? images : images[0];

        // Delete the other one
        delete item[attributeName];
      }
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
