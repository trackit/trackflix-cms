const { errors } = require('@strapi/utils');
const { PolicyError } = errors;

export default async (policyContext, config, { strapi }) => {
    const { user } = policyContext.state;
    const { id } = policyContext.params;

    const vod = await strapi.entityService.findOne("api::vod.vod", id);

    if (!vod.owner) {
      throw new PolicyError('You are not allowed to perform an action on this VOD. please contact his owner');
    }

    const ownerId = vod.owner;
    const owner = await strapi.entityService.findOne("plugin::users-permissions.user", ownerId);
    if (user.id != ownerId) {
      throw new PolicyError(`You are not allowed to perform an action on this VOD. please contact his owner`,  {
        "owner": owner.email
      });
    }
    return true;
}
