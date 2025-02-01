function TaskCard( task ){
    return(
        <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md my-2">
          <h1>{task.title}</h1>
          <div>
            <button> eliminar</button>
            <button> actualizar</button>
          </div>
          <p className=" text-slate-300"> {task.description}</p>
        </div>
    )

}
export default TaskCard;