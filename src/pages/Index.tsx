
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Log for debugging
    console.log("Index page loaded, authentication status:", isAuthenticated);
  }, [isAuthenticated]);
  
  // Redirect authenticated users to dashboard, others to login
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Index;
