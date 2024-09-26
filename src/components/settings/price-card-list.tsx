// components/PriceList.tsx
"use client";

import React, { useState, useEffect } from "react";
import PriceCard from "./price-card";
 
import { useGetConsultantDetailQuery } from "@/store/services";

interface Price {
  feature: string;
  current_price: string;
  discount_price: number;
  commission: string;
  your_share: any;
}

const PriceList: React.FC = () => {
  const [data, setData] = useState<Price[]>([]);

  const {
    data: fetchData,
    isLoading,
    refetch,
    isFetching,
  } = useGetConsultantDetailQuery({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    console.log("foiorst data", fetchData?.data?.price_list);
    if (fetchData) {
      const response = fetchData?.data?.price_list || [];

      setData(response);
    }
  }, [fetchData]);

  // Mapping for status numbers to letters
  const statusMapping: Record<number, string> = {
    1: "Pending",
    2: "Confirmed",
    3: "Canceled",
    4: "Rejected",
    5: "Price Changed",
    6: "Approved",
  };

  const serviceType: Record<any, string> = {
    1: "Chat",
    2: "Audio Call",
    3: "Video Call",
    4: "Anonymous Call",
    5: "Private Call",
  };

  return (
    <div className="bg-gray-100 ">
      <div className="rounded-lg">
        {isLoading || isFetching ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          data.map((price, index) => (
            <PriceCard
              key={index}
              serviceType={serviceType[price?.feature] || "Unknown"}
              currentPrice={price?.current_price || "N/A"}
              discountPrice={price?.discount_price || 0}
              flute_share={price?.commission || "N/A"}
              your_share={100 - price?.commission || "N/A"}
            />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default PriceList;
