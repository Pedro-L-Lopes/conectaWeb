"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaExpand, FaBed, FaShower, FaCar, FaHeart } from "react-icons/fa";
import { formatCurrency } from "../../utils/formats/formatCurrency";
import { PropertyType } from "@/@types/PropertyType";
import defaultImage from "../../images/defaultImage.png";

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/property/${property.id}`);
  };

  // Converte photos de string JSON para array
  const photosArray =
    typeof property.photos === "string"
      ? JSON.parse(property.photos)
      : property.photos;

  // Verifica se há fotos e se a primeira foto é uma URL válida
  const imageUrl =
    photosArray && photosArray.length > 0 && photosArray[0].startsWith("http")
      ? photosArray[0]
      : defaultImage;

  return (
    <div
      onClick={handlePress}
      className="rounded-lg overflow-hidden hover:shadow-md cursor-pointer shadow transition-shadow duration-300 mx-auto p-1 "
    >
      {/* Imagem do imóvel */}
      <div className="w-full h-80 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative">
        {photosArray && photosArray.length > 0 ? (
          <div className="h-full">
            <Image
              src={imageUrl}
              alt="Imagem do imóvel"
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-500">Sem imagem disponível</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        {/* Título do imóvel */}
        <h2 className="text-gray-900 text-xl font-semibold leading-tight max-h-10 overflow-hidden text-ellipsis truncate">
          {/* <h2 className="text-gray-900 text-sm font-semibold leading-tight h-20 sm:h-12 md:h-14 lg:h-16 overflow-hidden text-ellipsis whitespace-nowrap"> */}
          {/* {property.type?.toUpperCase() || "N/A"} |{" "}
          {property.purpose?.toUpperCase() || "N/A"} |{" "}
          {property.address.neighborhood?.toUpperCase() || "N/A"},{" "}
          {property.address.city?.toUpperCase() || "N/A"}-
          {property.address.state?.toUpperCase() || "N/A"} */}
          {property.title}
        </h2>

        {/* Preço do imóvel */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {formatCurrency(property.price ? property.price : 0) || "N/A"}
        </p>

        {/* Detalhes do imóvel */}
        <div className="flex flex-wrap items-center gap-3 text-gray-500 text-xs sm:text-sm md:text-base h-10 sm:h-12 md:h-14 lg:h-16 overflow-hidden border-t border-blue-100">
          {property.area && (
            <div className="flex items-center gap-1">
              <FaExpand size={16} className="w-4 h-4 md:w-5 md:h-5" />
              <span>
                {property.area} {property.areaUnit || "m²"}
              </span>
            </div>
          )}
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <FaBed size={16} className="w-4 h-4 md:w-5 md:h-5" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <FaShower size={16} className="w-4 h-4 md:w-5 md:h-5" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.parkingSpaces && (
            <div className="flex items-center gap-1">
              <FaCar size={16} className="w-4 h-4 md:w-5 md:h-5" />
              <span>{property.parkingSpaces}</span>
            </div>
          )}
        </div>
      </div>

      {/* Botão de favorito */}
      {/* <button className="absolute right-3 top-3 text-black">
        <FaHeart size={20} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </button> */}
    </div>
  );
};

export default PropertyCard;
