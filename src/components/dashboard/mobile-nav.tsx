"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

import { navItems } from "@/constants/dashboard";

export default function MobileNav() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const pathname = usePathname();

  const toggleSheet = () => setIsSheetOpen(!isSheetOpen);

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={toggleSheet}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <div className="flex items-center gap-2 text-lg font-semibold mb-5">
            <Wheat className="h-6 w-6" />
            <span className="text-xl ml-3">Flute</span>
          </div>
          {navItems.map((navItem) => (
            <Link
              key={navItem.label}
              href={navItem.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-[#FFA643] ${
                pathname === navItem.href ? "bg-muted text-primary" : ""
              }`}
              onClick={() => setIsSheetOpen(false)}
            >
              {navItem.icon}
              {navItem.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
