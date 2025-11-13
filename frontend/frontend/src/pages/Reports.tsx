import { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function Reports() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    setTransactions([
      { id: "cv9e8fx1", date: "11/11/2025, 8:34:31 PM", cashier: "Admin User", items: 1, total: 4.63, payment: "Card" },
      { id: "f9nywz3m", date: "11/10/2025, 5:44:20 PM", cashier: "Cashier User", items: 2, total: 13.49, payment: "Mobile" },
      { id: "yt6p9aju", date: "11/9/2025, 5:44:20 PM", cashier: "Cashier User", items: 3, total: 12.57, payment: "Card" },
    ]);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-8 bg-primary-900 text-white min-h-screen">
          <h1 className="text-3xl font-bold mb-6">Sales Reports</h1>

          <div className="bg-primary-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
            <table className="w-full">
              <thead className="bg-primary-700">
                <tr>
                  <th className="px-6 py-3 text-left">SALE ID</th>
                  <th className="px-6 py-3 text-left">DATE</th>
                  <th className="px-6 py-3 text-left">CASHIER</th>
                  <th className="px-6 py-3 text-left">ITEMS</th>
                  <th className="px-6 py-3 text-left">TOTAL</th>
                  <th className="px-6 py-3 text-left">PAYMENT</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-t border-primary-700">
                    <td className="px-6 py-4">{t.id}</td>
                    <td className="px-6 py-4">{t.date}</td>
                    <td className="px-6 py-4">{t.cashier}</td>
                    <td className="px-6 py-4">{t.items}</td>
                    <td className="px-6 py-4">${t.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary-700 rounded text-sm">{t.payment}</span>
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