/// <reference path="../../custom.d.ts" />
import _ from "lodash";
import { Strapi } from "@strapi/strapi";


type PkType = {
  id_in: any;
  id: any; // Adjust the type of 'id' as needed
};
interface OpenSearchModelIndex {
  model: string;
  index: string;
  pk: string;
  relations: any[];
  conditions: any;
  enabled: boolean;
  migration: boolean;
  plugin: string;
}

const indicesMapping: {
  [indexName: string]: any;
} = {};

export { indicesMapping };


export default ({ strapi }: { strapi: Strapi }) => ({

  async findOne(model:string, pk: PkType) {
    const {models} = strapi.config.opensearch;
    const targetModel = models.find((item) => item.model === model);

    const id = _.isObject(pk) ? pk.id :pk;
    if (!id) {
      strapi.log.error("Parameter ID is not valid");
      return;
    }

    if (!targetModel) {
      strapi.log.error("Model not found");
      return;
    }

    const result = await strapi.opensearch.get({
      index: targetModel.index,
      id,
    });
    return result;

  },

  async destroy(model: string, pk: PkType) {
    let id_in: any[];
    if(pk.id_in && !_.isArray(pk.id_in)) {
      strapi.log.error("id_in must be array");
      return;
    }
    if (!_.isObject(pk)) {
      id_in = [pk];
    } else {
      id_in = pk.id_in || [pk.id];
    }

    const { models } = strapi.config.opensearch;
    const targetModel = models.find((item) => item.model === model);

    if (!id_in) {
      strapi.log.error("pk parameter is not valid");
    }

    if (!targetModel) {
      strapi.log.error("model notfound");
      return;
    }


    const body = id_in.map((id) => {
      return {
        delete: {
          _index: targetModel.index,
          _id: id,
        },
      };
    });

    try {
      return strapi.opensearch.bulk({
        body,
        refresh: false
      });
    } catch (e) {
      strapi.log.error(e.message);
    }


  },

  async createOrUpdate(model: string, {id, data}) {
    const helper = strapi.plugin('opensearch').service('helper');

    const { models } = strapi.config.opensearch;
    const targetModel = await models.find((item) => item.model === model);
    if (!data) {
      strapi.log.error("No data to index");
      return;
    }

    if (!targetModel) {
      strapi.log.error("Model not found");
      return;
    }

    const indexConfig = indicesMapping[targetModel.model];
    if (
      indexConfig &&
      indexConfig.mappings &&
      indexConfig.mappings.properties
    ) {

      const res = await helper.compareDataWithMap({
        docs: data,
        properties: indexConfig.mappings.properties,
      });
      data = res.result || data;
    }

    let result;
    if (!id && data) {
      result = await strapi.opensearch.index({
        index: targetModel.index,
        body: data,
      });
    } else if (id && data) {
      result = await strapi.opensearch.update({
        index: targetModel.index,
        id: data[targetModel.pk || "id"],
        body: {
          doc: data,
          doc_as_upsert: true,
        },
      });

      return result;

  }
},

async migrateById(model : string,{id,id_in,relations,conditions}: { id: string; id_in: any; relations: any[]; conditions: any }) {
  const { models } = strapi.config.opensearch;

  const targetModel = models.find((item) => item.model === model);


    if (!targetModel) return null;

    id_in = id_in || [id];

    relations = relations || targetModel.relations;
    conditions = conditions || targetModel.conditions;

    const data = await strapi
      .query(targetModel.model)
      .find({ id_in: [...id_in], ...conditions }, [...relations]);

    if (!data) return null;

    const body = await data.flatMap((doc) => [
      {
        index: {
          _index: targetModel.index,
          _id: doc[targetModel.pk || "id"],
        },
      },
      doc,
    ]);

    const result = await strapi.opensearch.bulk({ refresh: false, body });

    return result;

},

async find_specific(index, query,limit, start) {

  const searchParams = {
    index: index,
    size: limit || 10,
    from: limit * (start - 1),   // Specify the from as needed
    body: {
      query: {
        query_string: {
          query: `*${query}*`,
          fields: ['*'],
        },
      },
    },
  };

  try {
    const result = await strapi.opensearch.search(searchParams);
    return result;
  } catch (error) {
    strapi.log.error("Search error:", error);
    return null;
  }
},


async migrateModel(model: string, params: Record<string, any> = {}){
  const { models, settings } = strapi.config.opensearch;
  const targetModel = models.find((item) => item.model === model);
  const apiQueryKey = `api::${targetModel.model}.${targetModel.model}`;
  strapi.log.debug(`TGM ${apiQueryKey} to opensearch`);



  const { indexExist } = await strapi.opensearch.indices.exists({
    index: targetModel.index,
  });
  strapi.log.info('indexExist:',indexExist)
  const indexConfig = indexExist
      ? indicesMapping[targetModel.model]
      : null;

  const migrationIsEnabled =
  targetModel && !!targetModel.enabled && targetModel.migration;
  strapi.log.info('migrationEnabled:',migrationIsEnabled)
  if (!migrationIsEnabled) return;


  let start = 0;
  strapi.log.debug(`Importing ${targetModel.model} to opensearch`);

  const modelCount = await strapi.db.query(apiQueryKey).count({});

    let indexLength = modelCount / settings.importLimit;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const startSql = Date.now();
    let data = await getDocsFromModel(
      targetModel,
      apiQueryKey,
      settings,
      start,
      indexConfig
    );
    const endSql = Date.now();

    if (data.length === 0) {
      strapi.log.debug("End of import");
      break;
    }

    const start_opensearch = Date.now();
    await indexData(targetModel, data);
    const end_opensearch = Date.now();

    start += 1;

    strapi.log.info(
      `(${start}/${indexLength + 1}) Imported to ${
        targetModel.index
      } index | sql query took ${
        (endSql - startSql) / 1000
      }s and insert to opensearch took ${
        (end_opensearch - start_opensearch) / 1000
      }s`
    );
  }
},
async find (index, limit, start){
  return strapi.opensearch.search({
    index,
    size: limit || 10,
    from: limit * (start - 1),
    body: {
      sort: [
        {
          updatedAt: {
            order: "desc",
            unmapped_type: "date",
          },
        },
      ],
      query: {
        match_all: {},
      },
    },
  });
},
});

