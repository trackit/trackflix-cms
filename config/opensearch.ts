
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
    validStatus: [200, 201], validMethod: ['PUT', 'POST', 'DELETE'], fillByResponse: false, index_prefix: '', index_postfix: '',
    removeExistIndexForMigration: false,
  },
  models: [
  {
    "model": "category",
    "pk": "id",
    "plugin": null,
    "enabled": true,
    "index": "category",
    "relations": [],
    "conditions": {},
    "fillByResponse": true,
    "migration": false,
    "supportAdminPanel": true,
    "urls": []
  },
  {
    "model": "genre",
    "pk": "id",
    "plugin": null,
    "enabled": true,
    "index": "genre",
    "relations": [],
    "conditions": {},
    "fillByResponse": true,
    "migration": false,
    "supportAdminPanel": true,
    "urls": []
  },
  {
    "model": "live-channel",
    "pk": "id",
    "plugin": null,
    "enabled": true,
    "index": "live-channel",
    "relations": [],
    "conditions": {},
    "fillByResponse": true,
    "migration": false,
    "supportAdminPanel": true,
    "urls": []
  },
  {
    "model": "vod",
    "pk": "id",
    "plugin": null,
    "enabled": true,
    "index": "vod",
    "relations": [],
    "conditions": {},
    "fillByResponse": true,
    "migration": false,
    "supportAdminPanel": true,
    "urls": []
  }
]
});