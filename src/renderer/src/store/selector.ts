import { selector } from 'recoil'
import { currentRoundState, roundTimeState } from './atom'
import { ROUND_CONFIG } from '../utils/constant'
import { Config } from '../types'

// 当前轮次时间
export const durationMinutesState = selector<number>({
  key: 'durationMinutesState',
  get: ({ get }) => {
    const round = get(currentRoundState)
    const roundTime = get(roundTimeState)
    const min = roundTime[round] || 25
    return min
  },
})

// 当前轮次配置
export const currentRoundConfigState = selector<Config>({
  key: 'currentRoundConfigState',
  get: ({ get }) => {
    const round = get(currentRoundState)
    return ROUND_CONFIG[round]
  },
})
