const readOnlyUsersPermissions = {
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
}

const getApiContentTypesFields = (contentTypeService) => {
  const apiUIDs : string[] = contentTypeService.findAllContentTypes()
  .map(ct => ct.uid)
  .filter(uid => uid.startsWith("api::"));
  const permissions = apiUIDs.map((uid) => {
    const contentType = contentTypeService.findContentType(uid);
    const fields = Object.keys(contentType.attributes).filter(key => key !== "id");
    return {
      action: 'plugin::content-manager.explorer.read',
      subject: uid,
      conditions: [],
      properties: {
        fields,
      },
    }
  });
  return permissions
};


const createReadOnlyRole = async (strapi) => {
  const contentTypeService = strapi.services["plugin::content-manager.content-types"];
  const roleService = strapi.services["admin::role"];
  const permissions = [
    readOnlyUsersPermissions,
    ...getApiContentTypesFields(contentTypeService),
  ];
  const data = await strapi.entityService.create('admin::role', {
    data: {
      name: 'Read-Only',
      code: `read-only`,
      description: 'Read only access for demo user',
    },
  });
  await roleService.assignPermissions(data.id, permissions);
}

export const createReadOnlyRoleIfNotExists = async (strapi) => {
  const data: any[] = await strapi.entityService.findMany("admin::role", {
    filters: { code: {$eq: "read-only"}}
  })
  if (data.length == 0)
    await createReadOnlyRole(strapi);
};