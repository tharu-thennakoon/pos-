// src/services/api.ts
const API_URL = "http://localhost:8080/api";

class ApiService {
  private get token() {
    return localStorage.getItem("token");
  }

  private headers() {
    return {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: this.headers(),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "Request failed");
    }
    return res.json();
  }

  // ---------- AUTH ----------
  login(email: string, password: string) {
    return this.request<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      localStorage.setItem("token", res.token);
    });
  }

  register(data: { fullName: string; email: string; role: string; password: string }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ---------- PRODUCTS ----------
  getProducts() {
    return this.request<Product[]>("/inventory");
  }

  // ---------- DASHBOARD ----------
  getDashboard() {
    return this.request<{
      metrics: { totalRevenue: number; totalSales: number; lowStock: number };
    }>("/dashboard");
  }
}

export const api = new ApiService();

// ──────────────────────────────────────────────────────────────
// Types (type-only import required with verbatimModuleSyntax)
export interface Product {
  id: number;
  name: string;
  barcode?: string;
  unitPrice: number;
  stockQuantity: number;
  lowStockThreshold?: number;
}