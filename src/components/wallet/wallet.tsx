"use client";
import React, { useState, useEffect } from "react";
import WalletInfo from "./wallet-info";
import WalletHistoryCard from "./wallet-history-card";
import dayjs from "dayjs";
import NoRecordFound from "../common/no-record-found";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetConsultantWalletHistoryQuery } from "@/store/services";

export interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: string;
  userId: string;
  dateTime: string;
}

interface CallHistoryProps {
  dateRange: { startDate: Date; endDate: Date };
}

const Wallet: React.FC<CallHistoryProps> = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const {
    data: fetchdata,
    error,
    isLoading,
  } = useGetConsultantWalletHistoryQuery({
    page: 1,
    size: 10,
  });

  const serviceTypeMapping: Record<number, string> = {
    1: "Chat",
    2: "Audio Call",
    3: "Video Call",
    4: "Anonymous Call",
    5: "Private Call",
    6: "Random Call",
  };

  useEffect(() => {
   
    if (fetchdata) {
      // Map API response data to the required format
      const formattedData = fetchdata?.data?.map((item: any) => ({
        id: `${item.id}`,
        type: serviceTypeMapping[item.order_type || "Unknown"],
        description: ` ${item.description.userData.name}`,
        amount: item.consultant_earning,
        userId: item?.user_id,
        dateTime: dayjs(item?.createdAt).format("DD MMM YYYY HH:mm  "),
      }));
      setData(formattedData);
    }
  }, [fetchdata]);

  const today = dayjs().startOf("day").toDate();
  const [dateRange, setDateRange] = useState({
    startDate: today,
    endDate: today,
  });

  const walletData = {
    lifetimeEarning: "₹11,705",
    monthlyEarning: "₹5,012",
    weeklyEarning: "₹67",
    todaysEarning: "₹11",
    availableBalance: "₹5,012",
    payableAmount: "₹4,398",
  };

  const filteredOrders = data?.filter((order) => {
    const orderDate = new Date(order.dateTime); // Convert dateTime to a Date object
    return orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;
  });

  const handleDateRangeChange = (value: string) => {
    let startDate, endDate;

    switch (value) {
      case "today":
        startDate = endDate = dayjs().startOf("day").toDate();
        break;
      case "yesterday":
        startDate = endDate = dayjs()
          .subtract(1, "day")
          .startOf("day")
          .toDate();
        break;
      case "week":
        startDate = dayjs().startOf("week").toDate();
        endDate = dayjs().endOf("week").toDate();
        break;
      case "month":
        startDate = dayjs().startOf("month").toDate();
        endDate = dayjs().endOf("month").toDate();
        break;
      case "year":
        startDate = dayjs().startOf("year").toDate();
        endDate = dayjs().endOf("year").toDate();
        break;
      default:
        startDate = endDate = new Date();
    }

    setDateRange({ startDate, endDate });
  };

  return (
    <div className="p-6">
      {/* Wallet Section */}
      <WalletInfo />

      {/* History Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">History</h2>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4 sm:justify-end">
            <Select onValueChange={handleDateRangeChange} defaultValue="today">
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Today" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOrders?.length > 0 ? (
              filteredOrders.map((order, index) => (
                <WalletHistoryCard key={index} {...order} />
              ))
            ) : (
              <div className="col-span-full">
                <NoRecordFound />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
