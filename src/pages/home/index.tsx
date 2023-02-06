import React, { memo, useCallback, useState } from 'react'
import { Button, Modal, Form, Input, Row, Col } from 'antd'
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTodoList } from '../../context/TodoListContext'
import type { Todo } from '../../context/TodoListContext'
import TodoCard from '../../components/TodoCard'

const { confirm } = Modal

type ActionType = 'add' | 'update'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { todoList, insertTodo, updateTodo, deleteTodo } = useTodoList()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<ActionType>('add')
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const [form] = Form.useForm()

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
        if (type === 'add') {
          const todo = { id: Date.now(), ...values }
          insertTodo(todo)
        } else if (type === 'update') {
          const todo = { ...currentTodo, ...values }
          updateTodo(todo)
        }
        setOpen(false)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  const onInsert = useCallback(() => {
    setType('add')
    setOpen(true)
  }, [])
  const onUpdate = useCallback(
    (todo: Todo) => {
      setType('update')
      setCurrentTodo(todo)
      form.setFieldsValue({ ...todo })
      setOpen(true)
    },
    [form]
  )
  const onDelete = useCallback(
    (todo: Todo) => {
      confirm({
        title: (
          <span>
            确认删除待办事项
            <span className="font-semibold text-blue-400">{todo.title}</span>?
          </span>
        ),
        icon: <ExclamationCircleFilled />,
        content: '删除后无法恢复!',
        okType: 'danger',
        onOk() {
          deleteTodo(todo)
        },
      })
    },
    [deleteTodo]
  )
  const onStart = () => {
    navigate('/timer')
  }

  return (
    <div>
      <div className="border bg-white border-solid border-slate-200 p-2 rounded-md flex items-center justify-between">
        <div className="font-semibold">待 办</div>
        <Button type="primary" icon={<PlusOutlined />} onClick={onInsert}>
          添加
        </Button>
      </div>
      <div className="py-4">
        <Row gutter={[10, 10]}>
          {todoList.map((todo) => (
            <Col key={todo.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <TodoCard
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onStart={onStart}
              />
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        open={open}
        title={`${type === 'add' ? '添加' : '编辑'}待办`}
        onCancel={() => setOpen(false)}
        onOk={onOk}
      >
        <Form form={form} name="todoForm">
          <Form.Item
            name="title"
            label="待办事项"
            rules={[
              {
                required: true,
                message: '请输入待办事项!',
              },
            ]}
          >
            <Input placeholder="待办事项" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default memo(Home)
