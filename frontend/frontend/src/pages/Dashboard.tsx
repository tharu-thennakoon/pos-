// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

interface DashboardData {
  metrics?: {
    totalRevenue: number;
    totalSales: number;
    lowStock: number;
  };
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({});

  useEffect(() => {
    api.getDashboard().then(setData).catch(console.error);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-8 bg-primary-900 min-h-screen text-white">
          <h1 className="text-3xl font-bold mb-8">Welcome back, Admin!</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-primary-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-100">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    ${data.metrics?.totalRevenue?.toFixed(2) ?? "0.00"}
                  </p>
                </div>
                <div className="text-3xl">Money</div>
              </div>
            </div>

            <div className="bg-primary-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-100">Total Sales</p>
                  <p className="text-2xl font-bold">
                    {data.metrics?.totalSales ?? 0}
                  </p>
                </div>
                <div className="text-3xl">Cart</div>
              </div>
            </div>

            <div className="bg-primary-800 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-100">Low Stock Items</p>
                  <p className="text-2xl font-bold">
                    {data.metrics?.lowStock ?? 0}
                  </p>
                </div>
                <div className="text-3xl">Warning</div>
              </div>
            </div>
          </div>

          {/* Charts placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-primary-800 p-6 rounded-xl">
              <h3 className="mb-4">Weekly Sales</h3>
              <div className="h-48 bg-primary-700 rounded-lg flex items-end justify-around p-4">
                <div className="w-16 bg-accent h-32 rounded"></div>
                <div className="w-16 bg-accent h-40 rounded"></div>
                <div className="w-16 bg-accent h-24 rounded"></div>
              </div>
            </div>

            <div className="bg-primary-800 p-6 rounded-xl">
              <h3 className="mb-4">Top Products</h3>
              <div className="h-48 bg-primary-700 rounded-lg flex items-center justify-center text-4xl">
                Pie Chart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}