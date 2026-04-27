import { createBrowserRouter } from 'react-router';

import { AppShell } from '@/components/layout/AppShell';
import { ApplicationsPage } from '@/pages/ApplicationsPage';
import DashboardPage  from '@/pages/DashboardPage';
import { RegisterPage } from './pages/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterPage />,
  },
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
