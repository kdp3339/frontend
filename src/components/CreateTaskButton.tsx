import Link from "next/link"
import { Plus } from "lucide-react"

export function CreateTaskButton() {
  return (
    <Link
      href="/tasks/create"
      className="block w-full bg-[#1E6F9F] hover:bg-[#1E6F9F]/90 text-white px-4 py-4 rounded-lg transition-colors text-center"
    >
      Create Task
      <Plus className="w-4 h-4 inline-block ml-2" />
    </Link>
  )
}

