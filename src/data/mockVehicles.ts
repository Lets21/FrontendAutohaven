export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  fuel: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Manual' | 'Automatic';
  power: number;
  interiorCondition: string;
  exteriorCondition: string;
  damageHistory: string;
  maintenanceHistory: string[];
  lastInspectionDate: string;
  nextInspectionDate: string;
  price: number;
  images: {
    id: string;
    url: string;
    alt: string;
  }[];
  featured?: boolean;
}

// Mock vehicles data
export const vehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'BMW',
    model: '3 Series',
    version: '320d xDrive',
    year: 2020,
    mileage: 45000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    power: 190,
    interiorCondition: 'Excellent',
    exteriorCondition: 'Very Good',
    damageHistory: 'No reported damage',
    maintenanceHistory: [
      'Oil and filter change - 03/15/2022',
      'Full inspection - 09/10/2023'
    ],
    lastInspectionDate: '09/10/2023',
    nextInspectionDate: '09/10/2025',
    price: 32500,
    images: [
      {
        id: '1-1',
        url: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
        alt: 'BMW 3 Series front'
      },
      {
        id: '1-2',
        url: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg',
        alt: 'BMW 3 Series side'
      },
      {
        id: '1-3',
        url: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg',
        alt: 'BMW 3 Series interior'
      },
      {
        id: '1-4',
        url: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg',
        alt: 'BMW 3 Series rear'
      }
    ],
    featured: true
  },
  {
    id: '2',
    brand: 'Audi',
    model: 'A4',
    version: '2.0 TDI S-Line',
    year: 2019,
    mileage: 62000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    power: 150,
    interiorCondition: 'Very Good',
    exteriorCondition: 'Good',
    damageHistory: 'Small repaired dent on right rear door',
    maintenanceHistory: [
      'Oil and filter change - 06/05/2021',
      'Brake discs and pads change - 12/12/2022',
      'Full inspection - 03/18/2023'
    ],
    lastInspectionDate: '03/18/2023',
    nextInspectionDate: '03/18/2025',
    price: 28900,
    images: [
      {
        id: '2-1',
        url: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg',
        alt: 'Audi A4 front'
      },
      {
        id: '2-2',
        url: 'https://images.pexels.com/photos/1104768/pexels-photo-1104768.jpeg',
        alt: 'Audi A4 side'
      },
      {
        id: '2-3',
        url: 'https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg',
        alt: 'Audi A4 interior'
      },
      {
        id: '2-4',
        url: 'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg',
        alt: 'Audi A4 rear'
      }
    ]
  },
  {
    id: '3',
    brand: 'Toyota',
    model: 'Corolla',
    version: '1.8 Hybrid Advance',
    year: 2021,
    mileage: 28000,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    power: 122,
    interiorCondition: 'Excellent',
    exteriorCondition: 'Excellent',
    damageHistory: 'No reported damage',
    maintenanceHistory: [
      'Official Toyota service - 10/10/2022',
      'Oil and filter change - 04/15/2023'
    ],
    lastInspectionDate: '04/15/2023',
    nextInspectionDate: '04/15/2025',
    price: 25500,
    images: [
      {
        id: '3-1',
        url: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg',
        alt: 'Toyota Corolla front'
      },
      {
        id: '3-2',
        url: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
        alt: 'Toyota Corolla side'
      },
      {
        id: '3-3',
        url: 'https://images.pexels.com/photos/164654/pexels-photo-164654.jpeg',
        alt: 'Toyota Corolla interior'
      },
      {
        id: '3-4',
        url: 'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg',
        alt: 'Toyota Corolla rear'
      }
    ],
    featured: true
  },
  {
    id: '4',
    brand: 'Volkswagen',
    model: 'Golf',
    version: '1.5 TSI Evo Sport',
    year: 2020,
    mileage: 35000,
    fuel: 'Gasoline',
    transmission: 'Manual',
    power: 130,
    interiorCondition: 'Very Good',
    exteriorCondition: 'Good',
    damageHistory: 'Small scratches on front bumper',
    maintenanceHistory: [
      'Oil and filter change - 06/18/2021',
      'Tire change - 02/05/2022',
      'Full inspection - 07/20/2023'
    ],
    lastInspectionDate: '07/20/2023',
    nextInspectionDate: '07/20/2025',
    price: 22800,
    images: [
      {
        id: '4-1',
        url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
        alt: 'Volkswagen Golf front'
      },
      {
        id: '4-2',
        url: 'https://images.pexels.com/photos/1231643/pexels-photo-1231643.jpeg',
        alt: 'Volkswagen Golf side'
      },
      {
        id: '4-3',
        url: 'https://images.pexels.com/photos/248687/pexels-photo-248687.jpeg',
        alt: 'Volkswagen Golf interior'
      },
      {
        id: '4-4',
        url: 'https://images.pexels.com/photos/175709/pexels-photo-175709.jpeg',
        alt: 'Volkswagen Golf rear'
      }
    ]
  },
  {
    id: '5',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    version: 'C220d AMG Line',
    year: 2019,
    mileage: 55000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    power: 194,
    interiorCondition: 'Excellent',
    exteriorCondition: 'Very Good',
    damageHistory: 'No reported damage',
    maintenanceHistory: [
      'Official Mercedes service - 12/12/2021',
      'Oil and filter change - 08/08/2022',
      'Full inspection - 01/25/2023'
    ],
    lastInspectionDate: '01/25/2023',
    nextInspectionDate: '01/25/2025',
    price: 35900,
    images: [
      {
        id: '5-1',
        url: 'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg',
        alt: 'Mercedes-Benz C-Class front'
      },
      {
        id: '5-2',
        url: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg',
        alt: 'Mercedes-Benz C-Class side'
      },
      {
        id: '5-3',
        url: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
        alt: 'Mercedes-Benz C-Class interior'
      },
      {
        id: '5-4',
        url: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
        alt: 'Mercedes-Benz C-Class rear'
      }
    ],
    featured: true
  },
];

