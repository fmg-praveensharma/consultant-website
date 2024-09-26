// components/orders/ChatHistory.tsx
"use client";

import React, { useEffect, useState } from "react";
import CallCard from "@/components/common/call-history-card";
import dayjs from "dayjs";
import NoRecordFound from "../common/no-record-found";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetMyOrdersQuery } from "@/store/services";

interface Order {
  id: string;
  scheduled_at: string;
  consultant_earning: string;
  status: number;
  description?: {
    userData?: {
      name: string;
    };
  };
}

interface CallHistoryProps {
  dateRange: { startDate: Date; endDate: Date };
}

const ChatHistory: React.FC<CallHistoryProps> = ({ dateRange }) => {
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
      const filteredOrders = orders_chat.data.filter(
        (order: any) => order.order_type === 1
      );
      setData(filteredOrders);
    } else {
      setData([]); // Handle the case where data is not an array
    }
  }, [orders_chat]);

  // Filter orders based on the selected date range
  const filteredOrders = data.filter((order) => {
    // Convert call_start_time to a Date object
    const orderDate = dayjs(order.scheduled_at).toDate();
    return orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;
  });

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
      {filteredOrders.length > 0 ? (
        data.map((order, index) => (
          <CallCard
            key={index}
            orderId={order.id}
            userName={order?.description?.userData?.name || "Unknown User"}
            earning={order?.consultant_earning || "0.00"}
            orderTime={dayjs(order?.scheduled_at).format("DD MMMM YYYY, HH:mm")}
            status={statusMapping[order?.status] || "Unknown"}
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

export default ChatHistory;
