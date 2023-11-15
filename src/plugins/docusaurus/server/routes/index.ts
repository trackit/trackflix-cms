export default [
  {
    method: 'GET',
    path: '/docusaurus',
    handler: 'docusaurus.index',
    config: {
      auth: false,
      policies: [],
    },
  },
];
