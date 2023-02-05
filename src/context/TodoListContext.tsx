import React, { useCallback, useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'

export interface Todo {
  id: number
  title: string
}

interface TodoProps {
  todoList: Todo[]
  insertTodo: (todo: Todo) => void
  updateTodo: (todo: Todo) => void
  deleteTodo: (todo: Todo) => void
}

const TodoContext = React.createContext<TodoProps>({
  todoList: [],
  insertTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
})

export function useTodoList() {
  return React.useContext(TodoContext)
}

export const TodoListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todoList, setTodoList] = useState<Todo[]>(getTodos())

  const insertTodo = useCallback((todo: Todo) => {
    setTodoList((list) => [todo, ...list])
  }, [])
  const updateTodo = useCallback(
    (todo: Todo) => {
      const index = todoList.findIndex((item) => item.id === todo.id)
      if (index !== -1) {
        setTodoList((list) => [
          ...list.slice(0, index),
          todo,
          ...list.slice(index + 1),
        ])
      }
    },
    [todoList]
  )
  const deleteTodo = useCallback((todo: Todo) => {
    setTodoList((list) => list.filter((item) => item.id !== todo.id))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_TODOS, JSON.stringify(todoList))
  }, [todoList])

  return (
    <TodoContext.Provider
      value={{
        todoList,
        insertTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

const LOCAL_TODOS = 'local_todos'

function getTodos(): Todo[] {
  const localData = localStorage.getItem(LOCAL_TODOS)
  if (localData) {
    try {
      return JSON.parse(localData)
    } catch (error) {
      console.error(error)
      return []
    }
  }
  return []
}
