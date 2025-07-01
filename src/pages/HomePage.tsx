import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import VehicleCard from '../components/ui/VehicleCard';
import { Car, Award, PiggyBank, Users } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

interface Vehicle {
  _id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  images: { url: string }[];
}

const HomePage: React.FC = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/vehicles/ultimos`)
      .then(res => res.json())
      .then(data => setFeaturedVehicles(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
            alt="Car dealership"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center items-center mb-6">
                <Car className="h-16 w-16" />
                <h1 className="text-4xl font-bold ml-2">AUTOHAVEN</h1>
                <span className="text-lg ml-1">AS</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                VI KJØPER ALLE BILER – UANSETT PRIS!  
              </h2>

              <p className="text-xl text-gray-300 mb-8">
                  Har du en bil du vil bli kvitt? Vi kjøper den – uansett pris, tilstand eller kilometerstand!
Enten det er en nyere bil, eldre modell, EU-klar eller ikke – vi tar imot alle typer biler. Rask vurdering og oppgjør, enkelt og trygt.
              </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link to="/catalogo">Kjøretøy</Link>
                </Button>
                {/* Botón destacado */}
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-xl font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-xl border-2 border-yellow-500 transition-all duration-200"
                >
                  <Link to="/sell-your-car">Selg Bilen Din</Link>
                </Button>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Link to="/contacto">Kontakt Oss</Link>
                </Button>
                {/* Botón Finn-Annonser */}
                <a
    href="https://www.finn.no/mobility/search/car?orgId=4579290&stored-id=79203714"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full sm:w-auto px-6 py-3 rounded-lg border-2 border-blue-800 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl shadow-xl transition-all duration-200 flex items-center justify-center"
    style={{ minHeight: '48px' }} // Igualar altura si Button tiene min-h
  >
    Finn-Annonser
  </a>
              </div>


            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Finn ditt neste kjøretøy – med trygghet og kvalitet du kan stole på" 
            subtitle=""
            centered
          />

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-300 mb-8">
             Hos oss får du tilgang til et nøye utvalgt sortiment av kvalitetsbiler, kombinert med full åpenhet, førsteklasses kundeservice og garanti.
Vi gjør bilkjøpet enkelt, trygt og til å stole på – akkurat slik det bør være.
            </p>
            <Button variant="secondary">
              <Link to="/nosotros">Les Vår Historie</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Utvalgte Kjøretøy" 
            subtitle=""
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {loading ? (
              <div className="col-span-3 text-center text-gray-400">Laster kjøretøy...</div>
            ) : (
              featuredVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle._id}
                  id={vehicle._id}
                  imageUrl={vehicle.images[0]?.url}
                  brand={vehicle.brand}
                  model={vehicle.model}
                  version={vehicle.version}
                  year={vehicle.year}
                  price={vehicle.price}
                />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary">
              <Link to="/catalogo">Se Alle Kjøretøy</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Hvorfor Velge Oss?" 
            subtitle=""
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Garantert Kvalitet</h3>
              <p className="text-gray-300">
                Alle våre kjøretøy gjennomgår grundige tekniske inspeksjoner for å sikre at de er i optimal stand.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <PiggyBank className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Konkurransedyktige Priser</h3>
              <p className="text-gray-300">
               Vi tilbyr de beste prisene på markedet uten å gå på kompromiss med kvalitet eller service.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Personlig Service</h3>
              <p className="text-gray-300">
                Vårt team veileder deg gjennom hele prosessen for å finne kjøretøyet som passer best for dine behov.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Klar for å finne ditt neste kjøretøy?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Vårt team er klart til å hjelpe deg med å finne det perfekte kjøretøyet.
   Besøk oss eller ta kontakt med oss i dag
          </p>
          <Button variant="primary" size="lg">
            <Link to="/contacto">Kontakt Oss Nå</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
