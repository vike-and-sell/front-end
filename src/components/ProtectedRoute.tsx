import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";


const ProtectedRoute = () => {
    const { user } = useAuth()
    return user? <Outlet/> : <Navigate to='/login'/>

}

export default ProtectedRoute