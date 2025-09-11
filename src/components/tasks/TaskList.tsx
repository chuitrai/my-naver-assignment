import React from 'react'
import type { Task } from '../../types/Task'
import TaskItem from './TaskItem.tsx'

export interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  if (tasks.length === 0) return <div className="text-gray-500 ">Không có công việc nào.</div>
  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        </li>
      ))}
    </ul>
  )
}

export default React.memo(TaskList)