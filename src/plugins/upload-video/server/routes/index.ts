export default [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/link',
    handler: 'myController.upload',
    config: {
      policies: [],
    },
  },
];
