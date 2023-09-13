import { useState, createContext, useContext } from "react"

const authContext = createContext(null)

export const useAuth=()=>{
   const auth = useContext(authContext)
   return auth
}

export function AuthProvider({children}){
    const [authState, setAuth] = useState({})
    return(
        <authContext.Provider value={[authState, setAuth]}>{children}</authContext.Provider>
    )
}