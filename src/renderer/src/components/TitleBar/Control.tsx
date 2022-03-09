import React, { memo } from 'react'
import { useRecoilValue } from 'recoil'
import Icon, { CloseOutlined } from '@ant-design/icons'
import { ReactComponent as Minimize } from './minimize.svg'
import { minimizeWindow, closeWindow } from '../../utils/ipc'
import { settingState } from '../../store/atoms'

// TODO ipc
const Control: React.FC = () => {
  const setting = useRecoilValue(settingState)
  const close = () => {
    closeWindow(setting.closeAction === 'CLOSE')
  }
  return (
    <div className="flex items-center w-16">
      <div
        className="cursor-pointer text-lg h-8 w-8 flex justify-center items-center hover:bg-gray-500"
        onClick={minimizeWindow}
      >
        <Icon component={Minimize} />
      </div>
      <div
        className="cursor-pointer text-lg h-8 w-8 flex justify-center items-center hover:bg-red-600"
        onClick={close}
      >
        <CloseOutlined />
      </div>
    </div>
  )
}

export default memo(Control)
