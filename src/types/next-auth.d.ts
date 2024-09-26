// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      phoneNumber: string;
      accessToken: string;
    };
  }

  interface User {
    id: string;
    name: string;
    phoneNumber: string;
    token: string;
  }
}
