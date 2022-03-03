import React from 'react'
import { RecoilRoot } from 'recoil'
import TitleBar from './components/TitleBar'

function App() {
  return (
    <RecoilRoot>
      <div className="h-screen overflow-hidden">
        <TitleBar />
      </div>
    </RecoilRoot>
  )
}

export default App
