import { Strapi } from '@strapi/strapi';
import AWS from "aws-sdk"
import { nanoid } from 'nanoid';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('upload-video')
      .service('myService')
      .getWelcomeMessage();
  },
  upload(ctx) {
    const s3 = new AWS.S3();
  const S3_BUCKET = 'trackflix-thumbnail-storage-test';

  const fileName = `uploads/${nanoid()}`; // create a unique file name
  // content type of a binary
  const fileType = 'binary/octet-stream';
  const s3Params = {
      Bucket: S3_BUCKET,
      Fields: {
          key: fileName
      },
      Conditions: [
          // content shouldnt be larger than 10gb
          ['content-length-range', 0, 10000000000],
      ],
      ContentType: fileType
  };

  const data = s3.createPresignedPost(s3Params);
  console.log(data);
  }
});
