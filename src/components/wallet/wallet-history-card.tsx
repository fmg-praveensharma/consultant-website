import { BoldIcon } from "lucide-react";
import React from "react";

interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: string;
  userId: string;
  dateTime: string;
}

const WalletHistoryCard: React.FC<Transaction> = ({
  id,
  type,
  description,
  amount,
  userId,
  dateTime,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg transition hover:shadow-lg ">
      <div className="flex justify-between items-center sm:mb-5">
        <p className="font-bold">{type}</p>
        <p className="text-gray-500">{id}</p>
      </div>
      <div className="flex flex-col justify-start sm:flex-row sm:justify-between sm:mb-5">
        <p className="text-gray-600">
          credit from <b> {description}</b>
        </p>
        <p className="text-green-500">
          <b>{amount}</b>
        </p>
      </div>
      <div className="flex justify-between text-black text-sm">
        <p className="font-medium">User Id: {userId}</p>
        <p className="text-end">{dateTime}</p>
      </div>
    </div>
  );
};

export default WalletHistoryCard;
