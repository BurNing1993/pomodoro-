import React, { memo } from 'react'
import { AboutTitle } from './style'

const About: React.FC = () => {
    return (
      <article>
        <AboutTitle>番茄钟</AboutTitle>
      </article>
    )
}

export default memo(About)
