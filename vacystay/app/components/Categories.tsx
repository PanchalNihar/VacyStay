"use client";

import { useState } from "react";
import Image from "next/image";
import useSearchModal, { SearchQuery } from "../hooks/useSearchModal";

const Categories = () => {
  const searchModal = useSearchModal();
  const [category, setCategory] = useState("");

  const _setCategory = (categoryKey: string) => {
    setCategory(categoryKey);

    const query: SearchQuery = {
      country: searchModal.query.country,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      guests: searchModal.query.guests,
      bedrooms: searchModal.query.bedrooms,
      bathrooms: searchModal.query.bathrooms,
      category: categoryKey,
    };
    console.log("Query being sent: ", query);
    searchModal.setQuery(query);
  };

  return (
    <div className="flex flex-wrap justify-around py-4 bg-gray-100 rounded-lg shadow-lg">
      {[
        { name: "All", category: "", icon: "/farm.png" },
        { name: "Beach", category: "beach", icon: "/beach.png" },
        { name: "Golfing", category: "golfing", icon: "/golf.png" },
        { name: "Cabins", category: "cabins", icon: "/cabin.png" },
        { name: "Farm", category: "farm", icon: "/farm.png" },
        { name: "Lake", category: "lakeView", icon: "/lake.png" },
        { name: "Pool", category: "pool", icon: "/pool.png" },
        { name: "Houseboat", category: "houseboat", icon: "/houseboat.png" },
        { name: "Barn", category: "barn", icon: "/barn.png" },
        { name: "Island", category: "island", icon: "/island.png" },
        { name: "Desert", category: "desert", icon: "/desert.png" },
        { name: "Cave", category: "cave", icon: "/cave.png" },
        { name: "Tropical", category: "tropical", icon: "/tropical.png" },
      ].map(({ name, category: categoryKey, icon }) => (
        <div
          key={categoryKey}
          onClick={() => _setCategory(categoryKey)}
          className={`flex flex-col items-center space-y-2 cursor-pointer transition-all duration-300 
            p-4 rounded-lg 
            ${category === categoryKey ? "bg-airbnb text-white" : "bg-white text-gray-700"}
            shadow-md hover:shadow-lg 
            transform hover:scale-105`}
        >
          <Image src={icon} alt={`Category - ${name}`} width={30} height={30} />
          <span className="text-sm font-semibold">{name}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
