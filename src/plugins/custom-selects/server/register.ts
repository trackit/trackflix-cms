import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    inputSize: {
      default: 4,
      isResizable: true,
    },
    name: 'genre-category',
    plugin: 'custom-selects',
    type: 'string',
  })
};
