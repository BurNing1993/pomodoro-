import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Progress, Space } from 'antd'
import { notify } from '../../utils'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import Stop from '../../components/Icons/Stop'

const WORK_SECONDS = 25 * 60
const REST_SECONDS = 5 * 60

let timer: number | undefined

function format(s: number) {
  let remain = s
  if (remain < 0) {
    remain = 0
  }
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
  const [pause, setPause] = useState(false)

  const start = useCallback(() => {
    console.log('start')
    clearInterval(timer)
    timer = setInterval(() => {
      setSeconds((s) => s - 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(timer)
      if (status === 'work') {
        setStatus('rest')
        setTotal(REST_SECONDS)
        setSeconds(REST_SECONDS)
      } else if (status === 'rest') {
        notify('休息一下!')
      }
      return
    }
  }, [seconds, status])

  const percent = useMemo(() => {
    const p = Math.round((1 - seconds / total) * 100)
    if (p < 0) {
      return 0
    }
    return p
  }, [seconds, total])

  useEffect(() => {
    if (pause) {
      clearInterval(timer)
    } else {
      start()
    }
    return () => {
      clearInterval(timer)
    }
  }, [pause, start])

  return (
    <div id="timer" className="text-center h-full flex flex-col justify-around">
      <div className="py-6 text-white">
        <span>你好</span>
      </div>
      <div>
        <Progress
          width={300}
          type="circle"
          trailColor="#fff"
          percent={percent}
          strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
          format={() => format(seconds)}
        />
      </div>
      <div className="mt-10">
        <Space>
          {pause ? (
            <Button
              title="开始"
              size="large"
              icon={<CaretRightOutlined />}
              shape="circle"
              onClick={() => setPause(false)}
            ></Button>
          ) : (
            <Button
              title="暂停"
              size="large"
              icon={<PauseOutlined />}
              shape="circle"
              onClick={() => setPause(true)}
            ></Button>
          )}

          <Button
            title="停止"
            size="large"
            icon={<Stop />}
            shape="circle"
            onClick={() => notify('hi')}
          ></Button>
        </Space>
      </div>
    </div>
  )
}

export default memo(Timer)
