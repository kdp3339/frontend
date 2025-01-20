interface TaskCountersProps {
  total: number
  completed: number
}

export function TaskCounters({ total, completed }: TaskCountersProps) {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2">
        <span className="text-blue-400">Tasks</span>
        <span className="bg-[#333333] px-2 py-0.5 rounded-full">{total}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-purple-400">Completed</span>
        <span className="bg-[#333333] px-2 py-0.5 rounded-full">{completed}</span>
      </div>
    </div>
  )
}

