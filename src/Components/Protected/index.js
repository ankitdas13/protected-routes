import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../Context/Auth"

export default function Protected({auth, children}){
    const {pathname } =  useLocation()
    
    if(!auth.email && pathname ==='/dashboard' | pathname ==='/help'){
       return <Navigate to="/login"/>
    }

    if(auth.role ==='admin' | auth.role ==='user' && pathname ==='/login'){
        return <Navigate to="/"/>
    }

    if(auth.role !=='admin' && pathname==='/admin'){
        return <Navigate to="/login"/>
    }
    
    return children
}