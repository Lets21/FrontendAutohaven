import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Image {
  id: string;
  url: string;
  alt: string;
}
interface Vehicle {
  _id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  images: Image[];
  mileage: number;
  fuel: 'Bensin' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Manual' | 'Automatic';
  power: number;
  interiorCondition: string;
  exteriorCondition: string;
  damageHistory: string;
  maintenanceHistory: string[];
  lastInspectionDate: string;
  nextInspectionDate: string;
  featured?: boolean;
}

const today = new Date().toISOString().substring(0, 10);

const initialVehicle: Omit<Vehicle, '_id' | 'images'> & { images?: Image[] } = {
  brand: "",
  model: "",
  version: "",
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  fuel: "Bensin",
  transmission: "Manual",
  power: 0,
  interiorCondition: "",
  exteriorCondition: "",
  damageHistory: "",
  maintenanceHistory: [],
  lastInspectionDate: today,
  nextInspectionDate: today,
  featured: false,
};

const FUEL_TYPES = ["Bensin", "Diesel", "Hybrid", "Electric"] as const;
const TRANSMISSION_TYPES = ["Manual", "Automatic"] as const;

const API_URL = import.meta.env.VITE_API_URL;


const VehiclesAdmin: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Omit<Vehicle, '_id' | 'images'> & { images?: Image[] }>(initialVehicle);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Cargar vehículos
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/vehicles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_session") || ""}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los vehículos");
        return res.json();
      })
      .then((data) => setVehicles(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Eliminar vehículo
  const handleDelete = async (id: string) => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        <span>¿Du vil sannsynligvis slette dette kjøretøyet?</span>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);

              const deletingToast = toast.loading("Eliminando vehículo...");

              try {
                const res = await fetch(`${API_URL}/api/vehicles/${id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("admin_session") || ""}`,
                  },
                });
                if (!res.ok) throw new Error("No se pudo eliminar");
                setVehicles((prev) => prev.filter((v) => v._id !== id));
                toast.dismiss(deletingToast);
                toast.success("Vehículo eliminado correctamente");
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

  // Editar
  const handleEdit = (vehicle: Vehicle) => {
    setEditing(vehicle);
    setForm({
      ...vehicle,
      lastInspectionDate: vehicle.lastInspectionDate?.substring(0, 10) || today,
      nextInspectionDate: vehicle.nextInspectionDate?.substring(0, 10) || today,
    });
    setImagePreviews(vehicle.images?.map(img => img.url) || []);
    setImageFiles([]); // No tenemos los archivos reales en la edición
    setShowModal(true);
    setError(null);
  };

  // Crear nuevo
  const handleNew = () => {
    setEditing(null);
    setForm(initialVehicle);
    setImageFiles([]);
    setImagePreviews([]);
    setShowModal(true);
    setError(null);
  };

  // Subir múltiples imágenes (GUARDA FILES)
  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  // Eliminar imagen individual (solo de la subida actual)
  const handleRemoveImage = (idx: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

// Guardar (Crear o Editar)
const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.brand || !form.model || !form.year || !form.price) {
    setError("Marca, Modelo, Año y Precio son obligatorios.");
    return;
  }

  // Para creación, requiere nuevas imágenes (al menos una)
  if (!editing && (!imageFiles || imageFiles.length === 0)) {
    setError("Debes subir al menos una imagen.");
    return;
  }

  // Usa FormData en vez de JSON
  const data = new FormData();
  data.append("brand", form.brand);
  data.append("model", form.model);
  data.append("version", form.version);
  data.append("year", String(form.year));
  data.append("price", String(form.price));
  data.append("mileage", String(form.mileage));
  data.append("fuel", form.fuel);
  data.append("transmission", form.transmission);
  data.append("power", String(form.power));
  data.append("interiorCondition", form.interiorCondition);
  data.append("exteriorCondition", form.exteriorCondition);
  data.append("damageHistory", form.damageHistory);
  data.append("maintenanceHistory", JSON.stringify(form.maintenanceHistory));
  data.append("lastInspectionDate", form.lastInspectionDate);
  data.append("nextInspectionDate", form.nextInspectionDate);
  data.append("featured", form.featured ? "true" : "false");

  // Imágenes NUEVAS (sólo si hay nuevas)
  imageFiles.forEach(file => data.append("images", file));

  try {
    let res: Response, result: Vehicle;
    if (editing) {
      res = await fetch(`${API_URL}/api/vehicles/${editing._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_session") || ""}`,
        },
        body: data,
      });
      if (!res.ok) throw new Error("Kjøretøyet kunne ikke redigeres");
      result = await res.json();
      setVehicles(vehicles.map((v) => (v._id === editing._id ? result : v)));
      toast.success("Kjøretøyet er redigert");
    } else {
      res = await fetch(`${API_URL}/api/vehicles`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_session") || ""}`,
        },
        body: data,
      });
      if (!res.ok) throw new Error("Kjøretøyet kunne ikke opprettes");
      result = await res.json();
      setVehicles([...vehicles, result]);
      toast.success("Kjøretøy lagt til");
    }
    setShowModal(false);
    setEditing(null);
    setForm(initialVehicle);
    setImageFiles([]);
    setImagePreviews([]);
    setError(null);
  } catch (err: any) {
    setError(err.message || "Feil ved lagring");
  }
};


  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-xl text-white font-semibold mr-3">
            Kjøretøykatalog
          </h2>
          <span className="bg-blue-600 text-white font-bold text-sm px-3 py-1 rounded-full">
            {vehicles.length}
          </span>
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold shadow"
          onClick={handleNew}
        >
          Legg til kjøretøy
        </button>
      </div>

      {loading && <div className="text-gray-200">Lading...</div>}
      {error && <div className="text-red-400 mb-4">{error}</div>}
      {!loading && (
        <table className="w-full table-auto mb-8 bg-gray-800 rounded-xl shadow">
          <thead>
            <tr className="text-blue-300 text-lg">
              <th className="px-2 py-2">Bilde</th>
              <th className="px-2 py-2">Merke</th>
              <th className="px-2 py-2">Modell</th>
              <th className="px-2 py-2">Versjon</th>
              <th className="px-2 py-2">År</th>
              <th className="px-2 py-2">Pris</th>
              <th className="px-2 py-2">Alternativer</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id} className="text-gray-200 hover:bg-gray-700 transition">
                <td className="px-2 py-2">
                  {vehicle.images && vehicle.images[0]?.url ? (
                    <img
                      src={vehicle.images[0].url}
                      alt={vehicle.images[0].alt || vehicle.model}
                      className="h-16 w-28 object-cover rounded shadow"
                    />
                  ) : (
                    <div className="h-16 w-28 flex items-center justify-center bg-gray-600 text-gray-400 rounded">
                      Ikke noe bilde
                    </div>
                  )}
                </td>
                <td className="px-2 py-2 font-semibold">{vehicle.brand}</td>
                <td className="px-2 py-2">{vehicle.model}</td>
                <td className="px-2 py-2">{vehicle.version}</td>
                <td className="px-2 py-2">{vehicle.year}</td>
                <td className="px-2 py-2">${vehicle.price}</td>
                <td className="px-2 py-2">
                  <button className="bg-yellow-600 px-2 py-1 rounded mr-2" onClick={() => handleEdit(vehicle)}>Redigere</button>
                  <button className="bg-red-700 px-2 py-1 rounded" onClick={() => handleDelete(vehicle._id)}>Eliminere</button>
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-4">Ingen kjøretøy ennå.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden">
            <form
              onSubmit={handleSave}
              className="p-8 max-h-[90vh] overflow-y-auto"
              style={{ minWidth: 350 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {editing ? "Editar Vehículo" : "Agregar Vehículo"}
              </h3>
              {error && <div className="mb-4 text-red-400 text-center">{error}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex flex-col gap-3">
                  {/* Campos de texto igual que antes... */}
                  {/* ... */}
                  <div>
                    <label className="text-gray-300 block mb-1">Merke</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      value={form.brand}
                      onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                      required />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Modell</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      value={form.model}
                      onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
                      required />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Versjon</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      value={form.version}
                      onChange={e => setForm(f => ({ ...f, version: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">År</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      type="number"
                      value={form.year}
                      onChange={e => setForm(f => ({ ...f, year: Number(e.target.value) }))}
                      required />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Pris</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      type="number"
                      value={form.price}
                      onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                      required />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Kilometerstand</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      type="number"
                      value={form.mileage}
                      onChange={e => setForm(f => ({ ...f, mileage: Number(e.target.value) }))}
                      required />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Drivstofftype</label>
                    <select className="w-full p-2 rounded bg-gray-800 text-white"
                      value={form.fuel}
                      onChange={e => setForm(f => ({ ...f, fuel: e.target.value as Vehicle["fuel"] }))}
                      required>
                      <option value="">Velge...</option>
                      {FUEL_TYPES.map(fuel => (
                        <option key={fuel} value={fuel}>{fuel}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Overføring</label>
                    <select className="w-full p-2 rounded bg-gray-800 text-white"
                      value={form.transmission}
                      onChange={e => setForm(f => ({ ...f, transmission: e.target.value as Vehicle["transmission"] }))}
                      required>
                      <option value="">Velge...</option>
                      {TRANSMISSION_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-gray-300 block mb-1">Makt (HP)</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      type="number"
                      value={form.power}
                      onChange={e => setForm(f => ({ ...f, power: Number(e.target.value) }))}
                      required />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Innvendig tilstand</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      value={form.interiorCondition}
                      onChange={e => setForm(f => ({ ...f, interiorCondition: e.target.value }))}
                      required />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Utvendig tilstand</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      value={form.exteriorCondition}
                      onChange={e => setForm(f => ({ ...f, exteriorCondition: e.target.value }))}
                      required />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Skadehistorikk</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      value={form.damageHistory}
                      onChange={e => setForm(f => ({ ...f, damageHistory: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Vedlikeholdshistorikk (atskilt med komma)</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      value={form.maintenanceHistory.join(", ")}
                      onChange={e => setForm(f => ({
                        ...f,
                        maintenanceHistory: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                      }))}
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Siste revisjonsdato</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      type="date"
                      value={form.lastInspectionDate}
                      onChange={e => setForm(f => ({ ...f, lastInspectionDate: e.target.value }))}
                      required />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1">Neste gjennomgangsdato</label>
                    <input className="w-full p-2 rounded bg-gray-800 text-white"
                      type="date"
                      value={form.nextInspectionDate}
                      onChange={e => setForm(f => ({ ...f, nextInspectionDate: e.target.value }))}
                      required />
                  </div>
                  {/* NUEVO: Imágenes múltiples */}
                  <div>
                    <label className="text-gray-300 block mb-1">Kjøretøybilder</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleImages}
                      className="w-full"
                    />
                    {/* Galería de previsualización */}
                    {imagePreviews.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {imagePreviews.map((url, idx) => (
                          <div key={idx} className="relative group">
                            <img src={url} alt="preview" className="h-20 rounded shadow border" />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-red-600 rounded-full px-1 py-0.5 text-xs text-white opacity-80 hover:opacity-100"
                              onClick={() => handleRemoveImage(idx)}
                            >✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 sticky bottom-0 bg-gray-900 pt-4">
                <button
                  className="bg-gray-700 px-5 py-2 rounded-xl text-white hover:bg-gray-600 transition"
                  onClick={() => setShowModal(false)}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-600 px-6 py-2 rounded-xl text-white hover:bg-blue-700 transition font-bold shadow"
                  type="submit"
                >
                  {editing ? "Guardar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclesAdmin;
