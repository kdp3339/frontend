"use client"

import { useEffect, useState } from "react"
import axios from "axios";

type Counts = {
  total: number;
  completed: number;
};

export function TaskCounters() {
  const [counts, setCounts] = useState({ total: 0, completed: 0 })
  useEffect(() => {
    // Fetch initial counts
    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tasks/counts");
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching task counts:", error);
      }
    };

    fetchCounts();
    const intervalId = setInterval(fetchCounts, 2000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2">
        <span className="text-blue-400">Tasks</span>
        <span className="bg-[#333333] px-2 py-0.5 rounded-full">{counts.total}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-purple-400">Completed</span>
        <span className="bg-[#333333] px-2 py-0.5 rounded-full">{counts.completed}</span>
      </div>
    </div>
  )
}

