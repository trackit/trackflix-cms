/**
 * live-channel controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::live-channel.live-channel', ({ strapi }) =>  ({
  
    async find(ctx) {
        console.log("live-channel Page have been accessed")
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },

    async findOne(ctx) {
        console.log(`live-channel Page ${ctx.params.id} have been accessed`)
        const { data } = await super.findOne(ctx);
        const viewCount = data.attributes["access_count"] + 1
        await strapi.query('api::live-channel.live-channel').update(
        {
            where: { id: ctx.params.id },
            data: {
                "access_count": viewCount
            },
        })
        return { data };
    },
    

  }));