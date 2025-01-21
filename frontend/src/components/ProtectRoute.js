import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

    if (!token) {
        return <Navigate to="/" replace />;
    }

        return children;
}

export default ProtectedRoute;
