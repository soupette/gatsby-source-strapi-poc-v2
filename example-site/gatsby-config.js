require("dotenv").config({
  path: `.env`,
})

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    {
      singularName: "article",
      queryParams: {
        // IMO we should make sure we always query the updatedAt field
        fields: ["title", "content", "updatedAt", "json"],
        populate: {
          image: {
            populate: "*",
          },
          images: {
            populate: "*",
          },
          author: {
            fields: ["name", "updatedAt"],
            populate: {
              avatar: {
                populate: "*",
              },
              company: {
                fields: ["name"],
                populate: {
                  image: {
                    populate: "*",
                  },
                },
              },
            },
          },
        },
      },
      /**
       * Default queryParams value
       * {
       *    pagination: { page: 1, pageSize: 250 },
       *    populate: '*'
       * }
       */
    },
  ],
  singleTypes: [
    // {
    //   singularName: "about",
    //   /**
    //    * Default queryParams value
    //    * {
    //    *  populate: '*',
    //    * }
    //    * */
    // },
  ],
}

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-transformer-json`,
    "gatsby-transformer-remark",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    // 'gatsby-plugin-react-helmet',
    {
      resolve: require.resolve(`../gatsby-source-strapi-plugin`),
      options: strapiConfig,
    },
  ],
}
