import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface VehicleCardProps {
  id: string;
  imageUrl?: string;
  alt?: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  sold?: boolean; // <-- NUEVO
}

const fallbackImg = "/no-image.png";

const VehicleCard: React.FC<VehicleCardProps> = ({
  id,
  imageUrl,
  alt,
  brand,
  model,
  version,
  year,
  price,
  sold, // <-- NUEVO
}) => {
  return (
    <motion.div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      <Link to={`/vehiculos/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl || fallbackImg}
            alt={alt || `Foto de ${brand} ${model}`}
            className="object-cover w-full h-full"
            tabIndex={-1}
            onError={e => { 
              e.currentTarget.onerror = null; 
              e.currentTarget.src = fallbackImg; 
            }}
            crossOrigin={imageUrl?.startsWith('http') ? "anonymous" : undefined}
          />
          {/* BADGE SOLGT */}
          {sold && (
            <span className="absolute top-3 left-3 bg-amber-500 text-white font-bold px-4 py-1 rounded shadow-lg text-lg z-10">
              Solgt
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-white mb-1">
            {brand} {model}
          </h3>
          <p className="text-sm text-gray-400 mb-3">{version} • {year}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-white">
              NOK {price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 bg-gray-700 py-1 px-2 rounded">
              Detaljer
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VehicleCard;
