
import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
  requireAuth?: boolean;
};

export const Layout = ({ children, requireAuth = true }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};
