import React, { useState, useCallback, useEffect } from 'react'
import type { Task } from '../types/Task'
import { TaskStorage } from '../services/taskStorage'
import TaskForm from '../components/tasks/TaskForm'
import TaskList from '../components/tasks/TaskList'
import './TasksPage.css'

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setTasks(TaskStorage.getTasks())
  }, [])

  const handleAdd = useCallback(() => {
    setEditingTask(undefined)
    setShowForm(true)
  }, [])

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }, [])

  const handleDelete = useCallback((id: string) => {
    TaskStorage.deleteTask(id)
    setTasks(TaskStorage.getTasks())
  }, [])

  const handleToggleStatus = useCallback((id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    const nextStatus =
      task.status === 'pending' ? 'in-progress'
      : task.status === 'in-progress' ? 'completed'
      : 'pending'
    TaskStorage.updateTask(id, { status: nextStatus })
    setTasks(TaskStorage.getTasks())
  }, [tasks])

  const handleFormSubmit = useCallback((task: Task) => {
    if (editingTask) {
      TaskStorage.updateTask(task.id, task)
    } else {
      TaskStorage.addTask(task)
    }
    setTasks(TaskStorage.getTasks())
    setShowForm(false)
  }, [editingTask])

  const handleFormCancel = useCallback(() => {
    setShowForm(false)
  }, [])

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex items-center min-h-full">
      <div className="content text-center">
        <div className="greeting">
          <h1 className="hello" style={{ fontSize: '2.5rem', color: '#5FF281', fontWeight: '700', marginBottom: '1rem' }}>
            Quản lý Task
          </h1>
          
          {/* Controls */}
          <div className="mb-4 flex gap-4 items-center justify-center">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" 
              onClick={handleAdd}
            >
              Thêm Task
            </button>
            
            <input
                type="text"
                placeholder="Tìm kiếm task..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="label input"
                style={{ alignSelf: 'flex-end' }}
                />
          </div>

          {showForm && (
            <div className="mb-6">
              <TaskForm
                task={editingTask}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </div>
          )}
          
          {/* Task Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Tiêu đề</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Mô tả</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Trạng thái</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                    <td className="px-6 py-4 text-gray-700">{task.description || '-'}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(task.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {task.status === 'pending' ? 'Chờ xử lý' :
                         task.status === 'in-progress' ? 'Đang thực hiện' :
                         'Hoàn thành'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-blue-600 hover:text-blue-800 mr-3 font-medium"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'Không tìm thấy task phù hợp' : 'Chưa có task nào'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TasksPage