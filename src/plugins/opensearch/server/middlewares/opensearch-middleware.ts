import { Strapi } from '@strapi/strapi';
import {Context, Next} from "koa";


export default(options,{ strapi }: { strapi: Strapi }) => {
  return async(ctx: Context,next: Next) => {

    await next();
     strapi.plugin('opensearch')
           .service('middleware')
           .opensearchManager(ctx);

  }
};
