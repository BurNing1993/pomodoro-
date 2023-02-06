import React, { memo } from 'react'
import { Card, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import type { Todo } from '../context/TodoListContext'

const items: ItemType[] = [
  {
    key: 'update',
    label: '编辑',
  },
  {
    key: 'delete',
    label: '删除',
  },
]

interface Props {
  todo: Todo
  onUpdate: (todo: Todo) => void
  onDelete: (todo: Todo) => void
  onStart: (todo: Todo) => void
}

const TodoCard: React.FC<Props> = ({ todo, onUpdate, onDelete, onStart }) => {
  const onMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e.key)
    if (e.key === 'update') {
      onUpdate(todo)
    } else if (e.key === 'delete') {
      onDelete(todo)
    }
  }

  return (
    <Card hoverable>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{todo.title}</div>
        <div>
          <Dropdown.Button
            onClick={() => onStart(todo)}
            menu={{ items, onClick: onMenuClick }}
          >
            开始
          </Dropdown.Button>
        </div>
      </div>
    </Card>
  )
}

export default memo(TodoCard)
