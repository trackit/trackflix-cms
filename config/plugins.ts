import AWS from 'aws-sdk';


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
      }
}
}