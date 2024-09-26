import React, { useState, useEffect } from "react";
import { useGetConsultantEarningQuery } from "@/store/services";

// Define the type for the data structure from the API
interface EarningsData {
  lifetime_earning: number;
  last_month_earning: number;
  last_week_earning: number;
  today_earning: number;
  wallet_balance: number;
  payable_amount: number;
  total_debit: number;
}

// Update the WalletInfo component to use the EarningsData type
const WalletInfo: React.FC = () => {
  // Set the state type to EarningsData or undefined initially
  const [data, setData] = useState<EarningsData | undefined>(undefined);

  const {
    data: fetchdata,
    error,
    isLoading,
  } = useGetConsultantEarningQuery({
    page: 1,
    size: 10,
  });

  console.log("fetch data", fetchdata?.data);

  useEffect(() => {
    if (fetchdata) {
      setData(fetchdata?.data);
    }
  }, [fetchdata]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error loading data.</span>;
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Wallet</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col justify-start gap-4 sm:flex-row mb-4">
          <div className="bg-blue-100 p-4 rounded">
            <p className="text-gray-600">Lifetime Earning</p>
            <p className="text-2xl font-bold">{data?.lifetime_earning}</p>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <p className="text-gray-600">Monthly Earning</p>
            <p className="text-2xl font-bold">
              {data?.last_month_earning !== undefined
                ? data.last_month_earning
                : "N/A"}
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded col-span-2 flex items-center lg:grow ">
            <div className="flex-grow text-center">
              <p className="text-gray-600">Weekly Earning</p>
              <p className="text-2xl font-bold">
                {data?.last_week_earning !== undefined
                  ? data.last_week_earning
                  : "N/A"}
              </p>
            </div>
            <div className="flex-grow text-center">
              <p className="text-gray-600">Today's Earning</p>
              <p className="text-2xl font-bold">
                {data?.today_earning !== undefined ? data.today_earning : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-red-100 p-4 rounded flex items-center">
            <div className="flex-grow text-center">
              <p className="text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold">
                {data?.wallet_balance !== undefined
                  ? data.wallet_balance
                  : "N/A"}
              </p>
            </div>
            <div className="h-full border-r-2 border-black mx-4"></div>
            <div className="flex-grow text-center">
              <p className="text-gray-600">Debit Balance</p>
              <p className="text-2xl font-bold">
                {data?.total_debit !== undefined ? data.total_debit : "N/A"}
              </p>
            </div>
            <div className="h-full border-r-2 border-black mx-4"></div>
            <div className="flex-grow text-center">
              <p className="text-gray-600">Payable Amount</p>
              <p className="text-2xl font-bold">
                {data?.payable_amount !== undefined
                  ? data.payable_amount
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
