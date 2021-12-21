import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 40px;
`

export const Control = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const Title = styled.div`
  flex: 1;
  text-align: center;
  -webkit-app-region: drag;
`

export const Icon = styled.div<{ close?: boolean }>`
  width: 38px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${(props) =>
      props.close ? '#cb2132' : 'var(--hover-background)'};
  }
`

export const Menu = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  &:hover {
    background-color: var(--hover-background);
  }
`

export const RadioContainer = styled.div`
  & > div {
    margin-bottom: 10px;
  }
  & input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    border-radius: 50%;
    width: 16px;
    height: 16px;

    border: 2px solid #999;
    transition: 0.2s all linear;
    outline: none;
    margin-right: 5px;

    position: relative;
    top: 3px;
  }
  & input:checked {
    border: 6px solid #fff;
  }
`
export const Remember = styled.div`
  padding-top: 10px;
  & input {
    width: 16px;
    height: 16px;
    border: 2px solid #999;
    transition: 0.2s all linear;
    margin-right: 5px;
    position: relative;
    top: 3px;
  }
`

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
`

export const Button = styled.button<{ primary?: boolean }>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? '#fff' : '#181a1b')};
  color: ${(props) => (props.primary ? '#181a1b' : '#fff')};
  font-size: 1rem;
  margin: 0.5rem;
  padding: 0.25rem 1rem;
  border: ${(props) =>
    props.primary ? '2px solid  #fff' : '2px solid #181a1b'};
  border-radius: 3px;
  cursor: pointer;
`

export const Drawer = styled.div`
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  height: calc(100vh - 40px);
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: var(--background-color);
  color: var(--text-color);
`

export const SettingItem = styled.div`
  font-size: 16px;
  line-height: 16px;
  padding:10px 0;
  display:flex;
  & > label {
    margin-right: 6px;
    &::after {
      content: ' : ';
    }
  }
`

export const AboutTitle = styled.h3`
  text-align:center;
`