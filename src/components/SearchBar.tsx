"use client";

import React, { useState, useEffect } from "react";
import { BiArrowBack, BiSearch, BiX } from "react-icons/bi";
import { BsSliders, BsChevronDown, BsChevronUp } from "react-icons/bs";
import * as Dialog from "@radix-ui/react-dialog";

interface Filters {
  city: string;
  neighborhood: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  parkingSpaces: string;
  minArea: string;
  maxArea: string;
  type: string;
  purpose: string;
  orderBy: string;
  sortDirection: string;
}

interface SearchBarProps {
  onSearch: (filters: Filters) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filters, setFilters] = useState<Filters>({
    city: "",
    neighborhood: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    parkingSpaces: "",
    minArea: "",
    maxArea: "",
    type: "",
    purpose: "",
    orderBy: "createdAt",
    sortDirection: "asc",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&addressdetails=1&limit=5`
        );
        const data = await response.json();
        const formattedSuggestions = data.map((item: any) => {
          const neighborhood =
            item.address.suburb || item.address.neighbourhood || "";
          const city = item.address.municipality || "";
          const state = item.address.state || "";
          return `${neighborhood ? neighborhood + ", " : ""}${city}, ${state}`;
        });

        setSuggestions(formattedSuggestions);
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleApplyFilters = () => {
    onSearch(filters);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const [neighborhoodOrCity, cityOrState, state] = suggestion.split(", ");
    setSearchQuery(suggestion);
    setFilters({
      ...filters,
      neighborhood: state ? neighborhoodOrCity : "",
      city: state ? cityOrState : neighborhoodOrCity,
    });
    setSelectedLocation(suggestion);
    setSuggestions([]);
  };

  const handleCleaningFilters = () => {
    setFilters({
      city: "",
      neighborhood: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      parkingSpaces: "",
      minArea: "",
      maxArea: "",
      type: "",
      purpose: "",
      orderBy: "createdAt",
      sortDirection: "asc",
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="flex items-center bg-white rounded-full shadow-sm p-2 w-full max-w-md cursor-pointer hover:shadow-md transition-shadow">
          <BiSearch className="text-gray-500 text-xl ml-2" />
          <input
            type="text"
            placeholder="Pesquisa e filtros"
            value={searchQuery}
            readOnly
            className="flex-1 px-4 py-2 outline-none cursor-pointer"
          />
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <BsSliders className="text-gray-500 text-xl" />
          </button>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 bg-white p-6 overflow-y-auto">
          <div className="flex items-center gap-2">
            <Dialog.Close asChild>
              <button className="flex justify-center items-center w-10 h-10 mb-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <BiArrowBack size={25} />
              </button>
            </Dialog.Close>
            <Dialog.Title className="text-xl font-bold mb-4">
              Pesquisar e Filtrar
            </Dialog.Title>
          </div>

          <div className="mb-6 relative">
            <div className="flex items-center bg-gray-100 rounded-lg p-2">
              <BiSearch className="text-gray-500 text-xl ml-2" />
              <input
                type="text"
                placeholder="Pesquise por cidade e bairro"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 outline-none bg-transparent"
                autoFocus
              />
              <BiX
                size={22}
                className="text-gray-500 text-xl ml-2 hover:scale-110 cursor-pointer"
                onClick={(e) => setSearchQuery("")}
              />
            </div>

            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg w-full mt-1 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Botão para alternar a visibilidade dos filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4 hover:text-gray-900"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
            {showFilters ? (
              <BsChevronUp className="text-gray-500" />
            ) : (
              <BsChevronDown className="text-gray-500" />
            )}
          </button>

          {/* Seção de Filtros*/}
          {/* Seção de Filtros*/}
          {showFilters && (
            <div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Faixa de Preço
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Preço Mínimo"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Preço Máximo"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Número de Quartos
                </label>
                <input
                  type="number"
                  placeholder="Quantidade de Quartos"
                  value={filters.bedrooms}
                  onChange={(e) =>
                    setFilters({ ...filters, bedrooms: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Número de Vagas
                </label>
                <input
                  type="number"
                  placeholder="Quantidade de Vagas"
                  value={filters.parkingSpaces}
                  onChange={(e) =>
                    setFilters({ ...filters, parkingSpaces: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Área (m²)
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Área Mínima"
                    value={filters.minArea}
                    onChange={(e) =>
                      setFilters({ ...filters, minArea: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Área Máxima"
                    value={filters.maxArea}
                    onChange={(e) =>
                      setFilters({ ...filters, maxArea: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Selecione o Tipo</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Terreno">Terreno</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Finalidade
                </label>
                <select
                  value={filters.purpose}
                  onChange={(e) =>
                    setFilters({ ...filters, purpose: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Selecione a Finalidade</option>
                  <option value="Venda">Venda</option>
                  <option value="Aluguel">Aluguel</option>
                </select>
              </div>
            </div>
          )}

          <footer className="flex items-center justify-between">
            <div className="mt-6 flex justify-end gap-4">
              <Dialog.Close asChild>
                <button
                  onClick={handleCleaningFilters}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Limpar Filtros
                </button>
              </Dialog.Close>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Dialog.Close asChild>
                <button
                  onClick={handleApplyFilters}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Aplicar Filtros
                </button>
              </Dialog.Close>
            </div>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SearchBar;
