import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleImage {
  id: string;
  url: string;
  alt: string;
}

interface VehicleGalleryProps {
  images: VehicleImage[];
}

const VehicleGallery: React.FC<VehicleGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className="rounded-lg bg-gray-700 h-80 flex items-center justify-center">
        <p className="text-gray-300">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      {/* Contenedor de la imagen principal */}
      <div className="w-full md:w-auto relative">
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="w-full h-auto object-cover block"
        />
        {/* Flecha anterior */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors focus:outline-none"
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {/* Flecha siguiente */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors focus:outline-none"
          onClick={goToNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Miniaturas debajo */}
      <div className="flex overflow-x-auto space-x-2 p-2 bg-gray-900 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => goToImage(idx)}
            className={`flex-shrink-0 focus:outline-none ${
              idx === currentIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
            }`}
            aria-label={`View image ${idx + 1}`}
          >
            <img
              src={img.url}
              alt={`Thumbnail ${idx + 1}`}
              className="h-16 w-24 object-cover rounded"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleGallery;
