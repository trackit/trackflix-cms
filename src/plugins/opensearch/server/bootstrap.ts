/// <reference path="../custom.d.ts" />

import { Client} from '@opensearch-project/opensearch'
import { Strapi } from "@strapi/strapi";
import { defaultProvider } from '@aws-sdk/credential-provider-node' 
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws'



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
      const client = new Client({
        ...AwsSigv4Signer({
          region: 'us-west-2',
          service: 'aoss',
          getCredentials: () => {
            // Any other method to acquire a new Credentials object can be used.
            const credentialsProvider = defaultProvider();
            return credentialsProvider();
          },
        }),
        node: process.env.OPENSEARCH_HOST
      });


      strapi.opensearch = client;



      await helper.initialStrapi();



      strapi.log.info("The opensearch plugin is running");

    }

};



