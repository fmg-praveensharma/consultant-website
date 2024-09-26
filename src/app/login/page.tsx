"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation
import { useSelector } from "react-redux";
import Login from "@/components/login/login";
import { RootState } from "@/store/store";

const LoginPage = () => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (auth?.auth_token) {
      // If the user is already logged in, redirect immediately
      console.log("auth_token", auth);

      if (auth?.user?.status == 1) {
        router.push("/registration");
      } else {
        router.push("/dashboard/home");
      }
    }
  }, [auth, router]);

  // If the user is logged in, we don't need to render the login component
  // If we don't use below if condition so first the login page will render and then dashboard page but we don't want to see the login page in this case
  // if (auth) {
  //   return null; // Or you could return a loading indicator
  // }

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
