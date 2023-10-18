import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TaskState {}

export const useTaskStore = create<TaskState>()((set) => ({}))

interface TaskListState {}

export const useTaskListStore = create<TaskListState>()(
  persist((set) => ({}), {
    name: 'tasks',
  })
)
