import { NextResponse } from "next/server"
import { readTasks } from "@/src/utils/db"

export async function GET() {
  const tasks = await readTasks()
  const total = tasks.length
  const completed = tasks.filter((t:any) => t.completed).length
  return NextResponse.json({ total, completed })
}

