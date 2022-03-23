import React, { memo, useEffect, useState } from 'react'
import { Progress } from 'antd'
import { useRecoilValue } from 'recoil'
import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  StepForwardOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { focusTimeState, breakTimeState } from '../../store/atoms'
import { autoStartState } from '../../store/selectors'
import { Round } from '../../types'
import { ROUND_CONFIG } from '../../utils/constants'
import { createTrayImage } from '../../utils'
import { updateTrayIcon } from '../../utils/ipc'
import { notice } from '../../utils/notice'

dayjs.extend(duration)
let timer: NodeJS.Timeout

const Timer: React.FC = () => {
  const focusTime = useRecoilValue(focusTimeState)
  const breakTime = useRecoilValue(breakTimeState)
  const autoStart = useRecoilValue(autoStartState)
  const [roundDuration, setRoundDuration] = useState<duration.Duration>(
    dayjs.duration(25, 'minute')
  )
  const [round, setRound] = useState<Round>('FOCUS')
  const [paused, setPaused] = useState(true)
  const [useNotice, setUseNotice] = useState(false)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (paused) {
      setUseNotice(false)
      clearInterval(timer)
    } else {
      setUseNotice(true)
      timer = setInterval(() => {
        setRoundDuration((d) => d.subtract(1, 'second'))
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [paused])

  useEffect(() => {
    if (paused) {
      return
    }
    const remain = roundDuration.asSeconds()
    const currentRoundMinutes = round === 'FOCUS' ? focusTime : breakTime
    if (remain >= 0) {
      const p = Math.round((1 - remain / (currentRoundMinutes * 60)) * 100)
      setPercent(p)
    } else {
      setRound((r) => (r === 'FOCUS' ? 'BREAK' : 'FOCUS'))
      setPaused(true)
      if (autoStart) {
        setTimeout(() => {
          setPaused(false)
        }, 500)
      }
      if (useNotice) {
        notice(round)
      }
    }
  }, [breakTime, focusTime, round, roundDuration, autoStart, paused, useNotice])

  useEffect(() => {
    if (round === 'FOCUS') {
      setRoundDuration(dayjs.duration(focusTime, 'minute'))
    } else {
      setRoundDuration(dayjs.duration(breakTime, 'minute'))
    }
    setPercent(0)
  }, [breakTime, focusTime, round])

  useEffect(() => {
    const url = createTrayImage(round, percent, paused)
    updateTrayIcon(url)
  }, [paused, percent, round])

  const skip = () => {
    const newRound: Round = round === 'FOCUS' ? 'BREAK' : 'FOCUS'
    setRound(newRound)
    setUseNotice(false)
  }
  const reset = () => {
    if (round === 'FOCUS') {
      setRoundDuration(dayjs.duration(focusTime, 'minute'))
    } else {
      setRoundDuration(dayjs.duration(breakTime, 'minute'))
    }
  }

  return (
    <div className="text-center">
      <div className="relative my-16">
        <Progress
          className="mx-auto"
          type="circle"
          width={200}
          percent={percent}
          showInfo={false}
          strokeColor={ROUND_CONFIG[round].strokeColor}
          trailColor={ROUND_CONFIG[round].color}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-xl font-bold">{ROUND_CONFIG[round].title}</div>
          <div className="text-lg">{roundDuration.format('mm : ss')}</div>
        </div>
      </div>
      <div
        className="flex items-center justify-around my-4"
        style={{
          fontSize: 24,
        }}
      >
        <StepForwardOutlined title="skip" onClick={skip} />
        <div
          className="flex items-center"
          style={{
            fontSize: '48px',
            lineHeight: '48px',
          }}
        >
          {paused ? (
            <PlayCircleOutlined
              title="start"
              onClick={() => setPaused(false)}
            />
          ) : (
            <PauseCircleOutlined
              title="pause"
              onClick={() => setPaused(true)}
            />
          )}
        </div>
        <ReloadOutlined title="reset" onClick={reset} />
      </div>
    </div>
  )
}

export default memo(Timer)
