
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types";
import { mockUsers } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (updatedUser: User) => void;
  isStaff: boolean; // Add this to check if user is admin or faculty
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  updateUserProfile: () => {},
  isStaff: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsStaff(parsedUser.role === "admin" || parsedUser.role === "faculty");
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Validate email ends with @vnrvjiet.in
    if (!email.endsWith("@vnrvjiet.in")) {
      toast({
        title: "Invalid email",
        description: "Please use your VNR VJIET email address",
        variant: "destructive",
      });
      return false;
    }

    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return false;
    }

    // Find user by email from mockUsers
    let foundUser = mockUsers.find(u => u.email === email);
    
    // If user doesn't exist in mockUsers, create a new one based on email
    if (!foundUser) {
      // Extract name from email (everything before @)
      const name = email.split('@')[0].split('.').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      // Determine role based on email
      let role: "student" | "faculty" | "admin" = "student";
      if (email.includes("faculty")) {
        role = "faculty";
      } else if (email.includes("admin")) {
        role = "admin";
      }
      
      // Create new user
      foundUser = {
        id: `user-${Date.now()}`,
        name: name,
        email: email,
        role: role,
        section: role === "student" ? "CSE-A" : undefined,
        department: "Computer Science"
      };
    }
    
    // Login successful
    setUser(foundUser);
    setIsAuthenticated(true);
    setIsStaff(foundUser.role === "admin" || foundUser.role === "faculty");
    localStorage.setItem("user", JSON.stringify(foundUser));
    
    toast({
      title: "Login successful",
      description: `Welcome back, ${foundUser.name}!`,
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsStaff(false);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, updateUserProfile, isStaff }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
