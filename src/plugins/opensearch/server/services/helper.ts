/// <reference path="../../custom.d.ts" />
import { Strapi } from '@strapi/strapi';
import axios from 'axios';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import {Context} from "koa";


interface ModelConfig {
  model: string;
  index: string;
  plugin: null;
  enabled: boolean;
  migration: boolean;
  pk: string;
  relations: any[];
  conditions: any;
  fillByResponse: boolean;
  supportAdminPanel: boolean;
  urls: any[];
}

const modelConfigTemplate = (model: string): ModelConfig => ({
  model,
  pk: 'id',
  plugin: null,
  enabled: true,
  index: model,
  relations: [],
  conditions: {},
  fillByResponse: true,
  migration: false,
  supportAdminPanel: true,
  urls: [],
});

const isModel = (config: ModelConfig): boolean => {
  return config.model !== '.gitkeep';
};

const opensearchConfigTemplate = (modelsConfig: ModelConfig[]): string => `
export default ({ env }) => ({
  connection: {
    node: env('OPENSEARCH_HOST', 'https://search-trackflix-cmd-search-dnqokazsdocnbsxqf5drkytzu4.eu-west-3.es.amazonaws.com'),
    auth: {
      username: env('OPENSEARCH_USERNAME','trackflix'),
      password: env('OPENSEARCH_PASSWORD','Trackflix1!'),
    },
  },
  settings: {
    importLimit: 3000,
    validStatus: [200, 201], validMethod: ['PUT', 'POST', 'DELETE'], fillByResponse: false, importLimit: 3000, index_prefix: '', index_postfix: '',
    removeExistIndexForMigration: false,
  },
  models: ${JSON.stringify(modelsConfig, null, 2)}
});`;



