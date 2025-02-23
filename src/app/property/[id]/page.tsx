"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaBed, FaShower, FaCar, FaExpand, FaHeart } from "react-icons/fa";
import { BsInfo } from "react-icons/bs";
import { formatCurrency } from "../../../utils/formats/formatCurrency";
import { PropertyType } from "@/@types/PropertyType";
import { getPropertyByID } from "../../../pages/api/property/getPropertyById";
import { LuMapPin } from "react-icons/lu";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Carousel from "@/components/Carousel";

const PropertyDetail = () => {
  const params = useParams();
  const id = params?.id as string;
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const data = await getPropertyByID(id);
          setProperty(data);
        } catch (error) {
          setError("Erro ao carregar os detalhes do imóvel.");
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteProperties");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  const handleSaveToFavorites = (propertyId: string) => {
    let updatedFavorites = [...favorites];
    if (!favorites.includes(propertyId)) {
      updatedFavorites.push(propertyId);
    } else {
      updatedFavorites = updatedFavorites.filter((id) => id !== propertyId);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem(
      "favoriteProperties",
      JSON.stringify(updatedFavorites)
    );
  };

  if (loading) return <div className="p-4">Carregando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!property) return <div className="p-4">Imóvel não encontrado.</div>;

  const photos = property.photos ? JSON.parse(property.photos) : [];
  const imageUrl =
    photos.length > 0 && photos[0].startsWith("http")
      ? photos[0]
      : "/defaultImage.png";

  return (
    <div className="md:flex lg:flex flex-col justify-center items-center p-4 max-w-4xl mx-auto mt-5">
      <section className="bg-gray-100 md:w-4/5 lg:md:w-4/5 rounded-md p-2">
        <h1 className="text-lg sm:text-lg font-bold text-gray-700">
          {property.purpose == "Venda"
            ? `${property.type} à venda`
            : `${property.type} para aluguel`}
          , {property.address.neighborhood || ""}, {property.address.city || ""}
          -{property.address.state || ""}{" "}
          {property.address.zipCode ? `, CEP: ${property.address.zipCode}` : ""}
        </h1>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-800 mt-3 md:w-4/5 lg:md:w-4/5">
              {formatCurrency(property.price)}
            </p>
            <p className="text-sm font-semibold text-gray-800">
              {property.purpose}
            </p>
          </div>
          <div className="text-[70%] text-gray-800 mt-5">
            <div className="flex items-center">
              <LuMapPin size={18} className="w-5" />
              {property.address.neighborhood || ""},{" "}
              {property.address.city || ""}-{property.address.state || ""}
            </div>
            <div className="flex items-center">
              <BsInfo size={22} className="w-5" />
              Condomínio:{" "}
              {formatCurrency(property.condoFee ? property.condoFee : 0)}
            </div>
          </div>
        </div>

        <div className="relative mt-4 h-64 sm:h-80 md:h-96">
          <Carousel images={photos} />
          <button
            onClick={() => handleSaveToFavorites(property.id)}
            className="absolute top-2 right-2 p-2 rounded-full hover:scale-110 transition"
          >
            <FaHeart
              size={20}
              className={`${
                favorites.includes(property.id)
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </section>

      <div className="mt-5 mb-4 md:w-4/5 lg:md:w-4/5 p-1 rounded-md bg-gray-100">
        <h1 className="text-gray-800 text-lg mt-2">Especificações</h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-700 text-sm sm:text-base">
          {property.area && (
            <div className="flex items-center gap-1">
              <FaExpand size={16} />
              <span>
                {property.area} {property.areaUnit || "m²"}
              </span>
            </div>
          )}
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <FaBed size={16} />
              <span>{property.bedrooms} quartos</span>
            </div>
          )}
          {property.suites && (
            <div className="flex items-center gap-1">
              <FaBed size={16} />
              <span>{property.suites} suítes</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <FaShower size={16} />
              <span>{property.bathrooms} banheiros</span>
            </div>
          )}
          {property.parkingSpaces && (
            <div className="flex items-center gap-1">
              <FaCar size={16} />
              <span>{property.parkingSpaces} vagas</span>
            </div>
          )}
        </div>
        <h1 className="text-gray-800 text-lg mt-4">Descrição</h1>
        <p className=" text-gray-700">{property.description}</p>
      </div>
    </div>
  );
};

export default PropertyDetail;
