import type { Task } from '../types/Task.ts'  

const STORAGE_KEY = 'hackathon_tasks'

export class TaskStorage {
  // Lấy toàn bộ task
  static getTasks(): Task[] {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  }

  // Lưu toàn bộ task (overwrite)
  static saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }

  // Thêm task mới (tự sinh id)
  static addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const tasks = this.getTasks()
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description,
      assigneeIds: task.assigneeIds ?? [],
      attachments: task.attachments ?? [],
      deadline: task.deadline,
      reminder: task.reminder ?? undefined,
      status: task.status,
      priority: task.priority,
      type: task.type,
      place: task.place ?? '',
      progress: task.progress ?? 0,
      subtasks: task.subtasks ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    tasks.push(newTask)
    this.saveTasks(tasks)
    return newTask
  }

  // Cập nhật task
  static updateTask(id: string, updates: Partial<Task>): Task | null {
    const tasks = this.getTasks()
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) return null

    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date(),
    }
    this.saveTasks(tasks)
    return tasks[index]
  }

  // Xoá task
  static deleteTask(id: string): boolean {
    const tasks = this.getTasks()
    const newTasks = tasks.filter(t => t.id !== id)
    if (newTasks.length === tasks.length) return false
    this.saveTasks(newTasks)
    return true
  }
}