export default ({ strapi }: { strapi: Strapi }) => ({
  checkRequest: (ctx: Context): boolean => {
    const { settings } = strapi.config.opensearch;
    settings.validMethod = settings.validMethod || ['PUT', 'POST', 'DELETE'];
    settings.validStatus = settings.validStatus || [200, 201];

    return (
      settings.validMethod.includes(ctx.request.method) &&
      settings.validStatus.includes(ctx.response.status)
    );
  },

  async findModel({ models, reqUrl }: {models:ModelConfig[],reqUrl: string}){
    let res;
    await models.forEach((model) => {
      model.urls.forEach((items) => {
        const re = new RegExp(items);
        if (_.isString(items)) {
          const status = re.test(reqUrl);
          if (status && model.enabled) {
            const targetModel = model;
            res = targetModel;
          }
        } else if (_.isObject(items)) {
          const urls = Object.keys(items);
          for (const url of urls) {
            const re = new RegExp(url);
            const status = re.test(reqUrl);

            if (status && model.enabled) {
              const targetModel = model;
              targetModel.pk = items[url].pk;
              targetModel.relations = items[url].relations || [];
              targetModel.conditions = items[url].conditions || {};
              targetModel.fillByResponse = _.isBoolean(
                items[url].fillByResponse
              )
                ? items[url].fillByResponse
                : true;
              res = targetModel;
            }
          }
        }
      });
    });
    return res;
  },

  async isContentManagerUrl({ models, reqUrl }: {models:ModelConfig[],reqUrl: string}){
    const contentManagerUrlPattern =
      /\/content-manager\/(?:collection-types|single-types)\/([a-zA-Z-_]+)::([a-zA-Z-_]+).([a-zA-Z0-9_-]+)(?:\/(\d+))?/;

    const result = reqUrl.match(contentManagerUrlPattern);

    if (!result) return;

    const [, , , model] = result;

    const targetModel = await models.find((item) => item.model === model);

    if (
      !targetModel ||
      targetModel.enabled !== true ||
      targetModel.supportAdminPanel !== true
    )
      return;

    return targetModel;
  },
  async isDeleteAllUrl({ models, reqUrl }: {models:ModelConfig[],reqUrl: string}){
    const contentManagerUrlPattern =
      /^\/content-manager\/(?:collection-types|single-types)\/(\w+)\/\w*::([a-zA-Z-]+).([a-zA-Z0-9_-]+)|\/(\d*)/;

    const result = reqUrl.match(contentManagerUrlPattern);

    if (!result) return;

    const [, , , model] = result;

    const targetModel = await models.find(
      (configModel) => configModel.model === model
    );

    if (
      !targetModel ||
      targetModel.enabled === false ||
      targetModel.supportAdminPanel === false
    )
      return;

    return targetModel;
  },


  generateMainConfig: (): void => {
    const rootPath = path.resolve(__dirname, '../../../../../../');
    const configPath = rootPath + '/config/opensearch.ts';

    const existConfigFile = fs.existsSync(configPath);

    if (existConfigFile) return;

    const models = fs.readdirSync(rootPath + '/src/api');

    const modelsConfig: ModelConfig[] = [];

    models.map((model) => {
      const config = modelConfigTemplate(model);

      if (isModel(config)) {
        modelsConfig.push(config);
      }
    });

    const opensearchConfig = opensearchConfigTemplate(modelsConfig);
    fs.writeFileSync(configPath, opensearchConfig);
  },

    compareDataWithMap({properties, docs}: { properties: Record<string, any>; docs: any }) {
    const openSearchNumericTypes: string[] = [
      "long",
      "integer",
      "short",
      "byte",
      "double",
      "float",
      "half_float",
      "scaled_float",
      "unsigned_long",
    ];
    let outputDataType = 'array';
    let newMappings: boolean = false;

    const result: any[] = [];

  if (!_.isArray(docs)) {
    docs = [docs];
    outputDataType = 'object';
  }
    const propertiesKeys = Object.keys(properties);
    for(const doc of docs){
      const res: Record<string, any> = {};
      const dockKeyUsed: string[] = [];
      const docKeys = Object.keys(doc);
      for (const docKey of docKeys) {
        if(propertiesKeys.includes(docKey)){
          const DOC = doc[docKey];
          const DOC_PROPERTY = properties[docKey].type;
          if(
            _.isObject(DOC) &&
            _.isObject(properties[docKey].properties) &&
            !_.isDate(DOC) &&
            !_.isEmpty(DOC) &&
            !_.isEmpty(properties[docKey].properties)
          ){
            const filteredData = module.exports.compareDataWithMap({
              properties: properties[docKey].properties,
              docs: DOC,
            });

            if(!_.isEmpty(filteredData.result)){
              const finalArray: any[] = [];
              if(_.isArray(filteredData.result)){
                filteredData.result.forEach((item) => {
                  if(!_.isEmpty(item)) {
                    finalArray.push(item);
                  }
                });
                filteredData.result = finalArray;
              }
              res[docKey] = filteredData.result;
              dockKeyUsed.push(docKey);

            } else {
              dockKeyUsed.push(docKey);

            }
            newMappings = filteredData.newMappings;

          } else if (
            _.isNumber(DOC) &&
            openSearchNumericTypes.includes(DOC_PROPERTY)
          ) {
            res[docKey] = DOC;
            dockKeyUsed.push(docKey);
          } else if (_.isString(DOC) && DOC_PROPERTY === "text") {
            res[docKey] = DOC;
            dockKeyUsed.push(docKey);
          } else if (_.isBoolean(DOC) && DOC_PROPERTY === "boolean") {
            res[docKey] = DOC;
            dockKeyUsed.push(docKey);
          } else if (_.isDate(DOC) && DOC_PROPERTY === "date") {
            res[docKey] = DOC;
            dockKeyUsed.push(docKey);
          } else if (_.isString(DOC) && DOC_PROPERTY === "date") {
            res[docKey] = DOC;
            dockKeyUsed.push(docKey);
          } else {
            dockKeyUsed.push(docKey);
          }
        } else {
          // not implemented yet
        }
      }
      // push property that exist in mapping config but not in entered data
      const mainKeys = _.difference(propertiesKeys, dockKeyUsed);
      for (const key of mainKeys) {
        res[key] = null;
      }
      result.push(res);
    }
    // return data it depends on outputDataType
    if (outputDataType === "array") {
      return { result, newMappings };
    } else if (outputDataType === "object") {
      return { result: result[0], newMappings };
    }
  },

  async generateMappings({ targetModels, data }: { targetModels: any | any[]; data: any }) {
    if (!Array.isArray(targetModels)) targetModels = [targetModels];

    const rootPath = path.resolve(__dirname, '../../../');
    const exportPath = `${rootPath}/exports/opensearch`;

    for (const targetModel of targetModels) {
      let map: any = {};
      if (!data) {
        map = await strapi.opensearch.indices.getMapping({
          index: targetModel.index,
        });
      }

      if ((map && map.body) || data) {
        fs.writeFile(
          `${exportPath}/${targetModel.model}.index.json`,
          JSON.stringify(map.body || data, null, 2),
          (err) => {
            if (err) throw err;
          }
        );
      }
    }
  },
  async checkEnableModels() {
  const { models } = strapi.config.opensearch;
  const functions = strapi.plugin('opensearch').service('functions');
  const enableModels = models.filter((model: any) => model.enabled);

  await enableModels.forEach(async (model) => {
    const indicesMapping = {};
    try {
      const indexMap = await strapi.opensearch.indices.getMapping({
        index: model.index,
      });

      if (indexMap.status === 200) {
        indicesMapping[model.index] = indexMap.body;
      }
    } catch (e) {}

    functions.indicesMapping = indicesMapping;
  });

  },
  async findMappingConfig({ targetModel }: { targetModel: any }) {
    const rootPath = path.resolve(__dirname, '../../../');

    const mappingConfigFilePath = `${rootPath}/exports/opensearch/${targetModel.model}.index.json`;

    const indicesMapConfigFile = fs.existsSync(mappingConfigFilePath);

    if (!indicesMapConfigFile) return;

    const map = require(mappingConfigFilePath);

    return map;
  },
  async initialStrapi() {
    strapi.plugin('opensearch').service('functions').indicesMapping = {};

    const indexFilePattern = /([a-zA-z0-9-_]*)\.index\.json/;

    const { models } = strapi.config.opensearch;
    const rootPath = path.resolve(__dirname, '../../../');

    const exportPath = `${rootPath}/exports/opensearch`;

    fs.mkdirSync(rootPath + '/exports/opensearch', { recursive: true });

    const indicesMapConfigFile = fs.readdirSync(exportPath);

    const enableModels = models.filter((model: any) => model.enabled);


    for (const index of indicesMapConfigFile) {
      if (indexFilePattern.test(index)) {
        const map = require(`${exportPath}/${index}`);

        const matchResult = index.match(indexFilePattern);
        const [, model] = (matchResult || []) as [string, string];

        const targetModel = models.find((item: any) => item.model === model);

        if (targetModel && targetModel.enabled) {
          strapi.plugin('opensearch').service('functions').indicesMapping[targetModel.model] =
            map[targetModel.index];
        }
      }
    }

    for (const targetModel of enableModels) {
      if (! strapi.plugin('opensearch').service('functions').indicesMapping[targetModel.model]) {
        try {
          const indexMap = await strapi.opensearch.indices.getMapping({
            index: targetModel.index,
          });
          if (indexMap.statusCode === 200) {
            strapi.plugin('opensearch').service('functions').indicesMapping[targetModel.model] =
              indexMap.body[targetModel.index];

              const mapData = indexMap.body[targetModel.index];
              fs.writeFileSync(`${exportPath}/${targetModel.model}.index.json`, JSON.stringify(mapData, null, 2));
          }
        } catch (e) {
          strapi.log.warn(
            `There is an error getting the mapping of ${targetModel.index} index from Opensearch`
          );
        }
      }
    }


  }



});
