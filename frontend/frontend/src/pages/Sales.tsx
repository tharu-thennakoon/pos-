// src/pages/Sales.tsx
import { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import { api, type Product } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface CartItem extends Product {
  qty: number;
}

export default function Sales() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.warn("Using mock data:", err);
        setProducts([
          { id: 1, name: "Organic Bananas", unitPrice: 0.69, barcode: "4011", stockQuantity: 150 },
          { id: 2, name: "Whole Milk", unitPrice: 3.99, barcode: "123456", stockQuantity: 40 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (p: Product) => {
    const existing = cart.find((i) => i.id === p.id);
    if (existing) {
      setCart(cart.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      setCart([...cart, { ...p, qty: 1 }]);
    }
  };

  const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const printReceipt = () => {
    const printWindow = window.open("", "", "width=300,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html><head><title>Receipt</title><style>
        body { font-family: monospace; font-size: 12px; padding: 10px; width: 80mm; }
        .center { text-align: center; }
        .flex { display: flex; justify-content: space-between; }
        hr { border: 1px dashed #000; margin: 8px 0; }
      </style></head><body>
        <div class="center"><h3>POS Pro</h3></div>
        <div class="center">123 Main St • ${new Date().toLocaleString()}</div>
        <div>Cashier: ${user?.email || "Guest"}</div>
        <hr>
        ${cart
          .map(
            (i) => `
          <div class="flex"><span>${i.name}</span><span>$${i.unitPrice.toFixed(
              2
            )} × ${i.qty}</span></div>
          <div style="text-align:right">$${(i.unitPrice * i.qty).toFixed(2)}</div>
        `
          )
          .join("")}
        <hr>
        <div class="flex"><strong>Subtotal</strong> <span>$${subtotal.toFixed(2)}</span></div>
        <div class="flex"><span>Tax (8%)</span> <span>$${tax.toFixed(2)}</span></div>
        <div class="flex" style="font-weight:bold;font-size:14px"><span>Total</span> <span>$${total.toFixed(
          2
        )}</span></div>
        <div class="center" style="margin-top:20px">Thank you!</div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
    setCart([]);
  };

  if (loading) return <div className="p-8 text-white">Loading products...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-8 bg-primary-900 text-white min-h-screen">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Sales</h1>
            <button
              onClick={printReceipt}
              disabled={cart.length === 0}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Print Receipt
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 bg-primary-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products
                  .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => addToCart(p)}
                      className="bg-primary-700 p-4 rounded-lg text-center hover:bg-primary-600 transition"
                    >
                      <div className="bg-gray-300 border-2 border-dashed rounded-xl w-full h-20 mb-2" />
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-accent font-bold">${p.unitPrice.toFixed(2)}</p>
                    </button>
                  ))}
              </div>
            </div>

            <div className="bg-primary-800 p-6 rounded-xl space-y-4">
              <h3 className="text-xl font-semibold">Current Order</h3>
              {cart.length === 0 ? (
                <p className="text-center text-primary-300 py-8">Cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {cart.map((i) => (
                      <div
                        key={i.id}
                        className="flex justify-between bg-primary-700 p-3 rounded"
                      >
                        <div>
                          <p className="font-medium">{i.name}</p>
                          <p className="text-sm">
                            ${i.unitPrice.toFixed(2)} × {i.qty}
                          </p>
                        </div>
                        <span className="font-bold">
                          ${(i.unitPrice * i.qty).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-primary-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-accent">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={printReceipt}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                  >
                    Complete Sale & Print
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}