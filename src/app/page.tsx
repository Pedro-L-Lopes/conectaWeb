"use client";

import PropertyCard from "@/components/property/PropertyCard";
import SearchBar from "@/components/SearchBar";
import TabBar from "@/components/TabBar";

import { PropertyType } from "@/@types/PropertyType";
import { properties } from "@/mockProperties";

export default function Home() {
  const handleAddressSelect = async (address: {
    city: string;
    postcode: string;
  }) => {
    console.log("Endereço formatado:", address);
  };

  return (
    <div>
      <section className="p-2">
        <SearchBar onAddressSelect={handleAddressSelect} />
      </section>

      <main className="mb-20">
        {properties &&
          properties.map((property: PropertyType) => (
            <PropertyCard key={property.area} property={property} />
          ))}
      </main>

      <footer>
        <TabBar />
      </footer>
    </div>
  );
}
