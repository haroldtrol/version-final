import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar(){
const {isAuthenticated} = useAuth()

    return(
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-white text-xl font-bold">Mi Empresa</a>
          <div className="space-x-4">
          {isAuthenticated ?  (
            <>
          <Link to = "/add-task" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">agregar tareas</Link>
          <Link to = "/add-task" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">cerrar sesion</Link>
           </>
          ) : (



            <>
            <Link  to = "/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Login</Link>

          <Link  to = "/register" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Register</Link>
            </>




          )}
          
          </div>
        </div>
      </nav>
    )
}

export default Navbar