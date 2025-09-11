import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TaskStorage } from '../src/services/taskStorage'
import { TaskStatus, TaskPriority, TaskType } from '../src/types/Task'

// Mock localStorage
beforeEach(() => {
  const store: Record<string, string> = {}
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { for (const key in store) delete store[key] },
  })
})

describe('TaskStorage', () => {
  it('should return empty array when no tasks saved', () => {
    const tasks = TaskStorage.getTasks()
    expect(tasks).toEqual([])
  })

  it('should add a new task', () => {
    const task = TaskStorage.addTask({
      title: 'Test Task',
      description: 'Some description',
      status: 'pending',
      priority: 'medium',
      type: 'Study',
      deadline: new Date(),
      place: '',
    })
    expect(task.id).toBeDefined()
    expect(task.createdAt).toBeInstanceOf(Date)
    expect(task.updatedAt).toBeInstanceOf(Date)

    const allTasks = TaskStorage.getTasks()
    expect(allTasks.length).toBe(1)
    expect(allTasks[0].title).toBe('Test Task')
  })

  it('should update a task', () => {
    const task = TaskStorage.addTask({
      title: 'Old title',
      description: 'desc',
      status: 'pending',
      priority: 'low',
      type: 'Study',
      deadline: new Date(),
      place: '',
    })

    const updated = TaskStorage.updateTask(task.id, { title: 'New title' })
    expect(updated).not.toBeNull()
    expect(updated?.title).toBe('New title')

    const allTasks = TaskStorage.getTasks()
    expect(allTasks[0].title).toBe('New title')
  })

  it('should delete a task', () => {
    const task = TaskStorage.addTask({
      title: 'Delete me',
      description: 'desc',
      status: 'pending',
      priority: 'high',
      type: 'Study',
      deadline: new Date(),
      place: '',
    })

    const deleted = TaskStorage.deleteTask(task.id)
    expect(deleted).toBe(true)

    const allTasks = TaskStorage.getTasks()
    expect(allTasks.length).toBe(0)
  })

  it('should return false when deleting non-existing task', () => {
    const result = TaskStorage.deleteTask('non-existing-id')
    expect(result).toBe(false)
  })
})
