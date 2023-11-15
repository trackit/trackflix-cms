
export default ({ env }) => ({
  connection: {
    node: env('OPENSEARCH_HOST', 'https://search-trackflix-cmd-search-dnqokazsdocnbsxqf5drkytzu4.eu-west-3.es.amazonaws.com'),
    auth: {
      username: env('OPENSEARCH_USERNAME','trackflix'),
      password: env('OPENSEARCH_PASSWORD','Trackflix1!'),
    },
  },
  settings: {
    version:1,
    validStatus: [200, 201], validMethod: ['PUT', 'POST', 'DELETE'], fillByResponse: false, index_prefix: '', index_postfix: '',
    removeExistIndexForMigration: false,
  },
  models: [
  {
    "model": "category",
    "pk": "id",
    "content": "category",
    "enabled": true,
    "index": "categories",
    "relations": [],
    "conditions": {},
    "fillByResponse": false,
    "migration": true,
    "supportAdminPanel": true,
    "urls": ["/categories"]
  },
  {
    "model": "genre",
    "pk": "id",
    "content": "genre",
    "enabled": true,
    "index": "genres",
    "relations": [],
    "conditions": {},
    "fillByResponse": false,
    "migration": true,
    "supportAdminPanel": true,
    "urls": ["/genres"]
  },
  {
    "model": "live-channel",
    "pk": "id",
    "content": "live-channel",
    "enabled": true,
    "index": "live-channels",
    "relations": [],
    "conditions": {},
    "fillByResponse": false,
    "migration": true,
    "supportAdminPanel": true,
    "urls": ["/live-channels"]
  },
  {
    "model": "serie",
    "pk": "id",
    "content": "serie",
    "enabled": true,
    "index": "series",
    "relations": [],
    "conditions": {},
    "fillByResponse": false,
    "migration": true,
    "supportAdminPanel": true,
    "urls": ["/series"]
  },
  {
    "model": "vod",
    "pk": "id",
    "content": "vod",
    "enabled": true,
    "index": "vods",
    "relations": [],
    "conditions": {},
    "fillByResponse": false,
    "migration": true,
    "supportAdminPanel": true,
    "urls": ["/vods"]
  }
]
});
