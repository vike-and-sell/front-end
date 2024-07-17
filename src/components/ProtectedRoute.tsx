import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { user, checkUserStatus, isLoading } = useAuth();

  useEffect(() => {
    checkUserStatus();
  }, []);

  if (isLoading) {
    // You can return a loading spinner or some placeholder here
    return <div>Loading before rendering the new screen...</div>;
  }

  return user ? <Outlet></Outlet> : <Navigate to="/login" />;
  // return user ? <Navigate to={url.pathname} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
