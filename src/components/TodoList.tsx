"use client"

import { useState, useEffect } from "react"
import { TaskCard } from "@/src/components/TaskCard"
import { EmptyState } from "@/src/components/EmptyState"
import axios from "axios";


export function TodoList() {
  
  type Task = {
    id: number;
    title: string;
    completed: boolean;
    color: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
// Fetch tasks from API on component mount
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      //setIsLoading(false);
    }
  };

  fetchTasks();
}, [tasks]);

//
const handleToggle = async (id: number) => {
  const taskToToggle = tasks.find((task) => task.id === id);
  if (!taskToToggle) return;

  try {
    const response = await axios.put(`http://localhost:3001/tasks/${id}`, {
      ...taskToToggle,
      completed: !taskToToggle.completed,
    });
    if (response.status === 200) {
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    }
  } catch (error) {
    console.error("Error toggling task:", error);
  }
};

  const handleDelete = async (id: number) => {
    ////setTasks(tasks.filter((task) => task.id !== id))
    try {
      const response = await axios.delete(`http://localhost:3001/tasks/${id}`);
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={handleToggle}
          // onToggle={(id) => {
          //   setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
          // }}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

