import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import { RiClapperboardFill } from 'react-icons/ri';
import { VscGraph } from 'react-icons/vsc'
import {BsBroadcastPin} from 'react-icons/bs'
import {CgWebsite} from 'react-icons/cg'
import {HiMiniUsers} from 'react-icons/hi2'
import {BsFillShieldLockFill} from 'react-icons/bs'

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {

    app.addMenuLink({
      to: `/content-manager/collectionType/api::live-channel.live-channel?page=1&pageSize=10&sort=name:ASC`,
      icon: BsBroadcastPin,
      category: "Content",
      intlLabel: {
        id: `${pluginId}.plugin.live_channel`,
        defaultMessage: "Live Channel",
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [],
    });

    app.addMenuLink({
      to: `/content-manager/collectionType/api::vod.vod?page=1&pageSize=10&sort=Name:ASC`,
      icon: RiClapperboardFill,
      category: "Content",
      intlLabel: {
        id: `${pluginId}.plugin.vod`,
        defaultMessage: "VOD",
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [],
    });

    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: VscGraph,
      category: "Reporting",
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Metrics",
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [],
    });

    app.addMenuLink({
      to: `/content-manager/collectionType/api::genre.genre?page=1&pageSize=10&sort=Name:ASC`,
      icon: PluginIcon,
      category: "Configuration",
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Genres",
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [],
    });

    app.addMenuLink({
      to: `/content-manager/collectionType/api::category.category?page=1&pageSize=10&sort=Name:ASC`,
      icon: PluginIcon,
      category: "Configuration",
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Categories",
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [],
    });

    app.addMenuLink({
      to: `/lol`,
      icon: CgWebsite,
      category: "Configuration",
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Platforms",
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [],
    });
    

    app.addMenuLink({
      to: `/content-manager/collectionType/plugin::users-permissions.user?page=1&pageSize=10&sort=username:ASC`,
      icon: HiMiniUsers,
      category: "Admin",
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Users",
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [],
    });

    app.addMenuLink({
      to: `/content-manager/collectionType/plugin::users-permissions.role?page=1&pageSize=10&sort=username:ASC`,
      icon: BsFillShieldLockFill,
      category: "Admin",
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Roles",
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [],
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