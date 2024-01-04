import { Strapi } from '@strapi/strapi';
import AWS from "aws-sdk"
import { nanoid } from 'nanoid';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('upload-video')
      .service('myService')
      .getWelcomeMessage();
  }
});
