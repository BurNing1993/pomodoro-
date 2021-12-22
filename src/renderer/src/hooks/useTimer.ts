import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useEffect, useState } from 'react'

dayjs.extend(duration)
let timer: NodeJS.Timer | null = null
const defaultMin = 0.5
let total = defaultMin * 60 // seconds

export default function useTimer(onEnd?: () => void) {
  const [duration, setDuration] = useState(
    dayjs.duration(defaultMin, 'minutes')
  )
  const [paused, setPaused] = useState(true)
  const [percent, setPercent] = useState(0)
  const [time, setTime] = useState(`${defaultMin} : 00`)

  const tick = () => {
    timer = setInterval(() => {
      setDuration((d) => d.subtract(1, 'second'))
    }, 1000)
  }

  const start = () => {
    if (timer) {
      clearInterval(timer)
    }
    tick()
  }

  const pause = (p?: boolean) => {
    if (p != undefined) {
      setPaused(p)
    } else {
      setPaused((paused) => !paused)
    }
  }

  const reset = (min = defaultMin) => {
    if (timer) {
      clearInterval(timer)
    }
    if (min > 0) {
      total = min * 60
      setDuration(dayjs.duration(min, 'minutes'))
      setPercent(0)
      setPaused(true)
    }
  }

  useEffect(() => {
    const remain = duration.asSeconds()
    if (remain >= 0) {
      const p = Math.round((1 - remain / total) * 100)
      console.log(remain, total, p)
      setPercent(p)
      setTime(duration.format('mm : ss'))
    } else {
      if (timer) {
        clearInterval(timer)
      }
      if (onEnd) {
        onEnd()
      }
    }
  }, [duration])

  useEffect(() => {
    if (paused) {
      if (timer) {
        clearInterval(timer)
      }
    } else {
      tick()
    }
  }, [paused])

  //清理定时器
  useEffect(() => {
    return () => {
      console.log('clear')
      timer && clearInterval(timer)
    }
  }, [])

  return {
    start,
    pause,
    reset,
    percent,
    time,
    paused,
  }
}
