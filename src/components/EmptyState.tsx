import { ClipboardList } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <ClipboardList className="w-12 h-12 text-gray-500" />
      </div>
      <p className="text-gray-500">You don't have any tasks registered yet.</p>
      <p className="text-gray-600">Create tasks and organize your to-do items</p>
    </div>
  )
}

