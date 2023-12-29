import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name: 'upload-video',
      plugin: 'custom-selects',
      pluginId,
      intlLabel: {
        id: `${pluginId}.custom-field.genre-category`,
        defaultMessage: 'Upload video',
      },
      intlDescription: {
        id: `${pluginId}.custom-field.genre-category.description`,
        defaultMessage: "insert VOD URL if it's already hosted or upload your local one to your s3 bucket"
      },
      type: 'string',
      icon: PluginIcon,
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ "./customFields/UploadVideo/uploadsVideo"),
        pluginId,
      } 
      // …
    });

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
