import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import TitleBar from './components/TitleBar'
import Timer from './components/Timer'
import { getLocalTheme, setLocalTheme } from './utils/theme'

function App() {

  useEffect(()=>{
    setLocalTheme(getLocalTheme())
  },[])

  return (
    <RecoilRoot>
      <div className="h-screen overflow-hidden">
        <TitleBar />
        <Timer />
      </div>
    </RecoilRoot>
  )
}

export default App
