declare module '@strapi/design-system/*';
declare module '@strapi/design-system';
declare module '@strapi/icons';
declare module '@strapi/icons/*';
declare module '@strapi/helper-plugin';
declare module "koa";
import { Strapi } from '@strapi/strapi';
declare module '@strapi/strapi' {
  interface Strapi {
    opensearch: {
      count: (params: { index: string }) => Promise<CountResponse>;
      get: (params: { index: string, id: string }) => Promise<any>;
      bulk: (params: { refresh: boolean; body: any }) => Promise<any>;
      index: (params: { index: string; body: any }) => Promise<any>;
      update: (params: { index: string; id: string; body: any }) => Promise<any>;
      search: (params: { index: string; size: number; from: number; body: any }) => Promise<any>;



      indices: {
        getMapping: (params: { index: string }) => Promise<any>;
        exists: (params: { index: string }) => Promise<any>;
        create: (params: { index: string; body: any }) => Promise<any>;
        delete: (params: { index: string }) => Promise<any>;
      };
    };
  }
}
