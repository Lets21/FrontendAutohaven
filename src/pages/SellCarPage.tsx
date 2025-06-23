import React, { useState } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";

const API_URL = 'https://backendautohaven.onrender.com';

const initialForm = {
  sellerName: "",
  sellerEmail: "",
  sellerPhone: "",
  vehicle: {
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "",
    transmission: "",
    description: "",
  },
  images: [] as File[],
};

const fuelOptions = ["Gasoline", "Diesel", "Hybrid", "Electric"];
const transmissionOptions = ["Automatic", "Manual"];

const SellCarPage: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name in form) {
      setForm({ ...form, [name]: value });
    } else if (name in form.vehicle) {
      setForm({ ...form, vehicle: { ...form.vehicle, [name]: value } });
    }
  };

  // Manejo de múltiples imágenes (vista previa + guardado en form)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setForm({ ...form, images: files });
      setPreviews(files.map(file => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (
      !form.sellerName ||
      !form.sellerEmail ||
      !form.sellerPhone ||
      !form.vehicle.brand ||
      !form.vehicle.model ||
      !form.vehicle.year
    ) {
      toast.error("Por favor, rellena todos los campos obligatorios.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("sellerName", form.sellerName);
      data.append("sellerEmail", form.sellerEmail);
      data.append("sellerPhone", form.sellerPhone);
      data.append("vehicle", JSON.stringify({
        ...form.vehicle,
        year: Number(form.vehicle.year),
        mileage: Number(form.vehicle.mileage),
      }));

      // Añade cada imagen (puede ser varias)
      for (const file of form.images) {
        data.append("images", file);
      }

      const response = await fetch(`${API_URL}/api/sales`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        toast.success("¡Application sent successfully! We will contact you soon.");
        setForm(initialForm);
        setPreviews([]);
      } else {
        toast.error("There was an error submitting your request. Please try again.");
      }
    } catch {
      toast.error("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Selg Bilen Din"
          subtitle="Fyll ut skjemaet nedenfor for å legge ut kjøretøyet ditt for salg"
          className="mb-8"
        />

        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold text-white mb-4">Personlig Informasjon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name="sellerName"
                placeholder="Your Name *"
                className="p-3 rounded bg-gray-700 text-white"
                value={form.sellerName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="sellerEmail"
                placeholder="Your Email *"
                className="p-3 rounded bg-gray-700 text-white"
                value={form.sellerEmail}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="sellerPhone"
                placeholder="Your Phone *"
                className="p-3 rounded bg-gray-700 text-white"
                value={form.sellerPhone}
                onChange={handleChange}
                required
              />
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">Kjøretøyinformasjon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name="brand"
                placeholder="Brand *"
                className="p-3 rounded bg-gray-700 text-white"
                value={form.vehicle.brand}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="model"
                placeholder="Model *"
                className="p-3 rounded bg-gray-700 text-white"
                value={form.vehicle.model}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="year"
                placeholder="Year *"
                className="p-3 rounded bg-gray-700 text-white"
                value={form.vehicle.year}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="mileage"
                placeholder="Mileage (km)"
                className="p-3 rounded bg-gray-700 text-white"
                value={form.vehicle.mileage}
                onChange={handleChange}
              />
              <select
                name="fuel"
                className="p-3 rounded bg-gray-700 text-white"
                value={form.vehicle.fuel}
                onChange={handleChange}
              >
                <option value="">Fuel Type</option>
                {fuelOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <select
                name="transmission"
                className="p-3 rounded bg-gray-700 text-white"
                value={form.vehicle.transmission}
                onChange={handleChange}
              >
                <option value="">Transmission</option>
                {transmissionOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <textarea
              name="description"
              placeholder="Additional details"
              className="w-full p-3 rounded bg-gray-700 text-white mb-4"
              value={form.vehicle.description}
              onChange={handleChange}
              rows={3}
            />

            <input
              type="file"
              accept="image/*"
              className="w-full p-3 rounded bg-gray-700 text-white mb-6"
              multiple
              onChange={handleImageChange}
            />

            {/* Previsualización de imágenes */}
            {previews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {previews.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    className="h-20 rounded shadow"
                  />
                ))}
              </div>
            )}

            <Button
              variant="primary"
              type="submit"
              className="w-full text-lg"
              disabled={loading}
            >
              {loading ? "Sender..." : "Send inn"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellCarPage;
