"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/dashboard";

import { Wheat } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-[--background-sidebar] md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 mb-10">
          <Link
            href="/dashboard/home"
            className="flex items-center gap-2 font-semibold"
          >
            <Wheat className="h-6 w-6" />
            <span className="text-3xl ml-3">Flute</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-lg font-medium lg:px-4">
            {navItems.map((navItem) => (
              <Link
                key={navItem.label}
                href={navItem.href}
                className={`flex items-center mb-2 gap-3 rounded px-3 py-2 text-muted-foreground transition-all hover:text-[#FFA643] ${
                  pathname === navItem.href ? "bg-muted text-primary" : ""
                }`}
              >
                {navItem.icon}
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
