import React, { memo } from 'react'
import { AboutContainer } from './style'
import { version } from '../../../../../package.json'
import ExternalLink from '../ExternalLink'

const year = new Date().getFullYear()
const appName = '番茄钟'
const author = 'Joey'

const About: React.FC = () => {
  return (
    <AboutContainer>
      <h2>{appName}</h2>
      <p>ICON</p>
      <p>
        <span className="label">版本</span>
        {version}
      </p>
      <p>
        <span className="label">主页</span>
        <ExternalLink
          href="https://github.com/BurNing1993/pomodoro"
          target="_blank"
          rel="noopener noreferrer"
        >
          pomodoro
        </ExternalLink>
      </p>
      <p>
        <span className="label">Bug反馈</span>
        <ExternalLink
          href="https://github.com/BurNing1993/pomodoro/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          pomodoro issues
        </ExternalLink>
      </p>
      <p>
        copyright: Copyright © {year} {author},
      </p>
    </AboutContainer>
  )
}

export default memo(About)
