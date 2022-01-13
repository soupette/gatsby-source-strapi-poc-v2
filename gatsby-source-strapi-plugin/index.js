// TODO temp file

require('dotenv').config({
  path: `.env`,
});
// noop
const sourceNodes = require('./gatsby-node').sourceNodes;

const run = async () => {
  const strapiConfig = {
    apiURL: process.env.STRAPI_API_URL,
    // accessToken: process.env.STRAPI_TOKEN,
    collectionTypes: [
      {
        singularName: 'article',
      },
    ],
    singleTypes: [
      // {
      //   singularName: 'about',
      // },
    ],
  };

  await sourceNodes({ actions: {} }, strapiConfig);
};

run();
