import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default {

  register(app: any) {

    app.customFields.register({
      name: 'genre-category',
      plugin: 'custom-selects',
      pluginId,
      intlLabel: {
        id: `${pluginId}.custom-field.genre-category`,
        defaultMessage: 'Genre Category',
      },
      intlDescription: {
        id: `${pluginId}.custom-field.genre-category.description`,
        defaultMessage: "oui"
      },
      type: 'string',
      icon: PluginIcon,
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ "./components/genre-category"),
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
};
