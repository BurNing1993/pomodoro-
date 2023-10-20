import React, { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useTaskListStore } from '../../store/task'
import emitter from '../../utils/events'
import Modal from '../../components/Modal'
import TaskItem from '../../components/TaskItem'
import type { Task } from '../../types'

const Home: React.FC = () => {
  const taskList = useTaskListStore((state) => state.list)
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>()

  const onSubmit: SubmitHandler<Task> = (data) => console.log(data)

  useEffect(() => {
    const addTask = () => {
      reset()
      setOpen((o) => (o ? false : true))
    }
    emitter.on('addTask', addTask)
    return () => emitter.off('addTask', addTask)
  }, [reset])

  return (
    <div>
      <div>{open ? 'open' : 'close'}</div>
      <div className="divide-y grid gap-1 grid-cols-1">
        {taskList.map((t) => (
          <TaskItem key={t.id} task={t} />
        ))}
      </div>
      <Modal open={open} title="222" onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text">标题</span>
            </label>
            <input
              {...register('title', { required: '请输入标题' })}
              id="title"
              defaultValue=""
              type="text"
              placeholder="请输入标题"
              className="input input-bordered"
            />
            {errors.title?.message && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.title.message}
                </span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">类型</span>
            </label>

            <div className="flex items-center gap-6">
              <label
                htmlFor="tomato"
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  {...register('type')}
                  id="tomato"
                  type="radio"
                  name="type"
                  className="radio"
                  value="tomato"
                  checked
                />
                <span>番茄钟</span>
              </label>
              <label
                htmlFor="foucs"
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  {...register('type')}
                  id="foucs"
                  type="radio"
                  name="type"
                  className="radio"
                  value="foucs"
                />
                <span>专注</span>
              </label>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="foucs" className="label">
              <span className="label-text">专注时间</span>
            </label>
            <input
              defaultValue="25"
              {...register('foucs')}
              id="foucs"
              type="number"
              placeholder="请输入专注时间"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label htmlFor="rest" className="label">
              <span className="label-text">休息时间</span>
            </label>
            <input
              defaultValue="5"
              {...register('rest')}
              id="rest"
              type="number"
              placeholder="请输入休息时间"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <button className="btn" type="submit">
              submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Home
