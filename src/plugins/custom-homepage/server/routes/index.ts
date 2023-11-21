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
    path: '/vod',
    handler: 'myController.vod',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/live',
    handler: 'myController.liveChannel',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/me',
    handler: 'myController.getMe',
    config: {
      policies: [],
    },
  },
];
