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
    const cookies = Cookies.get();

    if (cookies.token) {
        try {
            const res = verityTokenRequest();
          
        } catch (error) {

            }
    }

  }, []);




    return (
        <AuthContext.Provider value={{signup, user, isAuthenticated, errors, signin}}>    
            {children}
        </AuthContext.Provider>
    )
}