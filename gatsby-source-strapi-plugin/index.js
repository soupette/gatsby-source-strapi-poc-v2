// TODO temp file

require('dotenv').config({
  path: `.env`,
});

const createInstance = require('./axiosInstance');
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
  const axiosInstance = createInstance(strapiConfig);

  for (let i = 0; i < 100; i++) {
    const article = {
      title: `Article ${i}`,
      content: 'lorem ipsum',
    };

    axiosInstance.post('/articles', {
      data: article,
    });
  }

  // await sourceNodes({ actions: {} }, strapiConfig);
};

run();
