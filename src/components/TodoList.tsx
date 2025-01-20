"use client"

import { useState, useEffect } from "react"
import { TaskCard } from "@/src/components/TaskCard"
import { EmptyState } from "@/src/components/EmptyState"

interface Task {
  id: number
  title: string
  completed: boolean
  color: string
}

interface TodoListProps {
  onTasksChange: (tasks: Task[]) => void
}

export function TodoList({ onTasksChange }: TodoListProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/tasks")
      const data: Task[] = await response.json()
      setTasks(data)
      onTasksChange(data)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = async (id: number) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !tasks.find((t) => t.id === id)?.completed }),
    })
    if (response.ok) {
      const updatedTasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      setTasks(updatedTasks)
      onTasksChange(updatedTasks)
    }
  }

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" })
    if (response.ok) {
      const updatedTasks = tasks.filter((task) => task.id !== id)
      setTasks(updatedTasks)
      onTasksChange(updatedTasks)
    }
  }

  if (isLoading) {
    return <div>Loading tasks...</div>
  }

  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
      ))}
    </div>
  )
}

