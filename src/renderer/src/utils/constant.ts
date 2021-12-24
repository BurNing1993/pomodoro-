import { RoundConfig } from '../types'
import focus from '../assets/audio/alert-work.mp3'
import shortBreak from '../assets/audio/alert-short-break.mp3'
import longBreak from '../assets/audio/alert-long-break.mp3'

export const ROUND_CONFIG: RoundConfig = {
  SHORT_BREAK: {
    audio: shortBreak,
    text: 'SHORT_BREAK',
    title: 'SHORT_BREAK',
    body: 'SHORT_BREAK',
    color: 'SHORT_BREAK',
  },
  LONG_BREAK: {
    audio: longBreak,
    text: 'LONG_BREAK',
    title: 'LONG_BREAK',
    body: 'LONG_BREAK',
    color: 'LONG_BREAK',
  },
  FOCUS: {
    audio: focus,
    text: 'FOCUS',
    title: 'FOCUS',
    body: 'FOCUS',
    color: 'FOCUS',
  },
}
