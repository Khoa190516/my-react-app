import { createContext, useState } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = () => {
        setIsLoggedIn(true)
        console.log("login: " + isLoggedIn)
    }

    const logout = () => {
        setIsLoggedIn(false)
        console.log("logout: " + isLoggedIn)
    }

    const value = {
        isLoggedIn,
        login,
        logout
    }

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}