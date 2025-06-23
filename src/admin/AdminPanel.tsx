import React, { useState } from "react";
import VehiclesAdmin from "./VehiclesAdmin";
import ContactRequestsAdmin from "./ContactRequestsAdmin";
import SaleRequestsAdmin from "./SaleRequestsAdmin";

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'contacts' | 'sales'>('vehicles');

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4">
      <h1 className="text-3xl font-bold text-white mb-6">Admin Panel</h1>
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'vehicles' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          onClick={() => setActiveTab('vehicles')}
        >
          Kjøretøy
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'contacts' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          onClick={() => setActiveTab('contacts')}
        >
          Kontaktforespørsler
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'sales' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
          onClick={() => setActiveTab('sales')}
        >
          Salgsforespørsler
        </button>
      </div>
      
<div className="flex justify-between mb-6 items-center">
  <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
  <button
    className="bg-red-700 px-4 py-2 rounded text-white"
    onClick={() => {
      localStorage.removeItem("admin_session");
      window.location.href = "/admin/login";
    }}
  >
    Logg ut
  </button>
</div>

      <div>
        {activeTab === 'vehicles' && <VehiclesAdmin />}
        {activeTab === 'contacts' && <ContactRequestsAdmin />}
        {activeTab === 'sales' && <SaleRequestsAdmin />}
      </div>
    </div>
  );
};

export default AdminPanel;
