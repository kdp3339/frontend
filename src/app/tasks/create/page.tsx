"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Check } from "lucide-react"
import Link from "next/link"

const colorOptions = [
  { id: 1, color: "bg-red-500" },
  { id: 2, color: "bg-orange-500" },
  { id: 3, color: "bg-yellow-500" },
  { id: 4, color: "bg-green-500" },
  { id: 5, color: "bg-blue-500" },
  { id: 6, color: "bg-indigo-500" },
  { id: 7, color: "bg-purple-500" },
  { id: 8, color: "bg-pink-500" },
  { id: 9, color: "bg-brown-500" },
]

export default function CreateTask() {
  const router = useRouter()
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].color)
  const [title, setTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, color: selectedColor }),
      })
      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => router.push("/"), 500)
      } else {
        throw new Error("Failed to create task")
      }
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to tasks
        </Link>
      </div>
      <h2 className="text-lg font-medium mb-6">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#2C2C2C] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task title"
            required
            disabled={isSubmitting || isSuccess}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Color</label>
          <div className="flex gap-2">
            {colorOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedColor(option.color)}
                disabled={isSubmitting || isSuccess}
                className={`w-8 h-8 rounded-full ${option.color} ${
                  selectedColor === option.color ? "ring-2 ring-offset-2 ring-offset-[#1C1C1C] ring-white" : ""
                } disabled:opacity-50`}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSuccess ? (
            <>
              Save
              <Check className="w-5 h-5" />
            </>
          ) : isSubmitting ? (
            "Saving..."
          ) : (
            <>
              Add Task
              <Plus className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}

