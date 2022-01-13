require("dotenv").config({
  path: `.env`,
})

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  // accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    {
      singularName: "article",
    },
  ],
  singleTypes: [
    // {
    //   singularName: 'about',
    // },
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
