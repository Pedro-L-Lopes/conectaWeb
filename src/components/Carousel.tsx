"use client";

import { useState } from "react";
import Image from "next/image";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Carouselprops = {
  images: string[];
};

const Carousel = ({ images }: Carouselprops) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative mt-4">
      {/* Container principal */}
      <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
        {images.map((imageUrl: any, index: number) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={imageUrl}
              alt={`Imagem do imóvel ${index + 1}`}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <FaChevronRight />
      </button>

      {/* Indicadores */}
      <div className="flex justify-center mt-2">
        {images.map((_: any, index: number) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full mx-1 cursor-pointer transition-colors ${
              index === current ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
