// noop
const qs = require('qs');

const c = 1643208384661;

const q = {
  // populate: ['sections', 'sections.test'],
  // populate: {
  //   dz: {
  //     populate: '*',
  //   },
  // },
  // tu peux faire dz: { populate: { sub_heore: { populate: * }}}
  // populate: ['compo', 'single_compo', 'dz', 'dz.default_hero'],
  // filters: {
  //   updatedAt: { $gt: '2022-01-26T14:48:51.493Z' },
  // },

  filters: { url: '/uploads/documerica_v_Ox_Iho_EX_Pvc_unsplash_8803a0880d.jpg' },

  // populate: {
  //   compo: {
  //     populate: '*',
  //   },
  //   single_compo: {
  //     populate: '*',
  //   },

  //   dz: {
  //     populate: {
  //       sub_hero: {
  //         populate: '*',
  //       },
  //     },
  // populate: {
  //   'defaut.hero': {
  //     populate: '*',
  //   },
  // },
  // },
  // },
  // populate: {

  //   dz: {
  //     populate: '*',
  //   },
  //   // sections: {
  //   //   populate: '*',
  //   // },
  // },
  // populate: {
  //   // image: '*',
  //   // images: '*',
  //   // author: {
  //   //   populate: {
  //   //     avatar: '*',
  //   //     company: {
  //   //       populate: {
  //   //         image: '*',
  //   //       },
  //   //     },
  //   //   },
  //   // },
  // },
};

console.log(qs.stringify(q, { encode: false }));

// exports.createSchemaCustomization = async ({ actions, schema, createNodeId }, pluginOptions) => {
//   const { createTypes } = actions;
//   // const typeDefs = await buildTypes(pluginOptions, schema, createNodeId);

//   const typeDefs = [
//     schema.buildObjectType({
//       name: 'StrapiTemp',
//       interfaces: ['Node'],
//       fields: {
//         dz: '[StrapiTempDzDynamicZone]',
//       },
//       extensions: {
//         infer: true,
//       },
//     }),
//     schema.buildObjectType({
//       name: 'StrapiComponentDefaultHero',
//       interfaces: ['Node'],
//       fields: {
//         sub_hero: '[StrapiComponentDefaultSubHero]',
//       },
//       extensions: {
//         infer: true,
//       },
//     }),
//     schema.buildObjectType({
//       name: 'StrapiComponentDefaultSubHero',
//       interfaces: ['Node'],
//       fields: {
//         id: 'ID!',
//       },
//       extensions: { infer: true },
//     }),
//     schema.buildUnionType({
//       name: 'StrapiTempDzDynamicZone',
//       // `StrapiComponent${_.upperFirst(_.camelCase(componentSchema.uid))}`;
//       resolveType: (value) => {
//         console.log({ value });

//         return `StrapiComponentDefaultHero`;
//       },
//       types: ['StrapiComponentDefaultHero'],
//     }),
//   ];

//   createTypes(typeDefs);
// };

// // exports.createSchemaCustomization = async (
// //   { actions, schema, cache, createNodeId },
// //   pluginOptions
// // ) => {
// //   const components = await cache.get(CACHE_COMPONENTS);
// //   const contentTypes = await cache.get(CACHE_CONTENT_TYPES);

// //   const c = schema.buildObjectType({
// //     name: 'StrapiComponentDefaultSections',
// //     interfaces: ['Node'],
// //     fields: {
// //       strapi_id: { type: 'Int', resolve: (source) => source?.strapi_id || source?.id || null },
// //       id: 'ID!',
// //       test: 'StrapiComponentDefaultTest',
// //       sections_title: 'String',
// //     },
// //     extensions: {
// //       infer: true,
// //     },
// //   });
// //   const b = schema.buildObjectType({
// //     name: 'StrapiComponentDefaultTest',
// //     interfaces: ['Node'],
// //     fields: {
// //       strapi_id: { type: 'Int', resolve: (source) => source?.strapi_id || source?.id || null },
// //       id: 'ID!',
// //     },
// //     extensions: {
// //       infer: true,
// //     },
// //   });

// //   const d = schema.buildUnionType({
// //     name: 'StrapiPostDzDynamicZone',
// //     resolveType: (value) => `StrapiComponent${upperFirst(camelCase(value.strapiComponent))}`,
// //     types: ['StrapiComponentDefaultSections', 'StrapiComponentDefaultTest'],
// //     // extensions: {
// //     //   infer: true,
// //     // },
// //   });

// //   const e = schema.buildObjectType({
// //     name: 'StrapiPost',
// //     interfaces: ['Node'],
// //     fields: {
// //       strapi_id: { type: 'Int', resolve: (source) => source?.strapi_id || source?.id || null },
// //       dz: '[StrapiPostDzDynamicZone]',
// //     },
// //     extensions: {
// //       infer: true,
// //     },
// //   });

// //   // console.log({ c });
// //   // const d = schema.buildUnionType({})
// //   const { createTypes } = actions;
// //   // const typeDefs = await buildTypes(pluginOptions, schema, createNodeId);
// //   createTypes([c, b, d, e]);
// // };
