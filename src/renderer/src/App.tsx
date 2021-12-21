import { useState } from 'react'
import TitleBar from './components/TitleBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <TitleBar />
    </div>
  )
}

export default App
