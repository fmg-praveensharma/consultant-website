import React from "react";
import PriceList from "@/components/settings/price-card-list";

const Price = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Price List</h2>
      <PriceList />
    </div>
  );
};

export default Price;
