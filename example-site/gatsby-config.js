require("dotenv").config({
  path: `.env`,
})

const contentTypes = [
  {
    singularName: "temp",
    queryParams: {
      populate: {
        compo: {
          populate: "*",
        },
        single_compo: {
          populate: "*",
        },
        dz: {
          populate: {
            sub_hero: {
              populate: "*",
            },
          },
        },
      },
    },
  },
  {
    singularName: "article",
    queryParams: {
      populate: "*",
    },
  },
  // {
  //   singularName: "company",
  //   queryParams: {
  //     populate: "*",
  //   },
  // },
  // {
  //   singularName: "author",
  //   queryParams: {
  //     populate: "*",
  //   },
  // },
  {
    singularName: "tata",
  },

  {
    singularName: "post",
    queryParams: {
      populate: {
        dz: {
          populate: "*",
        },
        sections: {
          populate: "*",
        },
      },
    },
  },
]

const complexStructures = [
  {
    singularName: "article",
    queryParams: {
      populate: {
        image: "*",
        images: "*",
        author: {
          populate: {
            avatar: "*",
            company: {
              populate: {
                image: "*",
              },
            },
          },
        },
      },
    },
  },
]

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  extractMarkdownImages: true, // Default false
  collectionTypes: contentTypes,
  // collectionTypes: complexStructures,
  singleTypes: [],
}

module.exports = {
  flags: {
    FAST_DEV: true,
  },
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
