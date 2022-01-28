'use strict';

/**
 * temp service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::temp.temp');
