import React, { memo } from 'react'
import { Slider } from 'antd'
import { useRecoilState } from 'recoil'
import { ROUND_CONFIG } from '../../../utils/constants'
import { focusTimeState, breakTimeState } from '../../../store/atoms'

const Timer: React.FC = () => {
  const [focusTime, setFocusTime] = useRecoilState(focusTimeState)
  const [breakTime, setBreakTime] = useRecoilState(breakTimeState)
  return (
    <div className="text-center p-2">
      <div>
        <div className="py-2">{ROUND_CONFIG.FOCUS.title}</div>
        <div>
          <span className="bg-gray-400 p-1">{focusTime}:00</span>
        </div>
        <Slider
          handleStyle={{
            borderColor: ROUND_CONFIG.FOCUS.color,
            backgroundColor: ROUND_CONFIG.FOCUS.color,
          }}
          trackStyle={{
            backgroundColor: ROUND_CONFIG.FOCUS.color,
          }}
          defaultValue={focusTime}
          min={1}
          max={90}
          onChange={(val) => setFocusTime(val)}
        />
      </div>
      <div>
        <div className="py-2">{ROUND_CONFIG.BREAK.title}</div>
        <div>
          <span className="bg-gray-400 py-1">{breakTime}:00</span>
        </div>
        <Slider
          handleStyle={{
            borderColor: ROUND_CONFIG.BREAK.color,
            backgroundColor: ROUND_CONFIG.BREAK.color,
          }}
          trackStyle={{
            backgroundColor: ROUND_CONFIG.BREAK.color,
          }}
          defaultValue={breakTime}
          min={1}
          max={90}
          onChange={(val) => setBreakTime(val)}
        />
      </div>
    </div>
  )
}

export default memo(Timer)
