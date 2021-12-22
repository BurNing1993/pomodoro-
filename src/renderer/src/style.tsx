import styled from 'styled-components'

export const Main = styled.main`
  position: relative;
  padding: 30px 20px;
`

export const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
`

export const Timer = styled.div`
  position: relative;
`

export const ProgressContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  margin: 0;
  padding: 0;
  color: var(--text-color);
  font-size: 1em;
  line-height: 1;
  white-space: normal;
  text-align: center;
  transform: translate(-50%, -50%);
`

export const Time = styled.div`
  font-size: 60px;
  font-weight: bold;
  letter-spacing: 3px;
  padding-bottom: 50px;
`

export const ActionContent = styled.div`
  font-size: 30px;
`

export const Content = styled.div`
  text-align: center;
`

export const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const Icon = styled.span`
  cursor: pointer;
`