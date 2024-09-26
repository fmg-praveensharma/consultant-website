import React from "react";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import AuthenticationChecker from "./auth";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AuthenticationChecker />
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-[#F4F6FC]">
        <Sidebar />
        <div className="flex flex-col">
          <Header />
          {/* Make this div scrollable */}
          <div className="p-10 overflow-y-auto h-[calc(100vh-64px)]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
