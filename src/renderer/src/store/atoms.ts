import { atom } from 'recoil'
import { ISetting } from '../types'
import { ROUND_CONFIG } from '../utils/constants'
import { getSetting, setSetting } from './helpers'

const LOCAL_FOCUS_TIME = 'local_focus_time'

export const focusTimeState = atom({
  key: 'focusTimeState',
  default: Number(localStorage.getItem(LOCAL_FOCUS_TIME) || ROUND_CONFIG.FOCUS.defaultMinutes),
  effects: [
    ({ onSet }) => {
      onSet((newVal) =>
        localStorage.setItem(LOCAL_FOCUS_TIME, newVal.toString())
      )
    },
  ],
})

const LOCAL_BREAK_TIME = 'local_break_time'

export const breakTimeState = atom({
  key: 'breakTimeState',
  default: Number(localStorage.getItem(LOCAL_BREAK_TIME) || ROUND_CONFIG.BREAK.defaultMinutes),
  effects: [
    ({ onSet }) => {
      onSet((newVal) =>
        localStorage.setItem(LOCAL_BREAK_TIME, newVal.toString())
      )
    },
  ],
})

export const settingState = atom<ISetting>({
  key: 'settingState',
  default: getSetting(),
  effects: [
    ({ onSet }) => {
      onSet((newVal) => setSetting(newVal))
    },
  ],
})