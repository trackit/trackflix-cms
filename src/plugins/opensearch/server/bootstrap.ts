/// <reference path="../custom.d.ts" />

import { Client} from '@opensearch-project/opensearch'
import { Strapi } from "@strapi/strapi";



export default async ({ strapi }: { strapi: Strapi }) => {

  const helper = strapi.plugin('opensearch').service('helper');

   /**
   * Generate elasticsearch config file
   */
  helper.generateMainConfig();

    /**
     * Initialize strapi.opensearch object
     */
    if (strapi.config.opensearch) {
      const { connection } = strapi.config.opensearch;

      const client = new Client(connection);


      strapi.opensearch = client;



      await helper.initialStrapi();



      strapi.log.info("The opensearch plugin is running");

    }

};



