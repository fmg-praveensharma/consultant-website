// components/orders/OrdersPage.tsx
"use client";

import React, { useState } from "react";
import CallHistory from "@/components/orders/call-history";
import ChatHistory from "@/components/orders/chat-history";
import GiftHistory from "@/components/orders/gift-history";

// import { useGetMyOrdersQuery } from "@/store/services";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";

const OrdersPage = () => {
  const today = dayjs().startOf("day").toDate();
  const [activeTab, setActiveTab] = useState("chat");
  const [dateRange, setDateRange] = useState({
    startDate: today,
    endDate: today,
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

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "chat":
        return <ChatHistory dateRange={dateRange} />;
      case "call":
        return <CallHistory dateRange={dateRange} />;
      case "gift":
        return <GiftHistory dateRange={dateRange} />;
      default:
        return <ChatHistory dateRange={dateRange} />;
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between mb-6">
        <div>
          <button
            className={`px-10 py-2 font-semibold text-lg rounded ${
              activeTab === "chat" ? "bg-[#121E31] text-white" : "bg-gray-200"
            } mx-2 transition-all duration-300`}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
          <button
            className={`px-10 py-2 font-semibold text-lg rounded ${
              activeTab === "call" ? "bg-[#121E31] text-white" : "bg-gray-200"
            } mx-2 transition-all duration-300`}
            onClick={() => setActiveTab("call")}
          >
            Call
          </button>
          <button
            className={`px-10 py-2 font-semibold text-lg rounded ${
              activeTab === "gift" ? "bg-[#121E31] text-white" : "bg-gray-200"
            } mx-2 transition-all duration-300`}
            onClick={() => setActiveTab("gift")}
          >
            Gift
          </button>
        </div>
        <div>
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
      </div>

      {/* Render the active component */}
      <div className={`transition-opacity duration-300`}>
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default OrdersPage;
