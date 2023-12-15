export default ({ env }) => (
  [
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              env('AWS_BUCKET_ENDPOINT'),
              
            ],
            'media-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              env('AWS_BUCKET_ENDPOINT'),
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    {
      name: "strapi::body",
      config: {
        formLimit: "256mb", // modify form body
        jsonLimit: "256mb", // modify JSON body
        textLimit: "256mb", // modify text body
        formidable: {
          maxFileSize: 10000 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
        },
      },
    },
  'strapi::session',
  'strapi::session',
  {
    name: 'strapi::favicon',
    config: {
      path: './src/admin/extensions/trackit.png'
    },
  },
  'strapi::public',
]);
