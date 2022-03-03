import React, { memo } from 'react'
import Icon, { CloseOutlined } from '@ant-design/icons'
import { ReactComponent as Minimize } from './minimize.svg'

// TODO ipc
const Control: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="cursor-pointer text-lg h-8 w-8 flex justify-center items-center hover:bg-gray-500">
        <Icon component={Minimize} />
      </div>
      <div className="cursor-pointer text-lg h-8 w-8 flex justify-center items-center hover:bg-red-600">
        <CloseOutlined />
      </div>
    </div>
  )
}

export default memo(Control)
