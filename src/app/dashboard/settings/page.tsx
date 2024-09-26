import {
  Phone,
  Image,
  DollarSign,
  FileText,
  Star,
  Download,
  Users,
  UserRoundPen,
} from "lucide-react";
import SettingsCard from "@/components/settings/settings-card";

interface SettingsItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

const settingsItems: SettingsItem[] = [
  {
    label: "Update Phone Number",
    href: "/dashboard/settings/update-phone",
    icon: <Phone />,
  },
  {
    label: "Edit Profile",
    href: "/dashboard/settings/edit-profile",
    icon: <UserRoundPen />,
  },
  {
    label: "Gallery",
    href: "/dashboard/settings/gallery",
    icon: <Image />,
  },
  {
    label: "Price Change Request",
    href: "/dashboard/settings/price-change",
    icon: <DollarSign />,
  },
  {
    label: "Terms & Conditions",
    href: "/dashboard/settings/terms-conditions",
    icon: <FileText />,
  },
  {
    label: "Bank Details",
    href: "/dashboard/settings/bank-details",
    icon: <FileText />,
  },
  {
    label: "Pay Slip",
    href: "/dashboard/settings/pay-slip",
    icon: <Star />,
  },
  {
    label: "Download Form 16A",
    href: "/dashboard/settings/download-form",
    icon: <Download />,
  },
  {
    label: "View Price List",
    href: "/dashboard/settings/price-list",
    icon: <FileText />,
  },
];

export default function Settings() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsItems.map((item) => (
          <SettingsCard
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
}
