import { atom } from 'recoil'
import { Action, TimerSetting } from '../types'
import { getLocalTimerSetting } from '../utils'

export const timerSettingState = atom<TimerSetting>({
  key: 'timerSettingState',
  default: getLocalTimerSetting(),
})

export const currentActionState = atom<Action>({
  key: 'currentActionState',
  default: 'focus',
})
