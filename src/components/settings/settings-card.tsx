import Link from "next/link";
import { ReactNode } from "react";

interface SettingsCardProps {
  icon: ReactNode;
  label: string;
  href: string;
}

export default function SettingsCard({ icon, label, href }: SettingsCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-6 bg-white shadow rounded-lg transition hover:shadow-lg"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <div className="text-center font-medium">{label}</div>
    </Link>
  );
}
