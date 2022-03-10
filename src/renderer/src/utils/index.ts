import type { Round } from '../types'
import { ROUND_CONFIG } from './constants'

function setSizeTrayImage() {
  return process.platform === 'darwin' ? 19 : 32
}

export function createTrayImage(
  currentRound: Round,
  percent: number,
  paused: boolean
) {
  const bgColor = '#2F384B'
  const arcRadiusRatio = 0.55
  const arcLineWidthRatio = 0.3
  const remainingTime =1 -  percent / 100
  const fgColor = ROUND_CONFIG[currentRound].color
  const size = setSizeTrayImage()
  const outerRadius = size / 2
  const innerRadius = outerRadius * arcRadiusRatio
  const lineWidth = outerRadius * arcLineWidthRatio
  const fullCircle = 2 * Math.PI
  const startAngle = -Math.PI / 2
  const endAngle = remainingTime * fullCircle + startAngle
  const center = outerRadius
  const pauseStrokesHalfDistance = innerRadius / 1.7

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = bgColor
  ctx.strokeStyle = fgColor
  ctx.lineWidth = lineWidth

  ctx.beginPath()
  ctx.arc(center, center, outerRadius, 0, fullCircle, false)
  ctx.fill()

  if (paused) {
    ctx.beginPath()
    ctx.moveTo(center - pauseStrokesHalfDistance, center - innerRadius)
    ctx.lineTo(center - pauseStrokesHalfDistance, center + innerRadius)
    ctx.moveTo(center + pauseStrokesHalfDistance, center - innerRadius)
    ctx.lineTo(center + pauseStrokesHalfDistance, center + innerRadius)
    ctx.stroke()
  } else {
    ctx.beginPath()
    ctx.arc(center, center, innerRadius, startAngle, endAngle, false)
    ctx.stroke()
  }

  const dataUrl = canvas.toDataURL('image/png')
  return dataUrl
}
