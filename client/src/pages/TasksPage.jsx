import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";




function  TasksPage() {
const { getTasks, tasks, deleteTask} = useTasks();

useEffect(() => {
getTasks()
},[])
  
if (tasks.length === 0 ) return (<h1> nop task</h1>)

  return(
    <div className="grid grid-cols-3 gap-2">
      {tasks.map((task ) => (
        <div key={task._id}>

     
        <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md my-2">
        <header className=" flex justify-between ">
          <h1>{task.title}</h1>
          <div className=" flex gap-x-2 item-center">
            <button onClick={() =>{
           deleteTask(task._id)
            }}> Eliminar</button>
            
            <button> Actualizar</button>
          </div>
             </header>
          <p className=" text-slate-300">{task.description}</p>
          <p> { new Date(task.date).toLocaleDateString()}</p>
          </div>
          </div>

      ))}
      </div>
  );
}


export default TasksPage;