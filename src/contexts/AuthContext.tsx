
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Simple auth methods for our MVP
  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // In a real app, this would call an API
      // For our MVP, we'll just simulate a successful signup
      const newUser = { email, id: `user_${Date.now()}` };
      setCurrentUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast({
        title: "Account created successfully!",
        description: "Welcome to Reveal It.",
      });
    } catch (error) {
      toast({
        title: "Failed to create account",
        description: "Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // For demo purposes, we'll just accept any email/password
      const user = { email, id: `user_${Date.now()}` };
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Signed in successfully!",
      });
    } catch (error) {
      toast({
        title: "Failed to sign in",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Signed out successfully",
    });
  };

  const value = {
    currentUser,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
