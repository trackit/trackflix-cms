import { createReadOnlyRoleIfNotExists } from "./setup/readOnlyRole";
import { setVODLayout } from "./setup/layouts";

export default {
register({ strapi }) {

},

async bootstrap({ strapi }) {
  createReadOnlyRoleIfNotExists(strapi);
  setVODLayout(strapi);
},
};
