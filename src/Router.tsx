import { Box } from '@mui/material';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Users } from './pages/admin/Users';

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
    },
    {
      path: '/content',
      children: [
        {
          path: '/content/live-channels',
          element: <Box><h1>Live channels</h1></Box>,
        },
        {
          path: '/content/vod',
          element: <h1>VOD</h1>,
        },
      ],
    },
    {
      path: '/reporting',
      children: [
        {
          path: '/reporting/metrics',
          element: <h1>Metrics</h1>,
        },
      ],
    },
    {
      path: '/configuration',
      children: [
        {
          path: '/configuration/genres',
          element: <h1>Genres</h1>,
        },
        {
          path: '/configuration/categories',
          element: <h1>Categories</h1>,
        },
        {
          path: '/configuration/platforms',
          element: <h1>Platforms</h1>,
        },
      ],
    },
    {
      path: '/admin',
      children: [
        {
          path: '/admin/users',
          element: <Users />,
        },
        {
          path: '/admin/permissions',
          element: <h1>Permissions</h1>,
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}