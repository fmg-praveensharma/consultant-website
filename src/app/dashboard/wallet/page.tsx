"use client";
import React, { useState } from "react";
import Wallet from "@/components/wallet/wallet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";

const WalletPage = () => {
  const today = dayjs().startOf("day").toDate();
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

  return (
    <div>
      {/* <div>
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
      </div> */}
      <Wallet dateRange={dateRange} />
    </div>
  );
};

export default WalletPage;
