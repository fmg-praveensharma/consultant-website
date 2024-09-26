import {
  Wheat,
  Home,
  ShoppingCart,
  Wallet,
  Star,
  Users,
  Settings,
  Headset,
} from "lucide-react";

export const navItems = [
  {
    label: "Home",
    href: "/dashboard/home",
    icon: <Home className="h-6 w-6" />,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: <ShoppingCart className="h-6 w-6" />,
  },
  {
    label: "Wallet",
    href: "/dashboard/wallet",
    icon: <Wallet className="h-6 w-6" />,
  },
  {
    label: "Reviews",
    href: "/dashboard/reviews",
    icon: <Star className="h-6 w-6" />,
  },
  {
    label: "Followers",
    href: "/dashboard/followers",
    icon: <Users className="h-6 w-6" />,
  },
  {
    label: "Support",
    href: "/dashboard/support",
    icon: <Headset className="h-6 w-6" />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-6 w-6" />,
  },
];
