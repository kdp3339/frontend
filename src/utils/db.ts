import fs from "fs/promises"
import path from "path"

const DB_PATH = path.join(process.cwd(), "src", "DB", "data.json")

export async function readTasks() {
  const data = await fs.readFile(DB_PATH, "utf8")
  return JSON.parse(data).tasks
}

export async function writeTasks(tasks: any[]) {
  await fs.writeFile(DB_PATH, JSON.stringify({ tasks }, null, 2))
}

