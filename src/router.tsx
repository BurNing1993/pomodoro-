import React from 'react'
import { Skeleton } from 'antd'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import ErrorLayout from './components/Error/ErrorLayout'
import Error from './components/Error'
import Home from './pages/home'
import Timer from './pages/timer'

const Statistics = React.lazy(() => import('./pages/statistics'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: 'statistics',
        element: (
          <React.Suspense fallback={<Skeleton active />}>
            <Statistics />
          </React.Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: 'timer',
        element: <Timer />,
        errorElement: <Error />,
      },
    ],
  },
])

export default router
