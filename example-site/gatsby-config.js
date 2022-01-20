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
        // Populate media and relations
        // Make sure to not specify the fields key so the api always returns the updatedAt
        populate: "*",
        // populate: {
        //   image: "*",
        //   images: "*",
        //   author: {
        //     populate: {
        //       avatar: "*",
        //       company: {
        //         populate: {
        //           image: "*",
        //         },
        //       },
        //     },
        //   },
        // },
      },
      /**
       * Default queryParams value
       * {
       *    pagination: { page: 1, pageSize: 250 },
       *    populate: '*'
       * }
       */
    },
    {
      singularName: "company",
      queryParams: {
        populate: "*",
      },
    },
    {
      singularName: "author",
      queryParams: {
        populate: "*",
        // populate: {
        //   articles: {
        //     populate: "*",
        //   },
        // },
      },
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