async function getDocsFromModel(
  targetModel: OpenSearchModelIndex,
  apiQueryKey: string,
  settings: any,
  start: number,
  indexConfig: any
) {
  strapi.log.debug(`Getting ${targetModel.model} model data from the database`);

  const data = await strapi.db.query(apiQueryKey).findMany({
    limit: settings.importLimit,
    offset: settings.importLimit * start,
  });
  strapi.log.info(JSON.stringify(data))
  let result = data;
  if (indexConfig && indexConfig.mappings && indexConfig.mappings.properties) {
    const helper = strapi.plugin('opensearch').service('helper')
    const res = helper.compareDataWithMap({
      docs: data,
      properties: indexConfig.mappings.properties,
    });
    result = res.result || result;
  }

  return result;
}

async function indexData(targetModel: OpenSearchModelIndex, data: any[]) {
  strapi.log.debug(`Sending ${targetModel.model} model to opensearch...`);

  const body = await parseDataToEOpensearch(targetModel, data);
  strapi.log.info('indexdata body:',JSON.stringify(data))
  try {
    await strapi.opensearch.bulk({ refresh: false, body });
  } catch (e) {
    strapi.log.error('Error during bulk indexing:', e);
    return;
  }
}

async function parseDataToEOpensearch(targetModel: OpenSearchModelIndex, data: any[]) {
  strapi.log.info('parsedata:', data);

  if (!data) {
    strapi.log.error('Data is null or undefined. Check the source data.');
    return [];
  }

  return data.flatMap((doc) => [
    {
      index: {
        _index: targetModel.index,
        _id: doc[targetModel.pk || "id"],
      },
    },
    doc,
  ]);
}

