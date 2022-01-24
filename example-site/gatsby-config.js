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
    {
      singularName: "post",
      queryParams: {
        // populate: "*",
        populate: [
          "medias",
          "sections",
          "sections.test",
          "sections.sections_media",
          "sections.test.test_medias",
        ],
      },
    },
  ],
  singleTypes: [],
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
      resolve: require.resolve(`../../gatsby-source-strapi`),
      options: strapiConfig,
    },
  ],
}
