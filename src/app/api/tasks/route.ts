import { NextResponse } from "next/server"
import { readTasks, writeTasks } from "@/src/utils/db"

export async function GET() {
  const tasks = await readTasks()
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  const tasks = await readTasks()
  const body = await request.json()
  const newTask = { id: tasks.length > 0 ? Math.max(...tasks.map((t:any) => t.id)) + 1 : 1, ...body, completed: false }
  tasks.push(newTask)
  await writeTasks(tasks)
  return NextResponse.json(newTask, { status: 201 })
}

