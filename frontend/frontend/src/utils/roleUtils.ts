import { type Role } from "../types";

export const getSidebarItems = (role: Role) => {
  const base = [{ name: "Dashboard", path: "/", icon: "home" }];

  if (role === "ADMIN") {
    return [
      ...base,
      { name: "Sales", path: "/sales", icon: "dollar" },
      { name: "Inventory", path: "/inventory", icon: "package" },
      { name: "Customers", path: "/customers", icon: "users" },
      { name: "Reports", path: "/reports", icon: "chart" },
      { name: "Settings", path: "/settings", icon: "gear" },
    ];
  }

  if (role === "MANAGER") {
    return [
      ...base,
      { name: "Sales", path: "/sales", icon: "dollar" },
      { name: "Inventory", path: "/inventory", icon: "package" },
      { name: "Customers", path: "/customers", icon: "users" },
      { name: "Reports", path: "/reports", icon: "chart" },
    ];
  }

  if (role === "CASHIER") {
    return [
      ...base,
      { name: "Sales", path: "/sales", icon: "dollar" },
      { name: "Inventory", path: "/inventory", icon: "package" },
      { name: "Customers", path: "/customers", icon: "users" },
    ];
  }

  return base;
};