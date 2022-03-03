import { atom } from 'recoil'

const LOCAL_FOCUS_TIME = 'local_focus_time'

export const focusTimeState = atom({
  key: 'focusTimeState',
  default: Number(localStorage.getItem(LOCAL_FOCUS_TIME) || 25),
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
  default: Number(localStorage.getItem(LOCAL_BREAK_TIME) || 5),
  effects: [
    ({ onSet }) => {
      onSet((newVal) =>
        localStorage.setItem(LOCAL_BREAK_TIME, newVal.toString())
      )
    },
  ],
})
