// components/orders/CallHistory.tsx
"use client";

import React, { useState, useEffect } from "react";
import CallCard from "@/components/common/call-history-card";
import dayjs from "dayjs";
import NoRecordFound from "../common/no-record-found";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetMyOrdersQuery } from "@/store/services";

interface Order {
  id: string;
  scheduled_at: string;
  order_duration: number;
  order_revenue: string;
  status: number;
  consultant_rate: string;
  call_start_time:string;
  description?: {
    userData?: {
      name: string;
    };
  };
}

interface CallHistoryProps {
  dateRange: { startDate: Date; endDate: Date };
}

const CallHistory: React.FC<CallHistoryProps> = ({ dateRange }) => {
  const [data, setData] = useState<Order[]>([]);
  const id: any = useSelector((state: RootState) => state.auth.user?.id);

  const {
    data: orders_chat,
    isLoading,
    refetch,
    isFetching,
  } = useGetMyOrdersQuery({
    page: 1,
    size: 10,
  });

  useEffect(() => {
    if (Array.isArray(orders_chat?.data)) {
      const validOrderTypes = [2, 3, 4, 5];
      const filteredOrders = orders_chat.data.filter((order: any) =>
        validOrderTypes.includes(order.order_type)
      );
      setData(filteredOrders);
    } else {
      setData([]); // Handle the case where data is not an array
    }
  }, [orders_chat]);

  console.log("data for call history...", data);

  // // Filter orders based on the selected date range
  // const filteredOrders = data.filter((order) => {
  //   // Convert call_start_time to a Date object
  //   const orderDate = dayjs(order.scheduled_at).toDate();
  //   return orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;
  // });

  // Mapping for status numbers to letters
  const statusMapping: Record<number, string> = {
    1: "Pending",
    2: "Confirmed",
    3: "Running",
    4: "Completed",
    5: "Rejected",
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.length > 0 ? (
        data.map((order, index) => (
          <CallCard
            key={index}
            orderId={order.id}
            duration={order.order_duration || 0}
            userName={order?.description?.userData?.name || "Unknown User"}
            earning={order?.order_revenue || "0.00"}
            rate={order?.consultant_rate || "0.00"}
            status={statusMapping[order?.status] || "Unknown"}
            orderTime={
              dayjs(order?.call_start_time).format("DD MMMM YYYY, HH:mm") ||
              "nil"
            }
          />
        ))
      ) : (
        // Render NoRecordFound component when there are no orders
        <div className="col-span-full">
          <NoRecordFound />
        </div>
      )}
    </div>
  );
};

export default CallHistory;
