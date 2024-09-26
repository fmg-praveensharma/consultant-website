// components/MainSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import PriceChangeCard from "@/components/settings/price-change-card";
import RequestPriceModal from "@/components/settings/request-price-modal";
import DeleteConfirmationModal from "@/components/settings/delete-confirmation-model";
import { useGetConsultantPriceHistoryQuery } from "@/store/services";
import { useDeleteConsultantPriceListMutation } from "@/store/services";

interface Price {
  id: number;
  feature: number;
  requested_current_price: string;
  requested_discount_price: number;
  createdAt: string;
  status: number;
}

const PriceChange: React.FC = () => {
  const [data, setData] = useState<Price[]>([]);
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: fetchData,
    isLoading,
    isError,
    refetch,
  } = useGetConsultantPriceHistoryQuery({
    page: 1,
    limit: 10,
  });

  const [deletePriceList] = useDeleteConsultantPriceListMutation();

  useEffect(() => {
    if (fetchData) {
      setData(fetchData.data || []);
    }
  }, [fetchData]);

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    if (selectedId && selectedId) {
      deletePriceList({ id: selectedId.id }).then(() => {
        setDeleteModalOpen(false);
      });
    }
  };

  const handleRequestSubmit = (
    serviceType: number,
    currentPrice: string,
    discountPrice: number
  ) => {
    const newPrice: Price = {
      id: Date.now(),
      feature: serviceType,
      requested_current_price: currentPrice,
      requested_discount_price: discountPrice,
      createdAt: new Date().toISOString(),
      status: 1, // Assuming 1 means pending
    };
    setData((prevData) => [...prevData, newPrice]);
    setRequestModalOpen(false);
  };

  const statusMapping: Record<number, string> = {
    1: "Pending",
    2: "Confirmed",
    3: "Canceled",
    4: "Rejected",
    5: "Price Changed",
    6: "Approved",
  };

  const serviceTypeMapping: Record<number, string> = {
    1: "Chat",
    2: "Audio Call",
    3: "Video Call",
    4: "Anonymous Call",
    5: "Private Call",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Price Change History</h2>
        <button
          onClick={() => setRequestModalOpen(true)}
          className="px-4 py-2 bg-[#051D41] text-white rounded-lg hover:bg-[#051D41]"
        >
          + Request for new Price
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data. Please try again later.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((price) => (
            <PriceChangeCard
              key={price.id}
              serviceType={serviceTypeMapping[price.feature] || "Unknown"}
              currentPrice={price.requested_current_price.toString()}
              discountPrice={price.requested_discount_price}
              creationTime={dayjs(price.createdAt).format("DD MMMM YYYY")}
              status={statusMapping[price.status] || "Unknown"}
              onDelete={() => handleDelete(price)}
            />
          ))}
        </div>
      )}

      {isRequestModalOpen && (
        <RequestPriceModal
          isOpen={isRequestModalOpen}
          onClose={() => setRequestModalOpen(false)}
          onSubmit={handleRequestSubmit}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default PriceChange;
