// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ── PAGES ─────────────────────────────────────────────────────
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";

// ── CONTEXT & PROTECTED ROUTE ─────────────────────────────────
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── PUBLIC ROUTES ── */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ── PROTECTED ROUTES (ALL OTHER PATHS) ── */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  {/* Dashboard is the home page */}
                  <Route path="/" element={<Dashboard />} />

                  {/* Main Navigation */}
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />

                  {/* 404 for any unknown route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// ── 404 PAGE ───────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page Not Found</p>
      <a href="/" className="text-accent hover:underline">
        ← Back to Dashboard
      </a>
    </div>
  );
}

export default App;