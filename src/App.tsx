import React, { useEffect, useState } from 'react'
import { Circle } from 'rc-progress'
import { ActionType, Action } from './utils/types'
import { notice } from './utils/notification'
import Dialog from 'rc-dialog'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import 'rc-dialog/assets/index.css'
dayjs.extend(duration)

function App() {
  let timer: NodeJS.Timeout
  let total = 0
  const [action, setAction] = useState<ActionType>('WORK')
  const [time, setTime] = useState<duration.Duration>(
    dayjs.duration(Action.WORK, 'minutes')
  )
  const [percent, setPercent] = useState(0)
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onStart = (action: ActionType) => {
    if (timer) {
      console.log(timer)
      clearInterval(timer)
    }
    setAction(action)
    if (action === 'REST') {
      total = dayjs.duration(Action.REST, 'minutes').asSeconds()
    } else {
      total = dayjs.duration(Action.WORK, 'minutes').asSeconds()
    }
    timer = setInterval(() => {
      setTime((t) => {
        const remain = t.subtract(1, 'second')
        const remainSeconds = remain.asSeconds()
        const p = Number(((1 - remainSeconds / total) * 100).toFixed(2))
        setPercent(p)
        if (remainSeconds === 0 && timer) {
          clearInterval(timer)
          setVisible(true)
          let content = ''
          let title = ''
          if (action === 'REST') {
            title = '休息完毕'
            content = '休息好了,开始工作吧!'
          } else {
            title = '工作完毕'
            content = '休息一下,马上回来!'
          }
          setTitle(title)
          setContent(content)
          notice(title, content)
          setPercent(0)
        }
        return remain
      })
    }, 1000)
  }
  useEffect(() => {
    if (!timer) {
      onStart('WORK')
    }
  }, [])

  const onAction = (action: ActionType) => {
    setVisible(false)
    onStart(action)
  }

  return (
    <>
      <div className="bg-blue-400 h-screen text-center text-white flex flex-col items-center justify-center relative">
        <h2 className="text-4xl mb-4 tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          {action === 'REST' ? '☕休息☕' : '💻工作💻'}
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
      </div>
      <Dialog title={title} onClose={() => onAction('WORK')} visible={visible}>
        <p>{content}</p>
        <div className="flex items-center justify-around mt-6">
          <button
            className="rounded-md text-white bg-indigo-500 hover:bg-indigo-700 py-2 text-sm md:text-base  px-6 focus:outline-none"
            onClick={() => onAction('WORK')}
          >
            工作
          </button>
          <button
            className="rounded-md text-white bg-gray-500 hover:bg-gray-700 py-2 text-sm md:text-base  px-6 focus:outline-none"
            onClick={() => onAction('REST')}
          >
            休息
          </button>
        </div>
      </Dialog>
    </>
  )
}

export default App
