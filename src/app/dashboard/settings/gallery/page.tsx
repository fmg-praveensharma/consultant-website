// components/MainSection.tsx
"use client";
import React, { useState } from "react";
import ProfilePhoto from "@/components/settings/profile-photo-tab-gallery";
import OtherPhotos from "@/components/settings/other-photo-tab-gallery";

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "other">("other");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "profile"
              ? "bg-[#051D41] text-[#ffffff]"
              : "bg-gray-200"
          }`}
        >
          Profile Photo
        </button>
        <button
          onClick={() => setActiveTab("other")}
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "other"
              ? "bg-[#051D41] text-[#ffffff]"
              : "bg-gray-200"
          }`}
        >
          Other Photos
        </button>
      </div>
      <div className="bg-white p-16 rounded-lg shadow-md">
        {activeTab === "profile" ? <ProfilePhoto /> : <OtherPhotos />}
      </div>
    </div>
  );
};

export default Gallery;
