import React, { memo, useEffect, useState } from 'react'
import Dialog from 'rc-dialog'
import { Button, Footer, RadioContainer, Remember } from './style'
import { closeWindow } from '../../utils/ipc'
import {
  getLocalCloseAction,
  getLocalRemember,
  setLocalCloseAction,
  setLocalRemember,
} from './helper'
import { CloseAction } from '../../types'

interface Props {
  visible: boolean
  onClose: () => void
}

const CloseDialog: React.FC<Props> = ({ visible, onClose }) => {
  const [action, setAction] = useState<CloseAction>(getLocalCloseAction())
  const [remember, setRemember] = useState(getLocalRemember())
  const onConfirm = () => {
    closeWindow(action === 'close')
    onClose()
  }
  const onRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked
    setRemember(val)
    setLocalRemember(val)
  }

  useEffect(() => {
    setLocalCloseAction(action)
  }, [action])

  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      title="关闭"
      style={{
        marginTop: '20vh',
      }}
      bodyStyle={{
        padding: '0 20px',
      }}
    >
      <p>关闭主窗口:</p>
      <RadioContainer>
        <div>
          <input
            type="radio"
            id="hide"
            name="close"
            value="hide"
            onChange={(e) => setAction(e.target.checked ? 'hide' : 'close')}
            checked={action === 'hide'}
          />
          <label htmlFor="hide">最小化到系统托盘</label>
        </div>
        <div>
          <input
            type="radio"
            id="close"
            name="close"
            value="close"
            onChange={(e) => setAction(e.target.checked ? 'close' : 'hide')}
            checked={action === 'close'}
          />
          <label htmlFor="close">关闭应用</label>
        </div>
      </RadioContainer>
      <Remember>
        <input
          type="checkbox"
          name="remember"
          id="remember"
          checked={remember}
          onChange={onRememberChange}
        />
        <label htmlFor="remember">下次不再提醒</label>
      </Remember>
      <Footer>
        <Button onClick={onConfirm}>确定</Button>
        <Button primary onClick={onClose}>
          取消
        </Button>
      </Footer>
    </Dialog>
  )
}

export default memo(CloseDialog)
