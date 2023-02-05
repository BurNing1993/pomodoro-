import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

const AppMenu: React.FC = () => {
  return (
    <nav id="nav">
      <NavLink to="/" className="link">
        首页
      </NavLink>
    </nav>
  )
}

export default memo(AppMenu)
