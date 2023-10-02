export default [
  {
    method: 'GET',
    path: '/genres',
    handler: 'myController.genres',
    config: {
      policies: [

      ],
    },
  },
];
