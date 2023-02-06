import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import ErrorLayout from './components/Error/ErrorLayout'
import Error from './components/Error'
import Home from './pages/home'
import Statistics from './pages/statistics'
import Timer from './pages/timer'

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
        path:'statistics',
        element: <Statistics />,
        errorElement: <Error />,
      },
      {
        path:'timer',
        element: <Timer />,
        errorElement: <Error />,
      },
    ],
  },
])

export default router
