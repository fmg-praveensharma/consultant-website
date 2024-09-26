"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const AuthenticationChecker = () => {
  const router = useRouter();
  const auth_token = useSelector((state: RootState) => state.auth.auth_token);

  useEffect(() => {
    if (!auth_token) {
      // If the user is already logged in, redirect immediately
      console.log("auth_token", auth_token);
      router.push("/login");
    }
  }, [auth_token, router]);

  // If the user is logged in, we don't need to render the login component
  if (!auth_token) {
    return null; // Or you could return a loading indicator
  }
};

export default AuthenticationChecker;
