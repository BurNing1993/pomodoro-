export type CloseAction = 'close' | 'hide'

export type Action = 'shoutBreak' | 'longBreak' | 'focus'

export type TimerSetting = {
  [props in Action]: number
} & {
  round: number
}
