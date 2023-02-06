import React, { memo } from 'react'
import { Outlet, Link } from 'react-router-dom'
import AppMenu from './AppMenu'
import logo from './logo-32x32.png'

const AppLayout: React.FC = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col-reverse md:flex-col">
      <header className="shadow bg-white">
        <div className="flex items-center container mx-auto h-10">
          <Link
            to="/"
            className="hidden md:flex justify-between md:justify-start items-center mr-1 md:mr-4 text-lg transition-colors duration-200 transform hover:text-gray-300"
          >
            <img src={logo} alt="logo" />
            <span>番茄钟</span>
          </Link>
          <AppMenu />
        </div>
      </header>
      <main className="container mx-auto my-2 p-2 md:p-4 rounded flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default memo(AppLayout)
