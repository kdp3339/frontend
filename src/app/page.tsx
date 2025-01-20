import { TodoList } from "@/src/components/TodoList"
import { CreateTaskButton } from "@/src/components/CreateTaskButton"
import { TaskCounters } from "@/src/components/TaskCounters"

export default function Home() {
  return (
    <div className="space-y-6">
      <CreateTaskButton />
      <TaskCounters />
      <TodoList />
    </div>
  )
}

