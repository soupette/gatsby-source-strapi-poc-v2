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
const qs = require('qs');

const getEntities = async ({ endpoint, queryParams, uid }, ctx) => {
  const { strapiConfig, reporter } = ctx;
  const axiosInstance = createInstance(strapiConfig);

  const opts = {
    method: 'GET',
    url: endpoint + '?' + qs.stringify(queryParams, { encodeValuesOnly: true }),
  };

  try {
    reporter.info(`Starting to fetch data from Strapi - ${opts.url}`);

    const { data } = await axiosInstance(opts);

    console.log({ uid });

    return castArray(data).map((entry) =>
      helpers.cleanData(entry, { ...ctx, contentTypeUid: uid }),
    );
  } catch (error) {
    reporter.panic(`Failed to fetch data from Strapi ${opts.url}`, error);
    return [];
  }
};

exports.onPreInit = () => console.log('Loaded gatsby-source-strapi-plugin');

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId, reporter },
  pluginOptions,
) => {
  const { createNode } = actions;

  const axiosInstance = createInstance(pluginOptions);
  const { data: contentTypesSchemas } = await axiosInstance.get(
    '/content-type-builder/content-types',
  );

  const ctx = {
    strapiConfig: pluginOptions,
    reporter,
    contentTypesSchemas,
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
