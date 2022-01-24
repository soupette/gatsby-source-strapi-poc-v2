// noop
const qs = require('qs');

const q = {
  // populate: ['sections', 'sections.test'],
  populate: {
    sections: '',
  },
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
