'use strict';

/**
 * Lifecycle callbacks for the `User` model.
 */

module.exports = {
 lifecycles: {
  async afterCreate(data) {
    try {
      await strapi.services.profiles.create({
        displayName: data.username,
        user: data.id.toString()
      })
    } catch (error) {
      console.log(error)
    }
  }
 }
};
