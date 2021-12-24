export type CloseAction = 'close' | 'hide'

export type Round = 'SHORT_BREAK' | 'LONG_BREAK' | 'FOCUS'

export type RoundTime = {
  [props in Round]: number
}

export interface Config {
  audio:string
  text:string
  title:string
  body:string
  color:string
}

export type RoundConfig = {
  [props in Round]: Config
}