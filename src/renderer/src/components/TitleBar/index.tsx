import React, { memo, useEffect } from 'react'
import Control from './Control'
import Setting from './Setting'
import { ipcRenderer } from 'electron'
import { toggleDevtools, getItchApi } from '../../utils/ipc'

const TitleBar: React.FC = () => {
  const itch = () => {
    console.log(process.env.ITCHIO_API_KEY)
    getItchApi()
  }

  useEffect(() => {
    ipcRenderer.on('itch_api', (e, apiKey) => {
      console.log('ipcRenderer apiKey', apiKey)
    })
  }, [])

  return (
    <header className="flex items-center justify-between h-8">
      <Setting />
      <div className="drag flex-1 text-sky-500 text-lg text-center">番茄钟</div>
      {/* {process.env.NODE_ENV !== 'production' && (
        <button onClick={toggleDevtools}>devtools</button>
      )} */}
      <button onClick={toggleDevtools}>devtools</button>
      <button onClick={itch}>itch</button>
      <Control />
    </header>
  )
}

export default memo(TitleBar)
