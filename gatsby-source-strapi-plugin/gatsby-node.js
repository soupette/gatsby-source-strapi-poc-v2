/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
const createInstance = require('./axiosInstance');
const helpers = require('./helpers');
const { capitalize, castArray } = require('lodash');

const getEntities = async ({ endpoint }, ctx) => {
  const axiosInstance = createInstance(ctx.strapiConfig);

  try {
    const { data } = await axiosInstance.get(endpoint);

    return castArray(data).map(helpers.cleanData);
  } catch (err) {
    console.log(err);
  }
};

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }, pluginOptions) => {
  const { createNode } = actions;

  const axiosInstance = createInstance(pluginOptions);
  const { data: contentTypesSchemas } = await axiosInstance.get(
    '/content-type-builder/content-types',
  );

  const ctx = {
    strapiConfig: pluginOptions,
  };

  const endpoints = helpers.getEndpoints(pluginOptions, contentTypesSchemas);

  const data = await Promise.all(endpoints.map((endpoint) => getEntities(endpoint, ctx)));

  endpoints.forEach(({ singularName }, i) => {
    const entities = data[i];

    entities.forEach((entity) => {
      const nodeType = `Strapi${capitalize(singularName)}`;

      createNode({
        ...entity,
        id: createNodeId(`${nodeType}-${entity.id}`),
        parent: null,
        children: [],
        internal: {
          type: nodeType,
          content: JSON.stringify(entity),
          contentDigest: createContentDigest(entity),
        },
      });
    });
  });

  return;
};

exports.onPreInit = () => console.log('Loaded gatsby-source-strapi-plugin');
