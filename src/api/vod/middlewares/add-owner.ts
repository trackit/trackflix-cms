/**
 * `add-owner` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const { user } = ctx.state;
    ctx.request.body.data.owner = user.id;
    await next();
  };
};
