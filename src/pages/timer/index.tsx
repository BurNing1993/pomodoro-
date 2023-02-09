import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Progress, Space, Modal } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  CaretRightOutlined,
  ExclamationCircleFilled,
  PauseOutlined,
} from '@ant-design/icons'
import { notify } from '../../utils'
import Stop from '../../components/Icons/Stop'
import { useTodoList } from '../../context/TodoListContext'

const WORK_SECONDS = 25 * 60
const REST_SECONDS = 5 * 60

let timer: string | number | NodeJS.Timeout | undefined

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
  const navigate = useNavigate()
  const [param] = useSearchParams()
  const { updateTodo, todoList } = useTodoList()

  const [total, setTotal] = useState(WORK_SECONDS)
  const [seconds, setSeconds] = useState(WORK_SECONDS)
  const [status, setStatus] = useState<'work' | 'rest'>('work')
  const [pause, setPause] = useState(false)

  const start = useCallback(() => {
    clearInterval(timer)
    timer = setInterval(() => {
      setSeconds((s) => s - 1)
    }, 1000)
  }, [])

  const currentTodo = useMemo(() => {
    const id = Number(param.get('id'))
    return todoList.find((t) => t.id === id)
  }, [param, todoList])

  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(timer)
      if (status === 'work') {
        setStatus('rest')
        setTotal(REST_SECONDS)
        setSeconds(REST_SECONDS)
        start()
      } else if (status === 'rest') {
        notify('休息一下!')
        if (currentTodo) {
          let done = currentTodo.done || 0
          done += 1
          updateTodo({ ...currentTodo, done })
          navigate('/', { replace: true })
        }
      }
    }
  }, [currentTodo, navigate, seconds, start, status, updateTodo])

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

  const onStop = useCallback(() => {
    Modal.confirm({
      title: '确认停止该待办事项?',
      icon: <ExclamationCircleFilled />,
      content: '坚持就是胜利!',
      okType: 'danger',
      onOk() {
        navigate('/', { replace: true })
      },
    })
  }, [navigate])

  return (
    <div id="timer" className="text-center h-full flex flex-col justify-around">
      <div className="text-white py-20">
        <h3 className="font-semibold tracking-widest">{currentTodo?.title}</h3>
        <h4 className="font-semibold tracking-widest">
          {status === 'work' ? '专注中' : '休息一下'}
        </h4>
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
      <div className="pt-10">
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
            onClick={onStop}
          ></Button>
        </Space>
      </div>
    </div>
  )
}

export default memo(Timer)
