/**
 * `blog-populate` middleware
 */

import type { Core } from "@strapi/strapi";
import author from "../../author/controllers/author";

const populate = {
  featuredImage: {
    fields: ["url", "alternativeText"],
  },
  author: {
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
  },
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In blog-populate middleware.");
    ctx.query.populate = populate;

    await next();
  };
};
