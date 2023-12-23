import { createReadOnlyRoleIfNotExists } from "./setup/readOnlyRole";
import { setVODLayout, setLiveChannelLayout } from "./setup/layouts";

export default {
register({ strapi }) {

},

async bootstrap({ strapi }) {
  createReadOnlyRoleIfNotExists(strapi);
  setVODLayout(strapi);
  setLiveChannelLayout(strapi);
},
};
