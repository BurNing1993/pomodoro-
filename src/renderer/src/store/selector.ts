import { selector } from 'recoil'
import { currentActionState, timerSettingState } from './atom'

export const durationState = selector<number>({
  key: 'durationState',
  get: ({ get }) => {
    const action = get(currentActionState)
    const timerSetting = get(timerSettingState)
    const min = timerSetting[action] || 25
    return min
  },
})
