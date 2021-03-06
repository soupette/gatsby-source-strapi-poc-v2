const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { getContentTypeSchema } = require('./helpers');
const _ = require('lodash');

exports.createNodes = (entity, nodeType, ctx, uid) => {
  const nodes = [];

  const {
    actions: { createNode },
    cache,
    contentTypesSchemas,
    createNodeId,
    createContentDigest,
    store,
    strapiConfig: { apiURL },
  } = ctx;

  let entryNode = {
    id: createNodeId(`${nodeType}-${entity.id}`),
    parent: null,
    children: [],
    internal: {
      type: nodeType,
      content: JSON.stringify(entity),
      contentDigest: createContentDigest(entity),
    },
  };

  const schema = getContentTypeSchema(contentTypesSchemas, uid);

  for (const attributeName of Object.keys(entity)) {
    const value = entity[attributeName];

    const attribute = schema.schema.attributes[attributeName];

    if (attribute?.type === 'richtext' && value) {
      const textNodeId = createNodeId(`${entity.id}${attributeName}TextNode`);
      const textNode = {
        id: textNodeId,
        parent: entryNode.id,
        children: [],
        [attributeName]: value,
        internal: {
          type: _.camelCase(`${nodeType}-${attributeName}-TextNode`),
          mediaType: `text/markdown`,
          content: value,

          contentDigest: entity.updatedAt,
        },
      };

      entryNode.children = entryNode.children.concat([textNodeId]);

      entity[`${attributeName}___NODE`] = textNodeId;
      delete entity[attributeName];

      nodes.push(createNode(textNode));
    }

    if (attribute?.type === 'json' && value) {
      const jsonNodeId = createNodeId(`${entity.id}${attributeName}JSONNode`);

      const JSONNode = {
        ...(_.isPlainObject(value) ? { ...value } : { content: value }),
        id: jsonNodeId,
        parent: entryNode.id,
        children: [],
        internal: {
          type: _.camelCase(`${nodeType}-${attributeName}-JSONNode`),
          mediaType: `application/json`,
          content: JSON.stringify(value),
          contentDigest: entity.updatedAt,
        },
      };

      entryNode.children = entryNode.children.concat([jsonNodeId]);

      entity[`${attributeName}___NODE`] = jsonNodeId;
      delete entity[attributeName];

      nodes.push(createNode(JSONNode));
    }
  }

  entryNode = {
    ...entity,
    ...entryNode,
  };

  nodes.push(createNode(entryNode));

  return nodes;
};

// TODO components and DZ
const extractImages = async (item, ctx, uid) => {
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

    if (attribute?.type === 'relation' && value) {
      return extractImages(value, ctx, attribute.target);
    }

    if (attribute?.type === 'media' && value) {
      const isMultiple = attribute.multiple;
      const imagesField = isMultiple ? value : [value];

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
        // item[attributeName] = isMultiple ? images : images[0];
        // Here 2 nodes will be resolved by the same GQL field
        // item[`${attributeName}___NODE`] = isMultiple ? images : images[0];

        item[attributeName][`localFile___NODE`] = isMultiple ? images : images[0];
        // Delete the other one
        // delete item[attributeName];
      }
    }
  }
};

// Downloads media from image type fields
exports.downloadMediaFiles = async (entities, ctx, contentTypeUid) =>
  Promise.all(
    entities.map(async (entity) => {
      await extractImages(entity, ctx, contentTypeUid);

      return entity;
    }),
  );
