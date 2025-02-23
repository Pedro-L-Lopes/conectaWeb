"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/components/property/PropertyCard";
import SearchBar from "@/components/SearchBar";
import TabBar from "@/components/TabBar";
import { PropertyType } from "@/@types/PropertyType";
import { getAvailableProperties } from "../pages/api/property/GetAvailableProperties";

export default function Home() {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (filters: any) => {
    setLoading(true);
    setError(null);

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
      const data = await getAvailableProperties(searchParams);

      // Atualiza a lista de imóveis com os resultados da busca
      setProperties(data.items);
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
    <div>
      <section className="p-2">
        <SearchBar onSearch={handleSearch} />
      </section>

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
          <p className="text-center text-gray-500">Nenhum imóvel encontrado</p>
        )}
      </div>

      <footer>
        <TabBar />
      </footer>
    </div>
  );
}
