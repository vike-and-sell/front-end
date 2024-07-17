import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const auth = useAuth();

  useEffect(() => {
    if (auth){
      auth.checkUserStatus();
    }
    
  }, []);

  if (!auth || auth.isLoading) {
    // You can return a loading spinner or some placeholder here
    return <div>Loading before rendering the new screen...</div>;
  }

  return auth.user ? <Outlet></Outlet> : <Navigate to="/login" />;
  // return user ? <Navigate to={url.pathname} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
