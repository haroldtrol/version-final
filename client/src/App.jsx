import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from "./pages/RegisterPage.jsx"
import TaskFormPage from "./pages/TaskFormPage.jsx"
import TasksPage from "./pages/TasksPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>} />

        <Route element={<ProtectedRoute/>}> 
        <Route path="/task" element={<TasksPage/>} />
        <Route path="/add-task" element={<TaskFormPage/>} />
        <Route path="/task/:id" element={<TaskFormPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        </Route>


      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App