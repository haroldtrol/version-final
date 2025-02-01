import {createContext, useState, useContext, useEffect } from "react";  
import  {registerRequest, loginRequest, verityTokenRequest} from '../api/auth.js';
import Cookies from 'js-cookie';



const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }  
    return context;
}



export const AuthProvider = ({children}) => {  
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState( []);
    const [loading, setLoading] = useState (true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
    }
}
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
    }
}

useEffect(() => { 
    async function  checkLogin  () {

  const cookies = Cookies.get();

    if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        setUser(null)
        return

    }
    

        try {
            const res = await verityTokenRequest(cookies.token);
            console.log(res)
            if (!res.data) {
            setIsAuthenticated(false)
            setLoading(false)
            return ;
            }

            setIsAuthenticated(true)
            setUser(res.data)
            setLoading(false)
          
        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
            console.log(error)
            }
    

}
checkLogin();
}, []);

const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };



    return (
        <AuthContext.Provider value={{signup, loading, user, isAuthenticated, errors, signin, logout}}>    
            {children}
        </AuthContext.Provider>
    )
}

