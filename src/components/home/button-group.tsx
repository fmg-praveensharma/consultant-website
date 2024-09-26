// components/Dashboard.tsx
import React from "react";
import HomeButton from "@/components/common/button-card";

// data/buttonData.ts
export const buttonData = [
  { id: 1, label: "Call", icon: "📞", href: "/dashboard/orders" },
  { id: 2, label: "Chat", icon: "💬", href: "/dashboard/orders" },
  { id: 3, label: "Wallet", icon: "💼", href: "/dashboard/wallet" },
  { id: 4, label: "Waitlist", icon: "📝", href: "/dashboard/orders" },
  { id: 5, label: "Reviews", icon: "⭐", href: "/dashboard/reviews" },
  { id: 6, label: "Support", icon: "🎧", href: "/dashboard/support" },
  {
    id: 7,
    label: "Profile",
    icon: "👤",
    href: "/dashboard/settings/edit-profile",
  },
  { id: 8, label: "Followers", icon: "👥", href: "/dashboard/followers" },
  { id: 9, label: "Settings", icon: "⚙️", href: "/dashboard/settings" },
];

const HomeButtonGroup: React.FC = () => {
  return (
    <div className="flex justify-center p-4 bg-white rounded-md">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {buttonData.map((button) => (
          <HomeButton
            key={button.id}
            icon={button.icon}
            label={button.label}
            href={button.href}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeButtonGroup;
