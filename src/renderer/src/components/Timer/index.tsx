import { Circle } from 'rc-progress'
import React, { memo, useRef } from 'react'
import useTimer from '../../hooks/useTimer'
import { Play, Pause, Reset, Next, Mute, Volume } from '../Icons'
import { Container, ProgressContent, Time, ActionContent, Content, Icon, Footer } from './style'

const Timer: React.FC = () => {
    const audioEl = useRef<HTMLAudioElement | null>(null)
    const { time, percent, action, paused, start, pause, reset } = useTimer(
      audioEl.current!
    )
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
            <ActionContent>{action}</ActionContent>
          </ProgressContent>
        </Container>
        <Content>
          <div>
            {paused ? (
              <Icon title="开始" onClick={() => start()}>
                {Play}
              </Icon>
            ) : (
              <Icon title="暂停" onClick={() => pause(true)}>
                {Pause}
              </Icon>
            )}
          </div>
          <Footer>
            <span>1/4</span>
            <Icon title="重置" onClick={() => reset()}>
              {Reset}
            </Icon>
            <Icon title="下一阶段">{Next}</Icon>
            <Icon title="静音">{Mute}</Icon>
            <Icon title="取消静音">{Volume}</Icon>
          </Footer>
        </Content>
        <audio ref={audioEl} />
      </>
    )
}

export default memo(Timer)
