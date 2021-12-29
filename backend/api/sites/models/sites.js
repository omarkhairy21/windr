const { nameToSlug } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate (data) {
      console.log(data)
      if (data.name) {
        data.slug = nameToSlug(data.name, { lower: true });
      }
    },
    async beforeUpdate (params, data) {
      if (data.name) {
        data.slug = nameToSlug(data.name, { lower: true });
      }
    },
  },
};
