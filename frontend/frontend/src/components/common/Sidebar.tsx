import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/", icon: "Home", roles: ["ADMIN"] },
    { name: "Sales", path: "/sales", icon: "Cart", roles: ["CASHIER", "ADMIN"] },
    { name: "Inventory", path: "/inventory", icon: "Box", roles: ["ADMIN"] },
    { name: "Customers", path: "/customers", icon: "Users", roles: ["ADMIN"] },
    { name: "Reports", path: "/reports", icon: "Chart", roles: ["ADMIN"] },
    { name: "Settings", path: "/settings", icon: "Settings", roles: ["ADMIN"] },
  ];

  const filtered = links.filter((l) => l.roles.includes(user?.role || ""));

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-primary-800 text-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        POS Pro
      </h2>
      <nav className="space-y-2">
        {filtered.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              location.pathname === link.path
                ? "bg-accent text-white"
                : "hover:bg-primary-700"
            }`}
          >
            <span>{link.icon}</span> {link.name}
          </Link>
        ))}
      </nav>
      <button
        onClick={logout}
        className="mt-auto w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 text-sm"
      >
        Logout
      </button>
    </div>
  );
}