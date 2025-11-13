import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function Settings() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-8 bg-primary-900 text-white min-h-screen">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Store Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-primary-300 mb-1">Store Name</label>
                  <input type="text" defaultValue="POS Pro Demo" className="w-full px-4 py-2 bg-primary-700 rounded-lg" />
                </div>
                <div>
                  <label className="block text-primary-300 mb-1">Address</label>
                  <input type="text" defaultValue="123 Main St, City, State" className="w-full px-4 py-2 bg-primary-700 rounded-lg" />
                </div>
              </div>
            </div>

            <div className="bg-primary-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Tax & Receipt</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-primary-300 mb-1">Tax Rate (%)</label>
                  <input type="number" defaultValue="8" className="w-full px-4 py-2 bg-primary-700 rounded-lg" />
                </div>
                <div>
                  <label className="block text-primary-300 mb-1">Receipt Footer</label>
                  <textarea className="w-full px-4 py-2 bg-primary-700 rounded-lg" rows={3}>
                    Thank you for shopping with us!
                  </textarea>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-6 bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}