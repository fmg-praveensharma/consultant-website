// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { verifyOtp, getUserByPhoneNumber } from "@/lib/otp";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP Login",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        console.log("Authorizing credentials:", credentials);
        const { phoneNumber, otp } = credentials as {
          phoneNumber: string;
          otp: string;
        };

        // Verify OTP and get the user
        const isOtpValid = await verifyOtp(phoneNumber, otp);
        console.log("OTP Valid:", isOtpValid);
        if (isOtpValid) {
          const user = await getUserByPhoneNumber(phoneNumber);
          if (user) {
            return {
              id: user.id,
              name: user.name,
              phoneNumber: user.phoneNumber,
              token: user.token,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phoneNumber = user.phoneNumber;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        phoneNumber: token.phoneNumber as string,
        accessToken: token.accessToken as string,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
