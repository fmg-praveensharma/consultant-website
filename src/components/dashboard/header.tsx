"use client";
import React from "react";
import MobileNav from "./mobile-nav";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/authSlice"; // Import the logout action

export default function Header() {
  const router = useRouter(); // Initialize router for navigation
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  // Function to handle logout
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Redirect to the login page
    router.push("/login");
    router.refresh(); // Force a refresh to ensure state is updated
  };

  return (
    <header className="flex h-14 items-center justify-between sm:justify-end gap-4 border-b bg-[--background-header] px-4 lg:h-[60px] lg:px-6">
      <MobileNav />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full text-white hover:bg-yellow-500"
          >
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
