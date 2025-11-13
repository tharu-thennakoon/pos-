import { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function Inventory() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setProducts([
      { id: 1, name: "Organic Bananas", category: "Produce", price: 0.69, stock: 150, status: "In Stock" },
      { id: 2, name: "Whole Milk (1 Gallon)", category: "Dairy", price: 3.99, stock: 40, status: "In Stock" },
      { id: 3, name: "Artisan Sourdough Bread", category: "Bakery", price: 5.49, stock: 25, status: "In Stock" },
      { id: 4, name: "Free-Range Eggs (Dozen)", category: "Dairy", price: 4.29, stock: 59, status: "In Stock" },
      { id: 5, name: "Avocado", category: "Produce", price: 1.99, stock: 80, status: "In Stock" },
      { id: 6, name: "Ground Coffee (Medium Roast)", category: "Pantry", price: 12.99, stock: 35, status: "In Stock" },
      { id: 7, name: "Cheddar Cheese Block", category: "Dairy", price: 6.79, stock: 30, status: "In Stock" },
      { id: 8, name: "Gala Apples (3 lbs)", category: "Produce", price: 4.99, stock: 120, status: "In Stock" },
      { id: 9, name: "Potato Chips (Family Size)", category: "Snacks", price: 4.50, stock: 90, status: "In Stock" },
    ]);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-8 bg-primary-900 text-white min-h-screen">
          <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

          <div className="bg-primary-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary-700">
                <tr>
                  <th className="px-6 py-4 text-left">PRODUCT</th>
                  <th className="px-6 py-4 text-left">CATEGORY</th>
                  <th className="px-6 py-4 text-left">PRICE</th>
                  <th className="px-6 py-4 text-left">STOCK</th>
                  <th className="px-6 py-4 text-left">STATUS</th>
                  <th className="px-6 py-4 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t border-primary-700">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="bg-gray-200 border-2 border-dashed rounded w-12 h-12"></div>
                      <span>{p.name}</span>
                    </td>
                    <td className="px-6 py-4">{p.category}</td>
                    <td className="px-6 py-4">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{p.stock}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="text-accent hover:underline">Restock</button>
                      <button className="text-yellow-400 hover:underline">Edit</button>
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