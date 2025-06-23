import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../ui/Button';

interface FilterOptions {
  brands: string[];
  yearRange: [number, number];
  fuelTypes: string[];
  transmissionTypes: string[];
  priceRange: [number, number];
}

interface VehicleFiltersProps {
  options: FilterOptions;
  onApplyFilters: (filters: any) => void;
}

const VehicleFilters: React.FC<VehicleFiltersProps> = ({ options, onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedYearRange, setSelectedYearRange] = useState<[number, number]>(options.yearRange);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>(options.priceRange);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleFuelTypeChange = (fuelType: string) => {
    if (selectedFuelTypes.includes(fuelType)) {
      setSelectedFuelTypes(selectedFuelTypes.filter(t => t !== fuelType));
    } else {
      setSelectedFuelTypes([...selectedFuelTypes, fuelType]);
    }
  };

  const handleTransmissionChange = (transmission: string) => {
    if (selectedTransmission.includes(transmission)) {
      setSelectedTransmission(selectedTransmission.filter(t => t !== transmission));
    } else {
      setSelectedTransmission([...selectedTransmission, transmission]);
    }
  };

  const handleYearMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSelectedYearRange([value, selectedYearRange[1]]);
  };

  const handleYearMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSelectedYearRange([selectedYearRange[0], value]);
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSelectedPriceRange([value, selectedPriceRange[1]]);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSelectedPriceRange([selectedPriceRange[0], value]);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      brands: selectedBrands,
      yearRange: selectedYearRange,
      fuelTypes: selectedFuelTypes,
      transmission: selectedTransmission,
      priceRange: selectedPriceRange,
    });
    
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedYearRange(options.yearRange);
    setSelectedFuelTypes([]);
    setSelectedTransmission([]);
    setSelectedPriceRange(options.priceRange);
    
    onApplyFilters({
      brands: [],
      yearRange: options.yearRange,
      fuelTypes: [],
      transmission: [],
      priceRange: options.priceRange,
    });
  };

  return (
    <div className="relative mb-8">
      {/* Mobile filter toggle */}
      <div className="md:hidden">
        <button
          onClick={toggleFilter}
          className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          <Filter className="h-5 w-5" />
          <span>Filtre</span>
        </button>
      </div>

      {/* Filters panel */}
      <div 
        className={`
          ${isOpen ? 'fixed inset-0 z-50 bg-gray-900 overflow-y-auto p-4' : 'hidden'} 
          md:block md:static md:bg-transparent md:p-0 md:z-auto
        `}
      >
        {/* Mobile header */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-xl font-semibold text-white">Filtre</h2>
          <button onClick={toggleFilter} className="text-gray-300 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          {/* Brands */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Merke</h3>
            <div className="space-y-2">
              {options.brands.map(brand => (
                <label key={brand} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-white focus:ring-gray-500"
                  />
                  <span className="text-gray-300">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Year Range */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Årsmodell</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Fra</label>
                <input
                  type="number"
                  min={options.yearRange[0]}
                  max={options.yearRange[1]}
                  value={selectedYearRange[0]}
                  onChange={handleYearMinChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Til</label>
                <input
                  type="number"
                  min={options.yearRange[0]}
                  max={options.yearRange[1]}
                  value={selectedYearRange[1]}
                  onChange={handleYearMaxChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
            </div>
          </div>

          {/* Fuel Type */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Drivstoff</h3>
            <div className="space-y-2">
              {options.fuelTypes.map(fuel => (
                <label key={fuel} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedFuelTypes.includes(fuel)}
                    onChange={() => handleFuelTypeChange(fuel)}
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-white focus:ring-gray-500"
                  />
                  <span className="text-gray-300">{fuel}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Girkasse</h3>
            <div className="space-y-2">
              {options.transmissionTypes.map(trans => (
                <label key={trans} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTransmission.includes(trans)}
                    onChange={() => handleTransmissionChange(trans)}
                    className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-white focus:ring-gray-500"
                  />
                  <span className="text-gray-300">{trans}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Pris</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Min</label>
                <input
                  type="number"
                  min={options.priceRange[0]}
                  max={options.priceRange[1]}
                  step={1000}
                  value={selectedPriceRange[0]}
                  onChange={handlePriceMinChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Maks</label>
                <input
                  type="number"
                  min={options.priceRange[0]}
                  max={options.priceRange[1]}
                  step={1000}
                  value={selectedPriceRange[1]}
                  onChange={handlePriceMaxChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Button onClick={handleApplyFilters} variant="primary" className="w-full">
              Bruk Filtre
            </Button>
            <Button onClick={handleResetFilters} variant="secondary" className="w-full">
              Tilbakestill Filtre
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilters;
