import React, { memo } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const PlaySvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path
      d="M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z"
      stroke="#000"
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>
)

const PlayIcon: React.FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={PlaySvg} {...props} />
}

export default memo(PlayIcon)
