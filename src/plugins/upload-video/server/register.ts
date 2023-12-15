import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "upload-video",
    plugin: "upload-video",
    type: "string",
    inputSize: {
      default: 4,
      isResizable: true,
    },
  });
};
