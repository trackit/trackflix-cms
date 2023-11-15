import { Strapi } from '@strapi/strapi';
import { Context, Next } from 'koa';
import path from 'path';
import send from 'koa-send';
export default ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx: Context, next: Next) {
    try {
      const staticFilePath = path.resolve(__dirname, '..', 'public', 'index.html');
      ctx.type = 'html';
      ctx.body = await send(ctx, staticFilePath);
    } catch (error) {
      ctx.throw(404,'File not found');
    }
  },
});
