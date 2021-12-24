import { RoundTime } from '../types'

const ROUND_TIME = 'round_time'
export function getRoundTime(): RoundTime {
  const localValue = localStorage[ROUND_TIME]
  if (localValue) {
    try {
      const setting = JSON.parse(localValue)
      return setting
    } catch (error) {
      console.error(error)
    }
  }
  return {
    SHORT_BREAK: 5,
    LONG_BREAK: 15,
    FOCUS: 25,
  }
}

export function setLocalTimerSetting(roundTime: RoundTime) {
  localStorage[ROUND_TIME] = JSON.stringify(roundTime)
}

const AUTO_START = 'auto_start'

export function getAutoStart(): boolean {
  const val = localStorage[AUTO_START]
  if (val) {
    return val === 'true'
  } else {
    return false
  }
}

export function setAutoStart(autoStart: boolean) {
  localStorage[AUTO_START] = String(autoStart)
}

// 总轮次
const TOTAL_ROUNDS = 'total_rounds'

export function getTotalRounds(): number {
  const val = localStorage[TOTAL_ROUNDS]
  if (val) {
    return Number(val) || 4
  } else {
    return 4
  }
}

export function setTotalRounds(totalRounds: number) {
  localStorage[TOTAL_ROUNDS] = totalRounds
}
