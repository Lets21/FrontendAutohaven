import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SellCarPage from './pages/SellCarPage';
import { Toaster } from 'react-hot-toast'; 
import AdminLogin from "./admin/AdminLogin";
import AdminPanel from "./admin/AdminPanel";
import RequireAdminAuth from "./admin/RequireAdminAuth";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Navbar />
        {/* 1️⃣ Agrega el Toaster aquí para que esté disponible en toda la app */}
        <Toaster position="top-right" reverseOrder={false} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/vehiculos/:id" element={<VehicleDetailPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/sell-your-car" element={<SellCarPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <AdminPanel />
            </RequireAdminAuth>
          }
        />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
