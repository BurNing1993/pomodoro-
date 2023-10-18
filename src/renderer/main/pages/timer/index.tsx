import React from 'react'

const Timer: React.FC = () => {
  return (
    <div>
      {' '}
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ '--value': 24 }}></span>
          </span>
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ '--value': 41 }}></span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Timer
