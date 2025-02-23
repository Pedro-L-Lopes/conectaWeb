"use client";

import { PropertyType } from "@/@types/PropertyType";
import PropertyCard from "@/components/property/PropertyCard";
import TabBar from "@/components/TabBar";
import { getFavoriteProperties } from "@/pages/api/property/GetFavoriteProperties";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (filters: any) => {
    setLoading(true);
    setError(null);

    const favorites = localStorage.getItem("favoriteProperties");

    try {
      // Define os parâmetros de busca
      const searchParams = {
        city: filters.city || "",
        neighborhood: filters.neighborhood || "",
        bedrooms: filters.bedrooms || "",
        parkingSpaces: filters.parkingSpaces || "",
        minPrice: filters.minPrice || "",
        maxPrice: filters.maxPrice || "",
        minArea: filters.minArea || "",
        maxArea: filters.maxArea || "",
        type: filters.type || "",
        purpose: filters.purpose || "",
        orderBy: filters.orderBy || "createdAt", // Ordenação padrão por data de criação
        sortDirection: filters.sortDirection || "asc", // Direção padrão ascendente
        pageNumber: filters.pageNumber || "1", // Página padrão 1
        pageSize: filters.pageSize || "10", // Tamanho da página padrão 10
      };

      // Faz a chamada à API com os parâmetros de busca
      if (favorites && favorites.length > 0) {
        const data = await getFavoriteProperties(
          searchParams,
          JSON.parse(favorites)
        );

        // Atualiza a lista de imóveis com os resultados da busca
        setProperties(data.items);
      }
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
      setError("Erro ao carregar os imóveis. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Busca inicial ao carregar a página (sem filtros)
    handleSearch({
      city: "",
      neighborhood: "",
      bedrooms: "",
      parkingSpaces: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      type: "",
      purpose: "",
      orderBy: "createdAt",
      sortDirection: "desc",
      pageNumber: "1",
      pageSize: "10",
    });
  }, []);

  return (
    <div className="mt-10">
      <div className="mb-20 md:grid md:grid-cols-4 justify-center md:gap-2">
        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : error ? (
          <p className="text-center">{error}</p>
        ) : properties && properties.length > 0 ? (
          properties.map((property: PropertyType) => (
            <div className="" key={property.id}>
              <PropertyCard key={property.id} property={property} />
            </div>
          ))
        ) : (
          <div className="mt-52 text-center h-full">
            <p className=" text-gray-500">
              Sem imóveis favoritos <br />
            </p>
            <button className="p-2 bg-blue-500 text-white rounded-full">
              <Link href="/">clique aqui para adicionar</Link>
            </button>
          </div>
        )}
      </div>{" "}
      <footer>
        <TabBar />
      </footer>
    </div>
  );
}
