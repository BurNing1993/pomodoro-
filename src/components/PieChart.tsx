import React, { memo, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts/core'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

interface Props {
  option: ECOption
}

const Chart: React.FC<Props> = ({ option }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chart, setChart] = useState<echarts.ECharts | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      setChart(echarts.init(chartRef.current, 'dark'))
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      chart?.resize()
    }
    const throttledResize = echarts.throttle(onResize, 66)
    window.addEventListener('resize', throttledResize)
    return () => window.removeEventListener('resize', throttledResize)
  }, [chart])

  useEffect(() => {
    if (chart) {
      chart.setOption(option)
    }
  }, [chart, option])

  return <div ref={chartRef} className="h-full w-full"></div>
}

export default memo(Chart)
