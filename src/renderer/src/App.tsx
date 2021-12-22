import { Circle } from 'rc-progress'
import { useEffect, useState } from 'react'
import { Mute, Next, Pause, Play, Reset, Volume } from './components/Icons'
import TitleBar from './components/TitleBar'
import useTimer from './hooks/useTimer'
import {
  ActionContent,
  Container,
  Content,
  Footer,
  Icon,
  Main,
  ProgressContent,
  Time,
  Timer,
} from './style'

export type Action = 'rest' | 'focus'

function App() {
  const [action, setAction] = useState<Action>('focus')
  const { time, percent, paused, start, pause, reset } = useTimer(() => {
    console.log('END')
  })

  useEffect(() => {
    if (action === 'focus') {
      reset(25)
    } else {
      reset(5)
    }
  }, [action])

  return (
    <Container>
      <TitleBar />
      <Main>
        <Timer>
          <Circle
            percent={percent}
            strokeWidth={4}
            strokeColor="#108ee9"
            trailColor="#87d068"
          />
          <ProgressContent>
            <Time>{time}</Time>
            <ActionContent>{action}</ActionContent>
          </ProgressContent>
        </Timer>
        <Content>
          <div>
            {paused ? (
              <Icon title="开始">{Play}</Icon>
            ) : (
              <Icon title="暂停">{Pause}</Icon>
            )}
          </div>
          <Footer>
            <Icon>{Reset}</Icon>
            <Icon>{Next}</Icon>
            <Icon>{Mute}</Icon>
            <Icon>{Volume}</Icon>
          </Footer>
        </Content>
      </Main>
    </Container>
  )
}

export default App
