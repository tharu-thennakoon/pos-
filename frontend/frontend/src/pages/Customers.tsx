import { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    setCustomers([
      { id: 1, name: "John Doe", contact: "john.d@example.com", phone: "555-1234", points: 120 },
      { id: 2, name: "Jane Smith", contact: "jane.s@example.com", phone: "555-5678", points: 450 },
      { id: 3, name: "Sam Wilson", contact: "sam.w@example.com", phone: "555-8765", points: 35 },
    ]);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-8 bg-primary-900 text-white min-h-screen">
          <h1 className="text-3xl font-bold mb-6">Customer Management</h1>

          <div className="bg-primary-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary-700">
                <tr>
                  <th className="px-6 py-4 text-left">NAME</th>
                  <th className="px-6 py-4 text-left">CONTACT</th>
                  <th className="px-6 py-4 text-left">LOYALTY POINTS</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-t border-primary-700">
                    <td className="px-6 py-4">{c.name}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p>{c.contact}</p>
                        <p className="text-sm text-primary-300">{c.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-accent font-bold">{c.points}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}