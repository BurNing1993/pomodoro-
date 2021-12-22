import React, { memo } from 'react'
const { shell } = window.require('electron')

const ExternalLink: React.FC<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
> = ({ href, children }) => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    href && shell.openExternal(href)
  }
  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  )
}

export default memo(ExternalLink)
