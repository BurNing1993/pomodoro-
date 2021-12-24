import { useRecoilState, useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { currentRoundConfigState, durationMinutesState } from './selector'
import {
  autoStartState,
  currentRoundState,
  roundTimeState,
  totalRoundsState,
} from './atom'

dayjs.extend(duration)

let timer: NodeJS.Timeout | null = null
let init = true

export function useTimer(audioEl: HTMLAudioElement) {
  const durationMinutes = useRecoilValue(durationMinutesState)
  const totalRounds = useRecoilValue(totalRoundsState)
  const roundTime = useRecoilValue(roundTimeState)
  const currentRoundConfig = useRecoilValue(currentRoundConfigState)
  const autoStart = useRecoilValue(autoStartState)
  const [round, setRound] = useRecoilState(currentRoundState)

  const [roundNumber, setRoundNumber] = useState(1)
  const [roundDuration, setRoundDuration] = useState(
    dayjs.duration(durationMinutes, 'minutes')
  )
  const [time, setTime] = useState(`${durationMinutes} : 00`)
  const [paused, setPaused] = useState(true)
  const [percent, setPercent] = useState(0)
  const [mute, setMute] = useState(false)

  const tick = () => {
    if (timer) {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      setRoundDuration((d) => d.subtract(1, 'second'))
    }, 1000)
  }

  const reset = (run = false) => {
    setRoundDuration(dayjs.duration(durationMinutes, 'minutes'))
    setPercent(0)
    if (run) {
      setPaused(false)
    } else {
      setPaused(true)
    }
  }

  const play = () => {
    audioEl.src = currentRoundConfig.audio
    audioEl.oncanplay = () => {
      audioEl.play()
    }
  }

  const end = (ship = false) => {
    console.log('timer end')
    if (!ship && !mute) {
      play()
    }
    if (round === 'SHORT_BREAK' || round === 'LONG_BREAK') {
      setRound('FOCUS')
      setRoundNumber((p) => (p === 4 ? 1 : p + 1))
    } else {
      if (roundNumber === totalRounds) {
        setRound('LONG_BREAK')
      } else {
        setRound('SHORT_BREAK')
      }
    }
  }

  useEffect(() => {
    setRoundDuration(dayjs.duration(durationMinutes, 'minutes'))
  }, [durationMinutes])

  useEffect(() => {
    if (init) {
      reset(false)
      init = false
    } else {
      reset(autoStart)
    }
  }, [round, autoStart])

  useEffect(() => {
    reset(false)
  }, [roundTime])

  useEffect(() => {
    init = true
  }, [autoStart])

  useEffect(() => {
    const remain = roundDuration.asSeconds()
    if (remain >= 0) {
      const p = Math.round((1 - (remain / durationMinutes) * 60) * 100)
      setPercent(p)
      setTime(roundDuration.format('mm : ss'))
    } else {
      if (timer) {
        clearInterval(timer)
      }
      end()
    }
  }, [roundDuration])

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
    time,
    currentRoundConfig,
    roundNumber,
    totalRounds,
    percent,
    paused,
    setPaused,
    setMute,
    reset,
    end,
  }
}
