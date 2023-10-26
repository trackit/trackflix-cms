export default [
  'strapi::errors',
  {
    name: "strapi::security",
    config: {
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
        "connect-src": ["'self'", "https:"],
        "img-src": ["'self'", "data:", "blob:", "*"],
        "media-src": ["'self'", "data:", "blob:", "*"],
        "default-src":["'self'"],
        "script-src": ["'self'", "'unsafe-inline'"],
        upgradeInsecureRequests: null,
        },
    },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  {
    name: 'strapi::favicon',
    config: {
      path: './src/admin/extensions/trackit.png'
    },
  },
  'strapi::public',
];
