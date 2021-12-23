import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

import { durationState } from './selector'
import { timerSettingState, currentActionState } from './atom'
import { useRecoilSnapshot, useRecoilState, useRecoilValue } from 'recoil'

export function useTimer(audioEl: HTMLAudioElement) {
    const duration = useRecoilValue(durationState)
    const [action, setAction] = useRecoilState(currentActionState)


    return {
        
    }
}
