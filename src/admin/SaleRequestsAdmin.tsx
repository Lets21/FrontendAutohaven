import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ImageCloudinary {
  id: string;
  url: string;
  alt?: string;
}

interface Vehicle {
  brand: string;
  model: string;
  year: number;
  [key: string]: any;
}
interface SaleRequest {
  _id: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  vehicle: Vehicle;
  images: ImageCloudinary[];  // <--- IMPORTANTE: Array de objetos, no strings
  status?: "pending" | "reviewed" | "approved" | "rejected";
  createdAt: string;
}
const API_URL = import.meta.env.VITE_API_URL;
const fallbackImg = "/no-image.png"; // Pon este archivo en /public

const statusColor = {
  pending: "bg-yellow-700 text-yellow-200",
  reviewed: "bg-blue-800 text-blue-200",
  approved: "bg-green-700 text-green-200",
  rejected: "bg-red-700 text-red-200",
};

const SaleRequestsAdmin: React.FC = () => {
  const [sales, setSales] = useState<SaleRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/sales`, {

      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_session") || ""}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar las solicitudes");
        return res.json();
      })
      .then((data) => setSales(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        <span>¿Er du sikker på at du vil slette denne forespørselen?</span>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const deletingToast = toast.loading("Eliminando solicitud...");
              try {
                const res = await fetch(`${API_URL}/api/sales/${id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("admin_session") || ""}`,
                  },
                });
                if (!res.ok) throw new Error("No se pudo eliminar");
                setSales((prev) => prev.filter((s) => s._id !== id));
                toast.dismiss(deletingToast);
                toast.success("Solicitud eliminada correctamente");
              } catch (err: any) {
                toast.dismiss(deletingToast);
                toast.error(err.message || "Error al eliminar");
              }
            }}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Eliminere
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
          >
            Kansellere
          </button>
        </div>
      </span>
    ), { duration: 10000 });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="border-l-4 border-blue-500 pl-2">Salgsforespørsler</span>
        <span className="bg-blue-700 text-white text-xs px-3 py-1 rounded-xl ml-2">{sales.length}</span>
      </h2>
      {loading && <div className="text-gray-200">Lading...</div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-xl shadow-xl bg-gray-900">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-800 text-blue-300 text-sm">
                <th className="px-4 py-3 text-left">Bilde</th>
                <th className="px-4 py-3 text-left">Selger</th>
                <th className="px-4 py-3 text-left">E-post</th>
                <th className="px-4 py-3 text-left">Telefon</th>
                <th className="px-4 py-3 text-left">Kjøretøy</th>
                <th className="px-4 py-3 text-left">Tilstand</th>
                <th className="px-4 py-3 text-left">Dato</th>
                <th className="px-4 py-3 text-left">Alternativer</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id} className="hover:bg-gray-800 text-gray-200">
                  {/* Imagen principal (usa Cloudinary si existe) */}
                  <td className="px-4 py-2">
                    {sale.images && sale.images.length > 0 ? (
                      <img
                        src={sale.images[0].url}
                        alt={sale.images[0].alt || "Imagen del auto"}
                        className="h-16 w-24 rounded-lg object-cover border border-gray-700 shadow"
                        onError={(e) => ((e.target as HTMLImageElement).src = fallbackImg)}
                      />
                    ) : (
                      <img
                        src={fallbackImg}
                        alt="Sin imagen"
                        className="h-16 w-24 rounded-lg object-cover border border-gray-700 shadow"
                      />
                    )}
                  </td>
                  {/* Datos */}
                  <td className="px-4 py-2 font-semibold">{sale.sellerName}</td>
                  <td className="px-4 py-2">{sale.sellerEmail}</td>
                  <td className="px-4 py-2">{sale.sellerPhone}</td>
                  <td className="px-4 py-2">
                    <div className="font-semibold">{sale.vehicle.brand} {sale.vehicle.model}</div>
                    <div className="text-gray-400 text-xs">{sale.vehicle.year}</div>
                  </td>
                  {/* Estado */}
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      statusColor[(sale.status as keyof typeof statusColor) || "pending"]
                    }`}>
                      {sale.status || "pending"}
                    </span>
                  </td>
                  {/* Fecha */}
                  <td className="px-4 py-2">{new Date(sale.createdAt).toLocaleString()}</td>
                  {/* Opciones */}
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-700 px-3 py-1 rounded-lg text-white hover:bg-red-900 transition"
                      onClick={() => handleDelete(sale._id)}
                    >
                      Eliminere
                    </button>
                  </td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-gray-400 py-6">
                    Ingen søknader ennå.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SaleRequestsAdmin;
