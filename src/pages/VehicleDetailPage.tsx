import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import VehicleGallery from "../components/vehicle/VehicleGallery";
import VehicleSpecs from "../components/vehicle/VehicleSpecs";
import ContactForm from "../components/forms/ContactForm";
import VehicleCard from "../components/ui/VehicleCard";

const API_URL = 'http://192.168.1.7:5000';

interface VehicleImage {
  id: string;
  url: string;
  alt?: string;
}

interface Vehicle {
  _id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  power?: number;
  interiorCondition?: string;
  exteriorCondition?: string;
  damageHistory?: string;
  maintenanceHistory?: string[];
  lastInspectionDate?: string;
  nextInspectionDate?: string;
  price: number;
  images: VehicleImage[];
}

const VehicleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [similarVehicles, setSimilarVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`${API_URL}/api/vehicles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setVehicle(data);
        return fetch(`${API_URL}/api/vehicles`)
          .then((res) => res.json())
          .then((allVehicles) => {
            const similar = allVehicles
              .filter((v: Vehicle) => v._id !== id && v.brand === data.brand)
              .slice(0, 3);
            setSimilarVehicles(similar);
          });
      })
      .catch(() => setVehicle(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-900 pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="bg-gray-900 pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Vehicle Not Found
          </h2>
          <p className="text-gray-300 mb-6">
            Sorry, the vehicle you are looking for does not exist or has been removed.
          </p>
          <Button variant="primary">
            <Link to="/catalogo">Back to Catalog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/catalogo" className="hover:text-white transition-colors">
            Catalog
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-white">
            {vehicle.brand} {vehicle.model}
          </span>
        </div>

        {/* Vehicle Title */}
        <SectionTitle
          title={`${vehicle.brand} ${vehicle.model} ${vehicle.version}`}
          subtitle={`${vehicle.year} • ${vehicle.mileage?.toLocaleString()} km • ${vehicle.fuel}`}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <VehicleGallery images={vehicle.images?.map(img => ({ ...img, alt: img.alt ?? "" })) ?? []} />
          </div>

          {/* Specs */}
          <div className="lg:col-span-5">
            <VehicleSpecs
              year={vehicle.year}
              mileage={vehicle.mileage ?? 0}
              fuel={vehicle.fuel}
              transmission={vehicle.transmission}
              power={vehicle.power ?? 0}
              interiorCondition={vehicle.interiorCondition ?? ""}
              exteriorCondition={vehicle.exteriorCondition ?? ""}
              damageHistory={vehicle.damageHistory ?? ""}
              maintenanceHistory={vehicle.maintenanceHistory ?? []}
              lastInspectionDate={vehicle.lastInspectionDate ?? ""}
              nextInspectionDate={vehicle.nextInspectionDate ?? ""}
              price={vehicle.price}
            />

            <div className="mt-6">
              <Button variant="primary" className="w-full text-lg">
                <a href="#contact-form">Contact about this vehicle</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="mb-16">
          <SectionTitle
            title="Interested in this vehicle?"
            subtitle="Fill out the form and we will get in touch with you shortly"
          />
          <div className="max-w-2xl mx-auto">
            <ContactForm
            vehicleId={vehicle._id}
            vehicleTitle={`${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.year}`}
            subject={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          />
          </div>
        </div>

        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div>
            <SectionTitle
              title="Similar Vehicles"
              subtitle="You might be interested in these vehicles"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarVehicles.map((similar) => (
                <VehicleCard
                  key={similar._id}
                  id={similar._id}
                  imageUrl={similar.images && similar.images[0]?.url}
                  brand={similar.brand}
                  model={similar.model}
                  version={similar.version}
                  year={similar.year}
                  price={similar.price}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetailPage;
