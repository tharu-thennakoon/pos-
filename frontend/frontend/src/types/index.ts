// src/types/index.ts
export type Role = "ADMIN" | "MANAGER" | "CASHIER";

export interface User {
  id: number;
  email: string;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { fullName: string; email: string; role: Role }) => Promise<void>;
  logout: () => void;
}