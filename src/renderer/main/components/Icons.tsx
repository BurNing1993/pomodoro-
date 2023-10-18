import { type SVGProps } from 'react'

export function FluentAdd(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="currentColor"
        d="M23.75 5.5c.69 0 1.25.56 1.25 1.25V22.5h15.75a1.25 1.25 0 1 1 0 2.5H25v15.75a1.25 1.25 0 1 1-2.5 0V25H6.75a1.25 1.25 0 1 1 0-2.5H22.5V6.75c0-.69.56-1.25 1.25-1.25Z"
      ></path>
    </svg>
  )
}
