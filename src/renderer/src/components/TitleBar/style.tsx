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
    background-color: ${(props) => (props.close ? '#cb2132' : '#333839')};
  }
`

export const Menu = styled.div`
  width:40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #333839;
  }
`

// export const Close2 = (
//   <svg viewBox="0 0 12.6 12.6" height="20px" className="icon">
//     <line
//       fill="none"
//       stroke="#F6F2EB"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeMiterlimit="10"
//       x1="1"
//       y1="1"
//       x2="11.6"
//       y2="11.6"
//     />
//     <line
//       fill="none"
//       stroke="#F6F2EB"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeMiterlimit="10"
//       x1="11.6"
//       y1="1"
//       x2="1"
//       y2="11.6"
//     />
//   </svg>
// )

export const Minimize = (
  <svg viewBox="0 0 14 2" width="20px" height="30px">
    <line
      fill="none"
      stroke="#F6F2EB"
      strokeWidth="1"
      strokeLinecap="round"
      strokeMiterlimit="10"
      x1="1"
      y1="1"
      x2="13"
      y2="1"
    />
  </svg>
)

export const MenuIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
    <path
      d="M7.94977 11.9498H39.9498"
      stroke="#F6F2EB"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.94977 23.9498H39.9498"
      stroke="#F6F2EB"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.94977 35.9498H39.9498"
      stroke="#F6F2EB"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Close = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
    <path
      d="M8 8L40 40"
      stroke="#F6F2EB"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 40L40 8"
      stroke="#F6F2EB"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
