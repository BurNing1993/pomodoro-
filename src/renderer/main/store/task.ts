import { create } from 'zustand'
import type { Task } from '../types'

interface TaskState {}

export const useTaskStore = create<TaskState>()((set) => ({}))

interface TaskListState {
  list: Task[]
  addTask: (t: Task) => void
}

export const useTaskListStore = create<TaskListState>()((set) => ({
  list: [],
  addTask: (t) =>
    set((state) => ({
      list: [t, ...state.list],
    })),
}))
