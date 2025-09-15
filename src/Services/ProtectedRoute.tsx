import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { jwtDecode } from "jwt-decode";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const token = useSelector((state: any) => state.jwt);
    const user = useSelector((state: any) => state.user);
    const notified = useRef(false);
    if (!user) {
        if (!notified.current) {
            notifications.show({
                position: 'top-center',
                withCloseButton: true,
                autoClose: 5000,
                title: "Need to Login",
                message: 'Please log in to access this feature.',
                color: 'blue',
                icon: <IconX />,
                className: 'my-notification-class',
                loading: false,
            });
            notified.current = true;
        }
        return <Navigate to="/login" />;
    }
    if (!token) {
        return <Navigate to="/login" />
    }
    const decoded: any = jwtDecode(token);
    if (allowedRoles && !allowedRoles.includes(decoded.userRole)) {
        if (!notified.current) {
            notifications.show({
                title: "Access Denied",
                message: "You are not allowed to access this page.",
                color: "red",
                icon: <IconX />,
                withCloseButton: true,
                autoClose: 4000,
                position: "top-center"
            });
            notified.current = true;
        }
        return <Navigate to="/unauthorized" />;
    }
    return children;
}

export default ProtectedRoute;