import { Circle } from 'rc-progress'
import React, { memo, useRef } from 'react'
import { useTimer } from '../../store/hooks'
import { Play, Pause, Reset, Next, Mute, Volume } from '../Icons'
import {
  Container,
  ProgressContent,
  Time,
  ActionContent,
  Content,
  Icon,
  Footer,
} from './style'

const Timer: React.FC = () => {
  const audioEl = useRef<HTMLAudioElement | null>(null)
  const {
    time,
    percent,
    paused,
    currentRoundConfig,
    roundNumber,
    totalRounds,
    reset,
    end,
    setPaused,
    setMute,
  } = useTimer(audioEl.current!)
  return (
    <>
      <Container>
        <Circle
          percent={percent}
          strokeWidth={4}
          trailWidth={2}
          strokeColor="#108ee9"
          trailColor="#87d068"
        />
        <ProgressContent>
          <Time>{time}</Time>
          <ActionContent>{currentRoundConfig.text}</ActionContent>
        </ProgressContent>
      </Container>
      <Content>
        <div>
          {paused ? (
            <Icon title="开始" onClick={() => setPaused(false)}>
              {Play}
            </Icon>
          ) : (
            <Icon title="暂停" onClick={() => setPaused(true)}>
              {Pause}
            </Icon>
          )}
        </div>
        <Footer>
          <span>
            {roundNumber}/{totalRounds}
          </span>
          <Icon title="重置" onClick={() => reset()}>
            {Reset}
          </Icon>
          <Icon title="下一阶段" onClick={() => end(true)}>
            {Next}
          </Icon>
          <Icon title="静音" onClick={() => setMute(true)}>
            {Mute}
          </Icon>
          <Icon title="取消静音" onClick={() => setMute(false)}>
            {Volume}
          </Icon>
        </Footer>
      </Content>
      <audio ref={audioEl} />
    </>
  )
}

export default memo(Timer)
