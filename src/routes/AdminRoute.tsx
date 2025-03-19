import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

export default function AdminRoute() {
    const {isAuthenticated, isAdmin, isLoading} = useAuth()
    if(isLoading) return <div>Loading...</div>
    return isAuthenticated && isAdmin  ? <Outlet /> : <Navigate to="/" />;
}