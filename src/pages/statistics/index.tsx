import React, { memo, useMemo } from 'react'
import PieChart, { ECOption } from '../../components/PieChart'
import { useTodoList } from '../../context/TodoListContext'

function getOption(data: any): ECOption {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: '专注统计',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        tooltip: {
          valueFormatter: (value) => value + '分钟',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data,
      },
    ],
  }
}

const Statistics: React.FC = () => {
  const { todoList } = useTodoList()
  const option = useMemo(() => {
    const data = todoList.map((todo) => ({
      value: todo.done * 25,
      name: todo.title,
    }))
    return getOption(data)
  }, [todoList])
  return (
    <div style={{ height: 'calc(100vh - 80px)' }}>
      <PieChart option={option} />
    </div>
  )
}

export default memo(Statistics)
