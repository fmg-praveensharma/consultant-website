"use client";
import "./globals.css";

import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
