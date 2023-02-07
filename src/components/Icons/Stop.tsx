import React, { memo } from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const StopSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M256 256h512v512H256z"></path>
  </svg>
)

const Stop: React.FC<Partial<CustomIconComponentProps>> = (props) => {
  return <Icon component={StopSvg} {...props} />
}

export default memo(Stop)
