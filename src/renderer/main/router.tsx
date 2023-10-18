import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from './pages/error'
import Home from './pages/home'
import Timer from './pages/timer'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/timer',
        element: <Timer />,
        errorElement: <Error />,
      },
    ],
  },
])

export default router
