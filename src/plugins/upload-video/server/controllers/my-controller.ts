import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('upload-video')
      .service('myService')
      .getWelcomeMessage();
  },
  upload(ctx) {
    console.log(ctx.request)
    ctx.body = "gg"
  }
});
