// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: { fullName: string; email: string; role: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      await api.login(email, password);
      setUser({ email, role: "ADMIN" }); // You can decode JWT here
      navigate("/sales");
    } catch {
      alert("Login failed");
    }
  };

  const register = async (data: Parameters<typeof api.register>[0]) => {
    await api.register(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};