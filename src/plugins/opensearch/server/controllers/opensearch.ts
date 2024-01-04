/// <reference path="../../custom.d.ts" />
import { Strapi } from '@strapi/strapi';
import _ from 'lodash';
import { Context } from 'koa';

interface Model {
  model: string;
  //content: string;
  plugin: null;
  index: string;
  relations : [],
  conditions :{},
  migration: boolean;
  pk: string;
  enabled: boolean;
}

export default ({ strapi }: { strapi: Strapi }) => ({
  fetchModels(ctx : Context) {
    const { models } = strapi.config.opensearch;

    const enabledModels = models.filter((model: Model) => model.enabled);

    const disabledModels = models.filter((model: Model) => !model.enabled);
    const allModels = [...enabledModels, ...disabledModels];

    const response = _.map(
      allModels,
      _.partialRight(_.pick, [
        "model",
        "content",
        "plugin",
        "index",
        "migration",
        "pk",
        "enabled",
      ])
    );

    return ctx.send(response);
  },

  async fetchModel(ctx: Context){

    const { index, _start, _limit } = ctx.query;
    let data: any, count: any, map: any;
    let status: any = {};

    try {
      count = await strapi.opensearch.count({ index });
      map = await strapi.opensearch.indices.getMapping({ index });
      status = {
        deleted: false,
        created: true,
      };
    } catch (e) {
      status = {
        deleted: true,
        created: false,
      };
    }

    status.hasMapping = status.created && !_.isEmpty(map[index]);

    try {
      data = await strapi
      .plugin('opensearch')
      .service('functions')
      .find(index, _limit, _start);
      console.log(data.body.hits.hits)
    } catch (e) {
      strapi.log.warn(`There is an error to get fetch model ${index} from Opensearch`);
      return ctx.send({ data: null, total: 0, status });
    }
    return ctx.send({
      data: sanitizeHits(data.body.hits.hits),
      total: count && count.body && count.body.count,
      status,
    });

  },

  async searchModel(ctx: Context) {

    const bodyData = JSON.parse(ctx.request.body.body);
    const index = bodyData.index;
    const query = bodyData.query;
    const _start = bodyData._start;
    const _limit= bodyData._limit;
    let data: any, count: any, map: any;
    let status: any = {};

    try {
      count = await strapi.opensearch.count({ index });
      map = await strapi.opensearch.indices.getMapping({ index });
      status = {
        deleted: false,
        created: true,
      };
    } catch (e) {
      status = {
        deleted: true,
        created: false,
      };
    }

    status.hasMapping = status.created && !_.isEmpty(map[index]);

    try {
      data = await strapi
        .plugin('opensearch')
        .service('functions')
        .find_specific(index, query, _limit, _start);

    } catch (e) {
      strapi.log.warn(`There is an error to fetch model ${index} from Opensearch`);
      return ctx.send({ data: null, total: 0, status });
    }

    return ctx.send({
      data: sanitizeHits(data.body.hits.hits),
      total: count && count.body && count.body.count,
      status,
    });
  },


  async migrateModel(ctx : Context) {
    const bodyData = JSON.parse(ctx.request.body.body);
    const model = bodyData.model;
    await strapi.plugin('opensearch')
                .service('functions')
                .migrateModel(model);

    return ctx.send({ success: true });
  },

  async createIndex(ctx : Context) {
    const bodyData = JSON.parse(ctx.request.body.body);
    const model = bodyData.model;

    const { models } = strapi.config.opensearch;
    const targetModel = models.find((item : Model) => item.model === model);


    const mapping = await strapi
          .plugin('opensearch')
          .service('helper')
          .findMappingConfig({ targetModel });


    const indexConfig = strapi
               .plugin('opensearch')
               .service('functions').indicesMapping[targetModel.model];

    const options : any = {
      index: targetModel.index,
    };

    if (mapping || indexConfig) {
      options.body = mapping ? mapping[targetModel.index] : indexConfig;
    }

    await strapi.opensearch.indices.create(options);

    return ctx.send({ success: true });

  },

  async deleteIndex(ctx:Context){
    const bodyData = JSON.parse(ctx.request.body.body);
    const model = bodyData.model;

    const { models } = strapi.config.opensearch;
    const targetModel = models.find((item: Model) => item.model === model);

    try {
      await strapi.opensearch.indices.delete({
        index: targetModel.index,
      });
      return ctx.send({ success: true });
    } catch (e) {
      return ctx.throw(500);
    }

  },
});

function sanitizeHits(hits: any[]) {
  const data: any[] = [];

  for (const item of hits) {
    const source = item['_source'];
    if (!_.isEmpty(source)) {
      const sourceKeys = Object.keys(source);

      for (const key of sourceKeys) {
        if (_.isArray(source[key])) {
          source[key] = '[Array]';
        } else if (_.isObject(source[key])) {
          source[key] = '[Object]';
        }
      }
      data.push(source);
    }
  }

  return data;
}
