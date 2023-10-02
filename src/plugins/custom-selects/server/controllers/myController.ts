import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({

  async genres(ctx) {
    const req = await strapi.service('api::genre.genre')?.find({
      populate: ['categories']
    })
    ctx.body = req
    ctx.status = 200;
  }
});
