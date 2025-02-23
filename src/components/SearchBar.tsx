"use client";

import React, { useState } from "react";
import { BiArrowBack, BiSearch } from "react-icons/bi";
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
  const [showFilters, setShowFilters] = useState(false); // Estado para controlar a visibilidade dos filtros

  const handleApplyFilters = () => {
    onSearch(filters);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="flex items-center bg-white rounded-full shadow-sm p-2 w-full max-w-md cursor-pointer hover:shadow-md transition-shadow">
          <BiSearch className="text-gray-500 text-xl ml-2" />
          <input
            type="text"
            placeholder="Pesquisa e filtros"
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

          <div className="mb-6">
            <div className="flex items-center bg-gray-100 rounded-lg p-2">
              <BiSearch className="text-gray-500 text-xl ml-2" />
              <input
                type="text"
                placeholder="Pesquise por cidade"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFilters({ ...filters, city: e.target.value });
                }}
                className="flex-1 px-4 py-2 outline-none bg-transparent"
                autoFocus
              />
            </div>
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SearchBar;
