import { createReadOnlyRoleIfNotExists } from "./setup/readOnlyRole";
import { setVODLayout } from "./setup/VOD";



export default {
register({ strapi }) {

},

async bootstrap({ strapi }) {
  createReadOnlyRoleIfNotExists(strapi);
  setVODLayout(strapi);
},
};
