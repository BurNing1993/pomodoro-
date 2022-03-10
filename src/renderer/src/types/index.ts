export type Round = 'FOCUS' | 'BREAK'

export type RoundConfig = {
  [props in Round]: RoundInfo
}

export interface RoundInfo {
  color: string
  trailColor: string
  strokeColor: string
  defaultMinutes: number
  title: string
  body:string
}

export type CloseAction = 'CLOSE' | 'TRAY'

export interface ISetting {
  autoStart: boolean
  closeAction: CloseAction
}