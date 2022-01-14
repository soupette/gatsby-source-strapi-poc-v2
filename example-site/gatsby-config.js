require("dotenv").config({
  path: `.env`,
})

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  // accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    {
      singularName: "article",
      queryParams: {
        pagination: {
          limit: 25,
        },
        populate: "*",
      },
      /**
       * Default queryParams value
       * {
       *    pagination: { limit: -1 },
       *    populate: '*'
       * }
       */
    },
  ],
  singleTypes: [
    {
      singularName: "about",
      queryLimit: -1,

      /**
       * Default queryParams value
       * {
       *  populate: '*',
       * }
       * */
    },
  ],
}

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: require.resolve(`../gatsby-source-strapi-plugin`),
      options: strapiConfig,
    },
  ],
}
