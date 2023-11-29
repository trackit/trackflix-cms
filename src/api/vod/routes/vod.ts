/**
 * vod router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::vod.vod', {
    prefix: '',
    except: [],
    config: {
    create: {
        middlewares: ["api::vod.add-owner"],
    },
    findOne: {},
    update: {
        policies: ["is-owner"]
    },
    delete: {
        policies: ["is-owner"]
    },
    },
});
