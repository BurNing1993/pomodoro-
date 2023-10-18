import React from 'react'
import ThemeButton from './ThemeButton'
import { NavLink, useLocation } from 'react-router-dom'
import { FluentAdd } from '../components/Icons'
import emitter from '../utils/events'

const Header: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <header
      id="titlebar-container"
      className="bg-base-200 border-b border-base-300"
    >
      <div id="titlebar" className="px-2 flex gap-2 items-center">
        <nav className="flex items-center gap-2">
          <div>logo</div>
          <NavLink to="/" className="link">
            待办
          </NavLink>
          <NavLink to="/timer" className="link">
            timer
          </NavLink>
        </nav>
        {pathname === '/' && (
          <button
            className="btn btn-sm btn-ghost ml-4"
            onClick={() => emitter.emit('addEvent')}
          >
            <FluentAdd />
            <span>待办</span>
          </button>
        )}
        <div className="flex-1 h-full draggable"></div>
        <ThemeButton />
      </div>
    </header>
  )
}

export default Header
