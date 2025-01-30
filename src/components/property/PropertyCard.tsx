"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaExpand, FaBed, FaShower, FaCar, FaHeart } from "react-icons/fa";
import { formatCurrency } from "../../utils/formats/formatCurrency";
import { PropertyType } from "@/@types/PropertyType";

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/detalhes/${property.id}`);
  };

  return (
    <div
      onClick={handlePress}
      className="relative rounded-lg mx-4 my-2 overflow-hidden hover:shadow-sm cursor-pointer"
    >
      {/* Imagem do imóvel */}
      <div className="w-full h-72 relative">
        <Image
          src={property.fotos?.[0] || ""}
          alt="Imagem do imóvel"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-gray-900 text-lg font-semibold">
          {property.tipo?.toUpperCase() || "N/A"} |
          {property.finalidade?.toUpperCase() || "N/A"} |
          {property.endereco?.bairro?.toUpperCase() || "N/A"},
          {property.endereco?.cidade?.toUpperCase() || "N/A"}-
          {property.endereco?.estado?.toUpperCase() || "N/A"}
        </h2>

        <div className="flex items-center mt-2 gap-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <FaExpand size={16} />
            <span>{property.area || "N/A"}m²</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBed size={16} />
            <span>{property.quartos || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaShower size={16} />
            <span>{property.banheiros || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCar size={16} />
            <span>{property.vagas || "N/A"}</span>
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-800 mt-3">
          {formatCurrency(property.preco ? property.preco : 0) || "N/A"}
        </p>
      </div>

      <button className="absolute right-3 top-3 text-black">
        <FaHeart size={24} />
      </button>
    </div>
  );
};

export default PropertyCard;
