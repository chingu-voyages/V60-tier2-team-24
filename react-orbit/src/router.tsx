import { createBrowserRouter } from 'react-router';

import { AppShell } from '@/components/layout/AppShell';
import { ApplicationsPage } from '@/pages/ApplicationsPage';
import { DashboardPage } from '@/pages/DashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'applications',
        element: <ApplicationsPage />,
      },
    ],
  },
]);
