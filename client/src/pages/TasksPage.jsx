import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";



function  TasksPage() {
const { getTasks } = useTasks();

useEffect(() => {
getTasks()
},[])
  
  return <div>taskSchema</div>
}

export default TasksPage;