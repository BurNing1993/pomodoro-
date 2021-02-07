import React, { useEffect, useRef, useState } from 'react'
import { Circle } from 'rc-progress'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

function App() {
  let timer: NodeJS.Timeout
  const [content, setContent] = useState('content')
  const [time, setTime] = useState<duration.Duration>(
    dayjs.duration(45, 'second')
  )
  const [timeUp, setTimeUp] = useState(false)
  const [percent, setPercent] = useState(0)

  let total: number = 45

  const onStart = (content?: string, m: number = 45) => {
    setTimeUp(false)
    total = m
    setTime(dayjs.duration(m, 'second'))
    if (content) {
      setContent(content)
    }
    timer = setInterval(() => {
      setTime((t) => {
        const remain = t.subtract(1, 'second')
        const p = parseInt(
          ((1 - remain.asSeconds() / total) * 100).toFixed(0),
          10
        )
        setPercent(p)
        if (remain.seconds() <= 0 && timer) {
          setTimeUp(true)
          clearInterval(timer)
        }
        return remain
      })
    }, 1000)
  }

  return (
    <div className="bg-blue-400 text-white text-center">
      <div className="w-full max-w-xl mx-auto h-screen ">
        <p>{content}</p>
        <section className="p-16 mx-auto w-80 h-80 relative">
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20">
            {time.format('mm:ss')}
          </div>
          <div>{total}</div>
          <Circle
            className="absolute top-0 left-0 z-10"
            percent={percent}
            strokeWidth={5}
            trailWidth={5}
            strokeColor="#000"
          />
        </section>
        <button onClick={() => onStart()}>Start</button>
      </div>
    </div>
  )
}

export default App
