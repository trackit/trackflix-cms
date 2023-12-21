export const ACTIONS = {
  read: 'plugin::upload.read',
  readSettings: 'plugin::upload.settings.read',
  create: 'plugin::upload.assets.create',
  update: 'plugin::upload.assets.update',
  download: 'plugin::upload.assets.download',
  copyLink: 'plugin::upload.assets.copy-link',
  configureView: 'plugin::upload.configure-view',
};

export const ALLOWED_SORT_STRINGS = [
  'createdAt:DESC',
  'createdAt:ASC',
  'name:ASC',
  'name:DESC',
  'updatedAt:DESC',
  'updatedAt:ASC',
];

export const ALLOWED_WEBHOOK_EVENTS = {
  MEDIA_CREATE: 'media.create',
  MEDIA_UPDATE: 'media.update',
  MEDIA_DELETE: 'media.delete',
};

export const FOLDER_MODEL_UID = 'plugin::upload.folder';
export const FILE_MODEL_UID = 'plugin::upload.file';
export const API_UPLOAD_FOLDER_BASE_NAME = 'API Uploads';
