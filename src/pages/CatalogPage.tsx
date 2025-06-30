import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import VehicleCard from '../components/ui/VehicleCard';
import VehicleFilters from '../components/vehicle/VehicleFilters';

interface Vehicle {
  _id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  fuel: string;
  transmission: string;
  price: number;
  images: { id: string; url: string; alt: string }[];
  [key: string]: any;
}

interface Filters {
  brands: string[];
  yearRange: [number, number];
  fuelTypes: string[];
  transmission: string[];
  priceRange: [number, number];
}

const defaultFilters: Filters = {
  brands: [],
  yearRange: [1990, new Date().getFullYear()],
  fuelTypes: [],
  transmission: [],
  priceRange: [0, 100000],
};

const API_URL = import.meta.env.VITE_API_URL;

const CatalogPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filters>(defaultFilters);

useEffect(() => {
  setLoading(true);
  fetch(`${API_URL}/api/vehicles`)
    .then((res) => res.json())
    .then((data) => {
      // Normaliza imágenes si lo deseas
      const normalized = Array.isArray(data)
        ? data.map((v: any) => ({
            ...v,
            images: (v.images || []).map((img: any) =>
              typeof img === 'string' ? { url: img } : img
            ),
          }))
        : [];
      setVehicles(normalized);
    })
    .catch((err) => {
      console.error('Error fetching vehicles:', err);
      setVehicles([]);
    })
    .finally(() => setLoading(false));
}, []);



  // === Generar dinámicamente las opciones de filtro ===
  const brands = Array.from(new Set(vehicles.map(v => v.brand))).sort();
  const fuelTypes = Array.from(new Set(vehicles.map(v => v.fuel))).sort();
  const transmissionTypes = Array.from(new Set(vehicles.map(v => v.transmission))).sort();

  // Determinar los valores máximos y mínimos de año y precio automáticamente si lo deseas
  const allYears = vehicles.map(v => v.year);
  const yearMin = allYears.length > 0 ? Math.min(...allYears) : 1990;
  const yearMax = allYears.length > 0 ? Math.max(...allYears) : new Date().getFullYear();

  const allPrices = vehicles.map(v => v.price);
  const priceMin = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const priceMax = allPrices.length > 0 ? Math.max(...allPrices) : 100000;

  const filterOptions = {
    brands,
    yearRange: [yearMin, yearMax] as [number, number],
    fuelTypes,
    transmissionTypes,
    priceRange: [priceMin, priceMax] as [number, number],
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      !query ||
      vehicle.brand?.toLowerCase().includes(query) ||
      vehicle.model?.toLowerCase().includes(query) ||
      vehicle.version?.toLowerCase().includes(query) ||
      vehicle.year?.toString().includes(query);

    const matchesYear =
      (!activeFilters.yearRange || (
        vehicle.year >= activeFilters.yearRange[0] &&
        vehicle.year <= activeFilters.yearRange[1]
      ));

    const matchesBrand =
      !activeFilters.brands.length ||
      activeFilters.brands.includes(vehicle.brand);

    const matchesFuel =
      !activeFilters.fuelTypes.length ||
      activeFilters.fuelTypes.includes(vehicle.fuel);

    const matchesTransmission =
      !activeFilters.transmission.length ||
      activeFilters.transmission.includes(vehicle.transmission);

    const matchesPrice =
      (!activeFilters.priceRange || (
        vehicle.price >= activeFilters.priceRange[0] &&
        vehicle.price <= activeFilters.priceRange[1]
      ));

    return (
      matchesSearch &&
      matchesYear &&
      matchesBrand &&
      matchesFuel &&
      matchesTransmission &&
      matchesPrice
    );
  });

  const handleApplyFilters = (filters: Filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Kjøretøykatalog"
          subtitle="Utforsk vårt utvalg av tilgjengelige kjøretøy"
        />

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Søk etter merke, modell, år..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="md:w-1/4">
            <VehicleFilters
              options={filterOptions}
              onApplyFilters={handleApplyFilters}
            />
          </div>

          {/* Vehicles Grid */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">Laster kjøretøy...</div>
            ) : filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map(vehicle => (
                  <VehicleCard
                    key={vehicle._id}
                    id={vehicle._id}
                    imageUrl={vehicle.images && vehicle.images[0]?.url}
                    alt={vehicle.images && vehicle.images[0]?.alt}
                    brand={vehicle.brand}
                    model={vehicle.model}
                    version={vehicle.version}
                    year={vehicle.year}
                    price={vehicle.price}
                    sold={vehicle.sold}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-xl text-gray-300">
                  Ingen kjøretøy funnet som samsvarer med dine kriterier.
                </p>
                <p className="text-gray-400 mt-2">
                  Prøv å endre filtrene eller søket for å se flere resultater.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
