import { createContext } from 'react'
import { Action, Store, TimerSetting } from '../types'
import { getLocalTimerSetting } from '../utils'

export const initialState: TimerSetting = getLocalTimerSetting()


export const TimerSettingContext = createContext<Store<TimerSetting>>({
  state: initialState,
  dispatch: () => {},
})


export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    default:
      return state
  }
}
