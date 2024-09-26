// components/PriceChangeCard.tsx
import React from "react";
import { Trash2 } from "lucide-react";

interface PriceChangeCardProps {
  serviceType: string;
  currentPrice: string;
  discountPrice: string;
  creationTime: string;
  status: "Pending" | "Approved" | "Rejected";
  onDelete: () => void;
}

const PriceChangeCard: React.FC<PriceChangeCardProps> = ({
  serviceType,
  currentPrice,
  discountPrice,
  creationTime,
  status,
  onDelete,
}) => {
  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md">
      {status === "Pending" && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <Trash2 className="w-4 h-4 text-black" />
        </button>
      )}

      <p className="text-sm">
        <strong>Service Type: </strong>
        <span className="text-blue-500">{serviceType}</span>
      </p>
      <p className="text-sm">
        <strong>Requested Current Price: </strong>
        <span className="text-red-500"> {currentPrice}</span>
      </p>
      <p className="text-sm">
        <strong>Requested Discount Price: </strong>
        <span className="text-green-500">  {discountPrice}</span>
      </p>
      <p className="text-sm">
        <strong>Creation Time:</strong> {creationTime}
      </p>
      <p className="text-sm">
        <strong>Status:</strong>
        <span
          className={`text-${
            status === "Pending"
              ? "yellow"
              : status === "Approved"
              ? "green"
              : "red"
          }-500`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </p>
    </div>
  );
};

export default PriceChangeCard;
