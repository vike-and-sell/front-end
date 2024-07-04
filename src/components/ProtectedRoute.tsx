import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const { user, checkUserStatus} = useAuth()
    
    useEffect(() => {
        checkUserStatus();
    }, []);

    return user? <Outlet/> : <Navigate to='/login'/>

}

export default ProtectedRoute