import { ClockCircleOutlined, HomeOutlined } from '@ant-design/icons'
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

const AppMenu: React.FC = () => {
  return (
    <nav id="nav" className="flex-1 flex justify-around md:justify-start">
      <NavLink to="/" className="link">
        <HomeOutlined />
        <span>首页</span>
      </NavLink>
      <NavLink to="/timer" className="link">
        <ClockCircleOutlined />
        <span>计时</span>
      </NavLink>
    </nav>
  )
}

export default memo(AppMenu)
