import { selector } from 'recoil'
import { settingState } from './atoms'

export const autoStartState = selector({
  key: 'autoStartState',
  get: ({ get }) => {
    const setting = get(settingState)
    return setting.autoStart
  },
})
