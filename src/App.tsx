import React from 'react'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import useBackground from './hooks/useBackground'
import router from './router'
import { TodoListProvider } from './context/TodoListContext'

const App: React.FC = () => {
  const { backgroundUrl } = useBackground()
  return (
    <ConfigProvider locale={zhCN}>
      <TodoListProvider>
        <section
          className="min-h-screen bg-black"
          style={{ background: `url(${backgroundUrl}) no-repeat center fixed` }}
        >
          <RouterProvider router={router} />
        </section>
      </TodoListProvider>
    </ConfigProvider>
  )
}

export default App
