import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import {useNavigate} from "react-router-dom"
function ProtectedRoute(Props) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(function () {
        if (!isAuthenticated) navigate("/");
        
    },[isAuthenticated,navigate])
    return Props.children;
}

export default ProtectedRoute;