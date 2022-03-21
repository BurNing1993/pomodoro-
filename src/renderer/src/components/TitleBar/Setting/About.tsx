import React, { memo } from 'react'

const year = new Date().getFullYear()
const appName = '番茄钟'
const author = 'Joey'
const version = '0.3.1'

const About: React.FC = () => {
  return (
    <div className="px-2 text-center about">
      <h2 className="text-2xl mb-3">{appName}</h2>
      {/* <p>ICON</p> */}
      <p>
        <span className="label">版本</span>
        {version}
      </p>
      <p>
        <span className="label">主页</span>
        <a
          className="text-blue-500 hover:underline"
          href="https://github.com/joey2217/pomodoro"
          target="_blank"
          rel="noopener noreferrer"
        >
          pomodoro
        </a>
      </p>
      <p>
        <span className="label">Bug反馈</span>
        <a
          className="text-blue-500 hover:underline"
          href="https://github.com/joey2217/pomodoro/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          pomodoro issues
        </a>
      </p>
      <p>
        <span className="label">copyright</span>Copyright © {year} {author}
      </p>
    </div>
  )
}

export default memo(About)
