export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'failed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskType = 'Study' | 'Work' | 'Personal' | 'Other' | 'Club' | 'Daily';

export interface Task {
  id: string
  title: string
  description: string
  assigneeIds?: string[]           // làm việc nhóm
  attachments?: string[]           // link/file
  deadline: Date
  reminder?: Date                  // thời gian nhắc nhở
  status: TaskStatus
  priority: TaskPriority
  type: TaskType
  place: string
  progress?: number                // % hoàn thành
  subtasks?: Task[]                // task con
  createdAt: Date
  updatedAt: Date
}