// Filter options
export const filterOptions = {
  brands: ['Audi', 'BMW', 'Mercedes-Benz', 'Toyota', 'Tesla', 'Volkswagen'],
  yearRange: [2018, 2023] as [number, number],
  fuelTypes: ['Gasoline', 'Diesel', 'Hybrid', 'Electric'],
  transmissionTypes: ['Manual', 'Automatic'],
  priceRange: [15000, 50000] as [number, number],
};

// Get featured vehicles
export const getFeaturedVehicles = () => {
  return vehicles.filter(vehicle => vehicle.featured);
};

// Get similar vehicles (exclude current vehicle)
export const getSimilarVehicles = (currentVehicleId: string, limit = 3) => {
  const currentVehicle = vehicles.find(v => v.id === currentVehicleId);
  if (!currentVehicle) return [];
  
  return vehicles
    .filter(v => v.id !== currentVehicleId && 
                (v.brand === currentVehicle.brand || 
                 v.fuel === currentVehicle.fuel))
    .slice(0, limit);
};

// Apply filters
export const getFilteredVehicles = (filters: any) => {
  return vehicles.filter(vehicle => {
    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(vehicle.brand)) {
      return false;
    }
    
    // Year filter
    if (vehicle.year < filters.yearRange[0] || vehicle.year > filters.yearRange[1]) {
      return false;
    }
    
    // Fuel filter
    if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(vehicle.fuel)) {
      return false;
    }
    
    // Transmission filter
    if (filters.transmission.length > 0 && !filters.transmission.includes(vehicle.transmission)) {
      return false;
    }
    
    // Price filter
    if (vehicle.price < filters.priceRange[0] || vehicle.price > filters.priceRange[1]) {
      return false;
    }
    
    return true;
  });
};
