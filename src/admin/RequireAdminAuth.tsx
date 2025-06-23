import React from "react";
import { Navigate } from "react-router-dom";

const RequireAdminAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAdmin = !!localStorage.getItem("admin_session");
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};


export default RequireAdminAuth;
