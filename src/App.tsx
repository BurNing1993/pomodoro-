import React, { useEffect, useRef, useState } from 'react'
import { Circle } from 'rc-progress'
import { Status } from './utils/types'
import {
  getNotificationPermission,
  notice,
  showNotification,
} from './utils/notification'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

function App() {
  let timer: NodeJS.Timeout
  const [content, setContent] = useState('content')
  const [status, setStatus] = useState<Status>(Status.REST)
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

  useEffect(() => {
    getNotificationPermission()
  }, [])

  const onWork = () => {
    clearInterval(timer)
    setStatus(Status.WORK)
    onStart()
  }
  const onRest = () => {
    clearInterval(timer)
    setStatus(Status.REST)
    onStart()
  }

  return (
    <div className="bg-blue-400 h-screen text-center text-white flex flex-col items-center justify-center relative">
      <h2 className="text-4xl mb-4 tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        {content}
        {status}
      </h2>
      <section className="p-16 mx-auto w-80 h-80 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-2xl font-bold">
          {time.format('mm : ss')}
        </div>
        <Circle
          className="absolute top-0 left-0 z-10"
          percent={percent}
          strokeWidth={5}
          trailWidth={5}
          strokeColor="#000"
        />
      </section>
      <button
        className="mt-6 rounded-md text-white bg-indigo-500 hover:bg-indigo-700  py-2 md:py-4 text-base md:text-lg px-5 md:px-10 focus:outline-none"
        onClick={() => onStart()}
      >
        Start
      </button>
      <button
        className="mt-6 rounded-md text-white bg-indigo-500 hover:bg-indigo-700  py-2 md:py-4 text-base md:text-lg px-5 md:px-10 focus:outline-none"
        onClick={notice}
      >
        通知
      </button>
      <button
        className="mt-6 rounded-md text-white bg-indigo-500 hover:bg-indigo-700  py-2 md:py-4 text-base md:text-lg px-5 md:px-10 focus:outline-none"
        onClick={() => showNotification(onWork, onRest)}
      >
        showNotification
      </button>
    </div>
  )
}

export default App
