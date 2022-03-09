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
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (paused) {
      clearInterval(timer)
    } else {
      timer = setInterval(() => {
        setRoundDuration((d) => d.subtract(1, 'second'))
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [paused])

  useEffect(() => {
    const remain = roundDuration.asSeconds()
    const currentRoundMinutes = round === 'FOCUS' ? focusTime : breakTime
    if (remain >= 0) {
      const p = Math.round((1 - remain / (currentRoundMinutes * 60)) * 100)
      setPercent(p)
    } else {
      if (!autoStart) {
        setPaused(true)
      }
      const newRound: Round = round === 'FOCUS' ? 'BREAK' : 'FOCUS'
      setRound(newRound)
      // TODO notice
    }
  }, [breakTime, focusTime, round, roundDuration, autoStart])

  useEffect(() => {
    if (round === 'FOCUS') {
      setRoundDuration(dayjs.duration(focusTime, 'minute'))
    } else {
      setRoundDuration(dayjs.duration(breakTime, 'minute'))
    }
  }, [breakTime, focusTime, round])

  const skip = () => {
    const newRound: Round = round === 'FOCUS' ? 'BREAK' : 'FOCUS'
    setRound(newRound)
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
          strokeColor={ROUND_CONFIG[round].color}
          trailColor={ROUND_CONFIG[round].trailColor}
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
