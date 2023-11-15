import _ from 'lodash';
import { Strapi } from '@strapi/strapi';
import {Context} from "koa"



const findTargetModel = async (models: any, url: any) => {
  let targetModel: any;
  const helper = strapi.plugin('opensearch').service('helper');
  targetModel = await helper.isContentManagerUrl({ models, reqUrl: url });

  if (!targetModel) {
    targetModel = await helper.isDeleteAllUrl({ models, reqUrl: url });
  }

  if (!targetModel) {
    targetModel = await helper.findModel({ models, reqUrl: url });
  }

  return targetModel;
};

const deleteData = async (targetModel, ids) => {
  if(_.isEmpty(ids)) return ;
  await strapi
  .plugin('opensearch')
  .service('functions')
  .destroy(targetModel.model, { id_in : ids});
};

const createOrUpdateData = async (body, targetModel, id) => {
  let data = targetModel.fillByResponse ? body : null;

  if (!data) {
    const queryKey = `api::${targetModel.model}.${targetModel.content}`;
    data = await strapi.db
      .query(queryKey)
      .findOne({ where: { id, ...targetModel.conditions } });
  }

  if (!data || !id) return;

  await strapi
  .plugin('opensearch')
  .service('functions')
  .createOrUpdate(targetModel.model, { id, data });

};

const verifyBulkDelete = (url, method) => {
  const bulkDeleteUrlPattern =
    /\/content-manager\/(?:collection-types|single-types)\/(\w+)::([a-zA-Z-_]+).([a-zA-Z0-9_-]+)\/actions\/bulkDelete/;

  const result = bulkDeleteUrlPattern.test(url);

  return method === "POST" && !!result;
};

export default({ strapi }: { strapi: Strapi }) => ({
  async opensearchManager (ctx : Context){
    const isValidReq = strapi
              .plugin('opensearch')
              .service('helper')
              .checkRequest(ctx);
    if (!isValidReq) return;

    const { url, method } = ctx.request;
    const { models } = strapi.config.opensearch;


    const targetModel = await findTargetModel(models, url);
    if (!targetModel) return;

    const pk = targetModel.pk || "id";

    const { id } =
      _.pick(ctx.body, pk) || _.pick(ctx.params, pk) || _.pick(ctx.query, pk);

    const shouldUpdate = method === "POST" || method === "PUT";
    const shouldDelete = method === "DELETE";
    const shouldBulkDelete = verifyBulkDelete(url, method);

    if (shouldBulkDelete) {
      await deleteData(targetModel, ctx.request.body?.ids || []);
    } else if (shouldDelete) {
      await deleteData(targetModel, [id]);
    } else if (shouldUpdate) {
      await createOrUpdateData(ctx.body, targetModel, id);
    }
    },

})
