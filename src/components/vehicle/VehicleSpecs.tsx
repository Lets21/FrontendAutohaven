import React from 'react';
import { Fuel, Gauge, CalendarDays, RotateCw } from 'lucide-react';

interface VehicleSpecsProps {
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  power: number;
  interiorCondition: string;
  exteriorCondition: string;
  damageHistory: string;
  maintenanceHistory: string[];
  lastInspectionDate: string;
  nextInspectionDate: string;
  price: number;
}

const VehicleSpecs: React.FC<VehicleSpecsProps> = ({
  year,
  mileage,
  fuel,
  transmission,
  power,
  interiorCondition,
  exteriorCondition,
  damageHistory,
  maintenanceHistory,
  lastInspectionDate,
  nextInspectionDate,
  price,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      {/* Price */}
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg text-gray-300 mb-1">Pris</h3>
        <p className="text-3xl font-bold text-white">NOK {price.toLocaleString()}</p>
      </div>

      {/* Key Specs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col items-center p-3 bg-gray-700 rounded-lg">
          <CalendarDays className="h-6 w-6 text-gray-300 mb-2" />
          <span className="text-sm text-gray-400">Årsmodell</span>
          <span className="text-lg font-semibold text-white">{year}</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-gray-700 rounded-lg">
          <Gauge className="h-6 w-6 text-gray-300 mb-2" />
          <span className="text-sm text-gray-400">Kjørelengde</span>
          <span className="text-lg font-semibold text-white">{mileage.toLocaleString()} km</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-gray-700 rounded-lg">
          <Fuel className="h-6 w-6 text-gray-300 mb-2" />
          <span className="text-sm text-gray-400">Drivstoff</span>
          <span className="text-lg font-semibold text-white">{fuel}</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-gray-700 rounded-lg">
          <RotateCw className="h-6 w-6 text-gray-300 mb-2" />
          <span className="text-sm text-gray-400">Girkassen</span>
          <span className="text-lg font-semibold text-white">{transmission}</span>
        </div>
      </div>

      {/* Detailed Specs */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Tekniske Spesifikasjones</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between p-3 bg-gray-700 rounded">
              <span className="text-gray-300">Power</span>
              <span className="text-white font-medium">{power} HP</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-700 rounded">
              <span className="text-gray-300">Interiørtilstand</span>
              <span className="text-white font-medium">{interiorCondition}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-700 rounded">
              <span className="text-gray-300">Eksteriørtilstand</span>
              <span className="text-white font-medium">{exteriorCondition}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-700 rounded">
              <span className="text-gray-300">Sist Godkjent</span>
              <span className="text-white font-medium">{lastInspectionDate}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-700 rounded">
              <span className="text-gray-300">Neste EU-kontroll</span>
              <span className="text-white font-medium">{nextInspectionDate}</span>
            </div>
          </div>
        </div>

        {damageHistory && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Skadehistorikk</h3>
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-300">{damageHistory}</p>
            </div>
          </div>
        )}

        {maintenanceHistory.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Vedlikeholdshistorikk</h3>
            <div className="p-4 bg-gray-700 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {maintenanceHistory.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleSpecs;
