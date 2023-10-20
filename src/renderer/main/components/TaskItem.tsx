import React from 'react'
import type { Task } from '../types'

interface Props {
  task: Task
}

const TaskItem: React.FC<Props> = ({ task }) => {
  return <div>{task.title}</div>
}

export default TaskItem
