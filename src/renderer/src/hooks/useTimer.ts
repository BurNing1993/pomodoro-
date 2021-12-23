import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useEffect, useState,useContext } from 'react'
import { getRestTime, getFocusTime } from '../utils'
import work from '../assets/audio/alert-work.mp3'
import rest from '../assets/audio/alert-short-break.mp3'

dayjs.extend(duration)

export type Action = 'rest' | 'focus'

let timer: NodeJS.Timer | null = null
const defaultMin = getFocusTime()
let total = defaultMin * 60 // seconds

const getMins = (action: Action) =>
  action === 'focus' ? getFocusTime() : getRestTime()

export default function useTimer(audioEl: HTMLAudioElement) {
  const [duration, setDuration] = useState(
    dayjs.duration(defaultMin, 'minutes')
  )
  const [mute, setMute] = useState(false)
  const [action, setAction] = useState<Action>('focus')
  const [paused, setPaused] = useState(true)
  const [percent, setPercent] = useState(0)
  const [time, setTime] = useState(`${defaultMin} : 00`)

  const tick = () => {
    if (timer) {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      setDuration((d) => d.subtract(1, 'second'))
    }, 1000)
  }

  const start = () => {
    setPaused(false)
    tick()
  }

  const pause = (p?: boolean) => {
    if (p != undefined) {
      setPaused(p)
    } else {
      setPaused((paused) => !paused)
    }
  }

  const reset = () => {
    const min = getMins(action)
    if (min > 0) {
      total = min * 60
      setDuration(dayjs.duration(min, 'minutes'))
      setPercent(0)
      setPaused(true)
    }
  }

  const toggleAction = (action?: Action) => {
    if (action != undefined) {
      setAction(action)
    } else {
      setAction((a) => (a === 'focus' ? 'rest' : 'focus'))
    }
  }

  const onEnd = () => {}

  const toggleMute = (m?: boolean) => {
    if (m != undefined) {
      setMute(m)
    } else {
      setMute((s) => !s)
    }
  }

  const play = (action: Action) => {
    if (!mute) {
      if (action === 'focus') {
        audioEl.src = work
      } else {
        audioEl.src = rest
      }
      audioEl.oncanplay = () => {
        audioEl.play()
      }
    }
  }

  useEffect(() => {
    const remain = duration.asSeconds()
    if (remain >= 0) {
      const p = Math.round((1 - remain / total) * 100)
      setPercent(p)
      setTime(duration.format('mm : ss'))
    } else {
      if (timer) {
        clearInterval(timer)
      }
      onEnd()
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

  useEffect(() => {
    reset()
  }, [action])

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
    toggleAction,
    toggleMute,
    play,
    percent,
    time,
    paused,
    action,
    mute,
  }
}
