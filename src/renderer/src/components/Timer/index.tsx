import React, { memo, useState } from 'react'
import { Progress } from 'antd'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)
let timer;

const Timer: React.FC = () => {
  const [roundDuration, setRoundDuration] = useState<duration.Duration>(
    dayjs.duration(25, 'minute')
  )

  const tick = () => {}


  return (
    <div>
      <Progress
        className="mx-auto"
        type="circle"
        width={200}
        percent={40}
        showInfo={false}
      />
      <div>start/pause</div>
      <div>skip/reset</div>
    </div>
  )
}

export default memo(Timer)
