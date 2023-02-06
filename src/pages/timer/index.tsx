import React, { memo, useEffect, useMemo, useState } from 'react'
import { Button, Progress, Space } from 'antd'
import { notify } from '../../utils'
import { PauseOutlined, StopOutlined } from '@ant-design/icons'

const WORK_SECONDS = 25 * 60
const REST_SECONDS = 5 * 60

let timer: number | undefined

function format(s: number) {
  let remain = s
  const m = Math.floor(remain / 60)
  const seconds = remain - m * 60
  return `${m.toString().padStart(2, '0')}︰${seconds
    .toString()
    .padStart(2, '0')}`
}

const Timer: React.FC = () => {
  const [total, setTotal] = useState(WORK_SECONDS)
  const [seconds, setSeconds] = useState(WORK_SECONDS)
  const [status, setStatus] = useState<'work' | 'rest'>('work')

  useEffect(() => {
    timer = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(timer)
        if (status === 'work') {
          setStatus('rest')
          setTotal(REST_SECONDS)
          setSeconds(REST_SECONDS)
        } else if (status === 'rest') {
          notify()
        }
        return
      }
      setSeconds((s) => s - 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [seconds, status])

  const percent = useMemo(() => {
    console.log(seconds / total, seconds, total)
    const p = Math.round((1 - seconds / total) * 100)
    if (p < 0) {
      return 0
    }
    return p
  }, [seconds, total])

  return (
    <div id="timer" className="text-center">
      <div className=" py-6 text-white">
        <span>你好</span>
      </div>
      <div>
        <Progress
          width={300}
          type="circle"
          trailColor="#fff"
          percent={percent}
          strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
          format={(percent) => format(seconds)}
        />
      </div>
      <div className="mt-10">
        <Space>
          <Button size="large" icon={<PauseOutlined />} shape="circle"></Button>
          <Button size="large" icon={<StopOutlined />} shape="circle"  onClick={notify}></Button>
        </Space>
      </div>
    </div>
  )
}

export default memo(Timer)
