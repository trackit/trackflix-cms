export default [
  {
    method: "POST",
    path: "/migrate-model",
    handler: "opensearch.migrateModel",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/create-index",
    handler: "opensearch.createIndex",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/delete-index",
    handler: "opensearch.deleteIndex",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/models",
    handler: "opensearch.fetchModels",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/model",
    handler: "opensearch.fetchModel",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/search-model",
    handler: "opensearch.searchModel",
    config: {
      policies: [],
    },
  },
];
