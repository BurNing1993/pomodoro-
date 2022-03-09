import React from 'react'
import { RecoilRoot } from 'recoil'
import TitleBar from './components/TitleBar'
import Timer from './components/Timer'

function App() {
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
