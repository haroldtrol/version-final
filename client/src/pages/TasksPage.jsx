import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";



function  TasksPage() {
const { getTasks, tasks } = useTasks();

useEffect(() => {
getTasks()
},[])
  
if (tasks.length === 0 ) return (<h1> nop task</h1>)

  return(
    <div>
      {tasks.map((task ) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TasksPage;