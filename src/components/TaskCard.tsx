import { Trash2 } from "lucide-react"

interface Task {
  id: number
  title: string
  completed: boolean
  color: string
}

interface TaskCardProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className="bg-[#2C2C2C] rounded-lg p-4 flex items-center gap-4">
      <div className={`w-4 h-4 rounded-full ${task.color}`} />
      <label className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 rounded-md border-gray-600 bg-transparent"
        />
        <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
      </label>
      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-red-400 transition-colors"
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}

