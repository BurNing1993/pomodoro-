import { ISetting } from '../types'

const LOCAL_SETTING = 'setting'

const DEFAULT_SETTING: ISetting = {
  autoStart: false,
  closeAction: 'TRAY',
}

export function getSetting(): ISetting {
  try {
    const val = localStorage.getItem(LOCAL_SETTING)
    if (val) {
      return JSON.parse(val)
    }
  } catch (error) {
    console.error(error)
  }
  return DEFAULT_SETTING
}

export function setSetting(payload:ISetting){
    localStorage.setItem(LOCAL_SETTING,JSON.stringify(payload))
}