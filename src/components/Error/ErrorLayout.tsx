import { useRouteError } from 'react-router-dom'
import { Layout, theme } from 'antd'

export default function ErrorPage() {
  const error = useRouteError() as any
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken()
  
  return (
    <Layout
      className="min-h-screen text-center p-10"
      style={{ background: colorBgContainer, color: colorText }}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Layout>
  )
}
