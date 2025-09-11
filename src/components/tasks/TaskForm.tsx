import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Task, TaskStatus, TaskPriority, TaskType } from '../../types/Task'

const taskSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  description: z.string().optional(),
  deadline: z.string().min(1, 'Deadline không được để trống'),
  reminder: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed', 'failed']),
  priority: z.enum(['low', 'medium', 'high']),
  type: z.enum(['Study', 'Work', 'Personal', 'Other', 'Club', 'Daily']),
  place: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
  attachments: z.string().optional(),
})

type TaskFormData = z.infer<typeof taskSchema>

interface TaskFormProps {
  task?: Task
  onSubmit: (task: Task) => void
  onCancel: () => void
}

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
      deadline: task?.deadline
        ? new Date(task.deadline).toISOString().slice(0, 16)
        : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      reminder: task?.reminder
        ? new Date(task.reminder).toISOString().slice(0, 16)
        : '',
      status: task?.status ?? 'pending',
      priority: task?.priority ?? 'medium',
      type: task?.type ?? 'Personal',
      place: task?.place ?? '',
      progress: task?.progress ?? 0,
      attachments: task?.attachments?.join(', ') ?? '',
    },
  })

  const submitHandler = (data: TaskFormData) => {
    const now = new Date()
    
    onSubmit({
      id: task?.id ?? crypto.randomUUID(),
      ...data,
      deadline: new Date(data.deadline),
      reminder: data.reminder ? new Date(data.reminder) : undefined,
      attachments: data.attachments ? data.attachments.split(',').map(s => s.trim()).filter(s => s) : [],
      createdAt: task?.createdAt ?? now,
      updatedAt: now,
    } as Task)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-3 p-4">
      <div>
        <label className="block font-medium">Tiêu đề</label>
        <input
          {...register('title')}
          placeholder="Tiêu đề"
          className="w-full border rounded p-2"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Mô tả</label>
        <textarea
          {...register('description')}
          placeholder="Mô tả"
          className="w-full border rounded p-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Loại task</label>
          <select {...register('type')} className="w-full border rounded p-2">
            <option value="Study">Học tập</option>
            <option value="Work">Công việc</option>
            <option value="Personal">Cá nhân</option>
            <option value="Club">Câu lạc bộ</option>
            <option value="Daily">Hàng ngày</option>
            <option value="Other">Khác</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Mức độ ưu tiên</label>
          <select {...register('priority')} className="w-full border rounded p-2">
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium">Địa điểm</label>
        <input
          {...register('place')}
          placeholder="Địa điểm"
          className="w-full border rounded p-2"
        />
        {errors.place && <p className="text-red-500 text-sm">{errors.place.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Deadline</label>
          <input
            type="datetime-local"
            {...register('deadline')}
            className="w-full border rounded p-2"
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm">{errors.deadline.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Nhắc nhở (tùy chọn)</label>
          <input
            type="datetime-local"
            {...register('reminder')}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Trạng thái</label>
          <select {...register('status')} className="w-full border rounded p-2">
            <option value="pending">Chờ xử lý</option>
            <option value="in-progress">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
            <option value="failed">Thất bại</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Tiến độ (%)</label>
          <input
            type="number"
            min="0"
            placeholder='0'
            max="100"
            {...register('progress', { valueAsNumber: true })}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">File đính kèm (tùy chọn)</label>
        <input
          {...register('attachments')}
          placeholder="Nhập các link/file, cách nhau bằng dấu phẩy"
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Lưu
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Huỷ
        </button>
      </div>
    </form>
  )
}