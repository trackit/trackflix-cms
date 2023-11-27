const readOnlyPermissions = [
  {
    action: 'plugin::content-manager.explorer.read',
    subject: 'plugin::users-permissions.user',
    conditions: [],
    properties: {
      fields: [
        'username',
        'email',
        'provider',
        'password',
        'resetPasswordToken',
        'confirmationToken',
        'confirmed',
        'blocked',
        'role',
      ],
    },
  },
  {
    action: 'plugin::content-manager.explorer.read',
    subject: 'api::category.category',
    conditions: [],
    properties: {
      fields: ['Name', 'genre'],
    },
  },
  {
    action: 'plugin::content-manager.explorer.read',
    subject: 'api::genre.genre',
    conditions: [],
    properties: {
      fields: ['Name', 'categories'],
    },
  },
  {
    action: 'plugin::content-manager.explorer.read',
    subject: 'api::live-channel.live-channel',
    conditions: [],
    properties: {
      fields: [
        'name',
        'input_type',
        'output_type',
        'thumbnail',
        'Live_to_vod',
        'catch_up',
        'genre',
        'category',
        'genre-category-relation',
        'vods',
      ],
    },
  },
  {
    action: 'plugin::content-manager.explorer.read',
    subject: 'api::serie.serie',
    conditions: [],
    properties: {
      fields: ['Name', 'Thumbnail', 'pub_date', 'description'],
    },
  },
  {
    action: 'plugin::content-manager.explorer.read',
    subject: 'api::vod.vod',
    conditions: [],
    properties: {
      fields: [
        'Name',
        'Thumbnails',
        'rotation_start',
        'rotation_end',
        'description',
        'live_channel',
        'genre-category-relation',
        'views',
        'genre',
        'category',
        'media_url',
        'highlighted',
      ],
    },
  },
]

const createReadOnlyRole = async () => {
  const roleService = strapi.services["admin::role"];
  const data = await strapi.entityService.create('admin::role', {
    data: {
      name: 'read-only',
      code: `read-only`,
      description: 'Read only access for demo user',
    },
  });
  await roleService.assignPermissions(data.id, readOnlyPermissions);
}

const createReadOnlyRoleIfNotExists = async () => {
  const data: any[] = await strapi.entityService.findMany("admin::role", {
    filters: { code: {$eq: "read-only"}}
  })
  if (data.length == 0)
    await createReadOnlyRole();
};


export default {
/**
 * An asynchronous register function that runs before
 * your application is initialized.
 *
 * This gives you an opportunity to extend code.
 */
register(/*{ strapi }*/) {},

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */
async bootstrap({ strapi }) {
  createReadOnlyRoleIfNotExists();
},
};
