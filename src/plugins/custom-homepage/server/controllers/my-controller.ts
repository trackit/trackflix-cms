import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('custom-homepage')
      .service('myService')
      .getWelcomeMessage();
  },
  async vod(ctx) {
    const req = await strapi.service('api::vod.vod')?.find({
      orderBy: "createdAt",
      populate: ['Thumbnails']
    })
    ctx.body = req
    ctx.status = 200;
  },
  async liveChannel(ctx) {
    const req = await strapi.service('api::live-channel.live-channel')?.find({
      orderBy: "createdAt",
      populate: ['thumbnail']
    })
    ctx.body = req
    ctx.status = 200;
  },
  async getMe(ctx) {
    ctx.body = ctx.state.user;
    ctx.status = 200;
  }
});
