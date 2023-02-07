import React, { memo, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'

interface Props {
  option: EChartsOption
}

const Chart: React.FC<Props> = ({ option }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chart, setChart] = useState<ECharts | null>(null)

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
