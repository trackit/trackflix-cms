export interface Plugin {
    bootstrap: () => Promise<void>;
    destroy: () => void;
    register: () => Promise<void>;
    config: {
      sizeLimit: number;
      provider: string;
      providerOptions: {
        s3Options: object; // You might want to specify the structure of s3Options
      };
      actionOptions: {
        upload: object;
        uploadStream: object;
        delete: object;
      };
      enabled: boolean;
    };
    routes: {
      admin: {
        type: string;
        routes: any[]; // You might want to specify the structure of routes
      };
      viewConfiguration: {
        type: string;
        routes: any[]; // You might want to specify the structure of routes
      };
      'content-api': {
        type: string;
        routes: any[]; // You might want to specify the structure of routes
      };
    };
    controllers: {
      'admin-file': {
        find: () => Promise<void>;
        findOne: () => Promise<void>;
        destroy: () => Promise<void>;
      };
      'admin-folder': {
        findOne: () => Promise<void>;
        find: () => Promise<void>;
        create: () => Promise<void>;
        update: () => Promise<void>;
        getStructure: () => Promise<void>;
      };
      'admin-folder-file': {
        deleteMany: () => Promise<void>;
        moveMany: () => Promise<void>;
      };
      'admin-settings': {
        updateSettings: () => Promise<void>;
        getSettings: () => Promise<void>;
      };
      'admin-upload': {
        updateFileInfo: (ctx) => Promise<void>;
        replaceFile: (ctx) => Promise<void>;
        uploadFiles: (ctx) => Promise<void>;
        upload: (ctx) => Promise<void>;
      };
      'content-api': {
        find: () => Promise<void>;
        findOne: () => Promise<void>;
        destroy: () => Promise<void>;
        updateFileInfo: () => Promise<void>;
        replaceFile: () => Promise<void>;
        uploadFiles: () => Promise<void>;
        upload: () => Promise<void>;
      };
      'view-configuration': {
        updateViewConfiguration: () => Promise<void>;
        findViewConfiguration: () => Promise<void>;
      };
    };
    services: {
      provider: () => void;
      upload: () => void;
      folder: {
        create: () => Promise<void>;
        exists: () => Promise<void>;
        deleteByIds: () => Promise<void>;
        update: () => Promise<void>;
        setPathIdAndPath: () => Promise<void>;
        getStructure: () => Promise<void>;
      };
      file: {
        getFolderPath: () => Promise<void>;
        deleteByIds: () => Promise<void>;
        signFileUrls: () => Promise<void>;
      };
      weeklyMetrics: () => void;
      metrics: () => void;
      'image-manipulation': () => void;
      'api-upload-folder': {
        getAPIUploadFolder: () => Promise<void>;
      };
      extensions: {
        contentManager: object; // You might want to specify the structure of contentManager
        core: object; // You might want to specify the structure of core
      };
    };
    policies: object; // You might want to specify the structure of policies
    middlewares: object; // You might want to specify the structure of middlewares
    contentTypes: {
      file: {
        schema: object; // You might want to specify the structure of schema
      };
      folder: {
        schema: object; // You might want to specify the structure of schema
      };
    };
  }
  