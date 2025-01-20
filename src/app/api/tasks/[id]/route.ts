import { NextResponse } from "next/server"
import { readTasks, writeTasks } from "@/src/utils/db"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const tasks = await readTasks()
  const taskIndex = tasks.findIndex((t:any) => t.id === id)
  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }
  const body = await request.json()
  tasks[taskIndex] = { ...tasks[taskIndex], ...body }
  await writeTasks(tasks)
  return NextResponse.json(tasks[taskIndex])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const tasks = await readTasks()
  const updatedTasks = tasks.filter((t:any) => t.id !== id)
  if (updatedTasks.length === tasks.length) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }
  await writeTasks(updatedTasks)
  return NextResponse.json({ message: "Task deleted" })
}

