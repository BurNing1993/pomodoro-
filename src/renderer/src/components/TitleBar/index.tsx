import React, { memo } from 'react'
import Control from './Control'

const TitleBar: React.FC = () => {
  return (
      <header className="flex items-center justify-between h-8">
        <span className="drag flex-1 text-center">番茄钟</span>
        <Control />
      </header>
  )
}

export default memo(TitleBar)
