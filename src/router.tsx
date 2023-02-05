import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import ErrorLayout from './components/Error/ErrorLayout'
import Error from './components/Error'
import Home from './pages/home'
import Statistics from './pages/statistics'

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
    ],
  },
])

export default router
