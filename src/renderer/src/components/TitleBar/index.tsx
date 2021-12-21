import React, { memo } from 'react'
import {
  Close,
  Container,
  Control,
  Icon,
  Menu,
  MenuIcon,
  Minimize,
  Title,
} from './style'
import { closeWindow, minimizeWindow, toggleDevtools } from '../../utils/ipc'

const TitleBar: React.FC = () => {
  return (
    <Container>
      <Menu>{MenuIcon}</Menu>
      <Title>番茄钟</Title>
      <Control>
        <button onClick={toggleDevtools}>devtools</button>
        <Icon onClick={minimizeWindow}>{Minimize}</Icon>
        <Icon close onClick={closeWindow}>
          {Close}
        </Icon>
      </Control>
    </Container>
  )
}

export default memo(TitleBar)
