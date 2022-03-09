import React, { memo } from 'react'
import Control from './Control'
import Setting from './Setting'
import { toggleDevtools } from '../../utils/ipc'

const TitleBar: React.FC = () => {
  return (
    <header className="flex items-center justify-between h-8">
      <Setting />
      <div className="drag flex-1 text-sky-500 text-lg text-center">番茄钟</div>
      {process.env.NODE_ENV !== 'production' && (
        <button onClick={toggleDevtools}>devtools</button>
      )}
      <Control />
    </header>
  )
}

export default memo(TitleBar)
