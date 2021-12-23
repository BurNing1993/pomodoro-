import { RecoilRoot } from 'recoil'
import Timer from './components/Timer'
import TitleBar from './components/TitleBar'
import { Container, Main } from './style'

function App() {
  return (
    <RecoilRoot>
      <Container>
        <TitleBar />
        <Main>
          <Timer />
        </Main>
      </Container>
    </RecoilRoot>
  )
}

export default App
