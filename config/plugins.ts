export default async ({ env }) => {

  return {
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          s3Options: {
            region: env('AWS_REGION'),
            params: {
              ACL: 'private', // <== set ACL to private
              Bucket: env('AWS_BUCKET'),
            },
          },
        },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},   
          },
        },
      },
      'cloudfront-metrics': {
        enabled: true,
        resolve: './src/plugins/cloudfront-metrics'
      },
      'custom-selects': {
        enabled: true,
        resolve: './src/plugins/custom-selects'
      },
      'docusaurus': {
        enabled: true,
        resolve: './src/plugins/docusaurus'
      },
      documentation: {
        enabled: true,
        config: {
          openapi: '3.0.0',
          info: {
            version: '1.0.0',
            title: 'Trackflix Api Documentation',
            description: '',
            termsOfService: 'YOUR_TERMS_OF_SERVICE_URL',
            contact: {
              name: 'Trackit team',
              email: 'teams@trackit.io',
              url: 'https://trackit.io'
            },
            license: {
              name: 'Apache 2.0',
              url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
            },
          },
          'x-strapi-config': {
            // Leave empty to ignore plugins during generation
            plugins: [ 'upload', 'users-permissions'],
            path: '/documentation',
          },
          servers: [
            { url: 'https://trackflix-cms.trackit.io/api', description: 'Production server' },
          ],
          externalDocs: {
            description: 'Find out more',
            url: 'https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html'
          },
          security: [ { bearerAuth: [] } ]
        }
      },
  }
}
