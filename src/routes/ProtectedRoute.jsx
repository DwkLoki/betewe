import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        const currentPath = location.pathname;

        // Jika sudah login, cegah akses ke /login dan /register
        if (token && (currentPath === "/login" || currentPath === "/register")) {
            navigate("/dashboard");
        }

        // Jika belum login dan mencoba mengakses route selain /login dan /register
        if (!token && currentPath !== "/login" && currentPath !== "/register") {
            navigate("/login");
        }
    }, [location.pathname, navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;