import React from 'react'
import type { Task } from '../../types/Task'

export interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

const statusColor: Record<Task['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="flex items-center justify-between border rounded p-3 bg-white shadow">
      <div className="text-left">
        <div className="font-semibold">{task.title}</div>
        <div className="text-sm text-gray-500">{task.description || '-'}</div>
        <div className="text-sm text-gray-400">Địa điểm: {task.place || '-'}</div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor[task.status]}`}>{task.status}</span>
      </div>
      <div className="flex gap-2">
        <button className="px-2 py-1 bg-blue-100 rounded" onClick={() => onEdit(task)}>Sửa</button>
        <button className="px-2 py-1 bg-red-100 rounded" onClick={() => onDelete(task.id)}>Xoá</button>
        <button className="px-2 py-1 bg-gray-100 rounded" onClick={() => onToggleStatus(task.id)}>Chuyển trạng thái</button>
      </div>
    </div>
  )
}

export default React.memo(TaskItem)