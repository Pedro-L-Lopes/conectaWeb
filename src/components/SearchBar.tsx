"use client";

import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { BsSliders } from "react-icons/bs";

interface Address {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    city?: string;
    town?: string;
    suburb?: string;
    postcode?: string;
  };
}

interface FormattedAddress {
  city: string;
  postcode: string;
}

interface SearchBarProps {
  onAddressSelect: (address: FormattedAddress) => void; // Agora aceita o formato correto
}

const SearchBar: React.FC<SearchBarProps> = ({ onAddressSelect }) => {
  const [query, setQuery] = useState<string>(""); // Estado da pesquisa
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Address[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para controlar a visibilidade do dropdown

  // Função para remover acentos e converter para minúsculas
  const removeAccentsAndLowercase = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  // Função debounce para evitar chamadas excessivas à API
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query) {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/location?query=${encodeURIComponent(query)}`
          );
          if (!response.ok) {
            throw new Error("Erro ao buscar endereço");
          }
          const data = await response.json();
          setResults(data); // Atualiza os resultados
          setIsOpen(true); // Abre o dropdown com os resultados
        } catch (error) {
          console.error("Erro ao buscar endereço:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]); // Limpa os resultados se a query estiver vazia
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelectAddress = (address: Address) => {
    if (onAddressSelect && typeof onAddressSelect === "function") {
      const cityName =
        address.address.city ||
        address.address.town ||
        address.address.suburb ||
        "";

      const formattedAddress: FormattedAddress = {
        city: cityName ? removeAccentsAndLowercase(cityName) : "",
        postcode: address.address.postcode
          ? removeAccentsAndLowercase(address.address.postcode)
          : "",
      };

      onAddressSelect(formattedAddress);
      setQuery(`${formattedAddress.city} - ${formattedAddress.postcode}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center justify-between bg-white rounded-full shadow-md p-3">
        <div className="flex items-center gap-2 w-full">
          <BiSearch className="text-gray-500 ml-2" size={25} />
          <input
            type="text"
            placeholder="Digite a localização desejada"
            className="w-full text-sm py-2 text-gray-700 placeholder-gray-500 bg-transparent outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mx-2 border rounded-full p-1">
          <BsSliders className="text-gray-500" size={20} />
        </div>
      </div>

      {/* Exibe os resultados da pesquisa */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-50">
          {loading ? (
            <p className="text-sm text-gray-500 p-3">Carregando...</p>
          ) : (
            results.map((result, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                onClick={() => handleSelectAddress(result)}
              >
                <p className="text-sm text-gray-700">
                  {result.address.city ||
                    result.address.town ||
                    result.address.suburb}{" "}
                  {result.address.postcode && `- ${result.address.postcode}`}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
