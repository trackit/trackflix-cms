
export default ({ env }) => ({
  settings: {
    importLimit: 3000,
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