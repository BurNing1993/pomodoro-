import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto py-2 lg:py-4 container">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
