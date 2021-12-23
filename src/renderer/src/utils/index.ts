import { TimerSetting } from '../types'

const REST_TIME = 'rest_time'
const DEFAULT_REST_TIME = 5

export function getRestTime(): number {
  const val = localStorage[REST_TIME]
  if (val) {
    return Number(val) || DEFAULT_REST_TIME
  } else {
    return DEFAULT_REST_TIME
  }
}

export function setRestTime(t: number) {
  localStorage[REST_TIME] = t
}

const FOCUS_TIME = 'focus_time'
const DEFAULT_FOCUS_TIME = 25

export function getFocusTime(): number {
  const val = localStorage[FOCUS_TIME]
  if (val) {
    return Number(val) || DEFAULT_FOCUS_TIME
  } else {
    return DEFAULT_FOCUS_TIME
  }
}

export function setFocusTime(t: number) {
  localStorage[FOCUS_TIME] = t
}

const TIMER_SETTING = 'TimerSetting'
export function getLocalTimerSetting(): TimerSetting {
  const localValue = localStorage[TIMER_SETTING]
  if (localValue) {
    try {
      const setting = JSON.parse(localValue)
      return setting
    } catch (error) {
      console.error(error)
    }
  }
  return {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    round: 4,
  }
}

export function setLocalTimerSetting(setting: TimerSetting) {
  localStorage[TIMER_SETTING] = JSON.stringify(setting)
}
