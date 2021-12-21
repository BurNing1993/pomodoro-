import React, { memo, useState } from 'react'
import { Container, Control, Icon, Menu, Title } from './style'
import { minimizeWindow, toggleDevtools, closeWindow } from '../../utils/ipc'
import { Close, MenuIcon, Minimize } from '../Icons'
import CloseDialog from './CloseDialog'
import { getLocalCloseAction, getLocalRemember } from './helper'
import Setting from './Setting'

const TitleBar: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const onClose = () => {
    const remember = getLocalRemember()
    if (remember) {
      const action = getLocalCloseAction()
      closeWindow(action === 'close')
    } else {
      setVisible(true)
    }
  }
  return (
    <>
      <Container>
        <Menu
          onClick={() => setOpen((p) => !p)}
          style={{
            transform: open ? 'rotate(0.25turn)' : 'none',
          }}
        >
          {MenuIcon}
        </Menu>
        <Title>番茄钟</Title>
        <Control>
          {import.meta.env.DEV && (
            <button onClick={toggleDevtools}>devtools</button>
          )}
          <Icon onClick={minimizeWindow}>{Minimize}</Icon>
          <Icon close onClick={onClose}>
            {Close}
          </Icon>
        </Control>
      </Container>
      <CloseDialog visible={visible} onClose={() => setVisible(false)} />
      <Setting open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default memo(TitleBar)
