import { atom } from 'recoil'
import { Round, RoundTime } from '../types'
import { getRoundTime, getAutoStart, setAutoStart, getTotalRounds } from '../utils'

// timer 时间设置
export const roundTimeState = atom<RoundTime>({
  key: 'roundTimeState',
  default: getRoundTime(),
})

// 当前轮次
export const currentRoundState = atom<Round>({
  key: 'currentActionState',
  default: 'FOCUS',
})

// 总轮次
export const totalRoundsState = atom<number>({
  key: 'totalRoundsState',
  default: getTotalRounds()
})

// 是否自动开始
export const autoStartState = atom<boolean>({
  key: 'autoStartState',
  default: getAutoStart(),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newVal) => {
        setAutoStart(newVal)
      })
    },
  ],
})
