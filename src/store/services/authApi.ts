import { API_ENDPOINTS } from "@/constants/api";
import { AuthResponse, RegisterCredentials } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface User {
  id: number;
  phone_number: string;
  country_code: string;
  consultant_type: string | null;
  auth_token: string;
  auth_token_expiry: string;
  status: number;
  last_login: string | null;
  referral_code: string | null;
  phone_verified_at: string | null;
  fcm_token: string;
  created_at: string;
  updated_at: string;
}

interface SendOtpResponse {
  status: boolean;
  message: string;
  data: {};
}

interface SendOtpRequest {
  phoneNumber: string;
  countryCode: string;
}

export interface VerifyOtpResponse {
  status: boolean;
  message: string;
  data: User;
}

interface VerifyOtpRequest {
  phoneNumber: string;
  otp: number;
  device_id: string;
  device_token: string;
  country_code: string;
}

// Now use these types in the API
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL || "https://dev-api.fluteconnect.com/api/v1",
  }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: ({ phoneNumber, countryCode }) => ({
        url: "consultant/auth/generate-otp",
        method: "POST",
        body: { phone_number: phoneNumber, country_code: countryCode },
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: ({ phoneNumber, otp, device_id, device_token, country_code }) => ({
        url: "consultant/auth/login",
        method: "POST",
        body: {
          phone_number: phoneNumber,
          otp,
          device_id,
          device_token,
          country_code,
        },
      }),
    }),
    registerUser: builder.mutation<AuthResponse, RegisterCredentials>({
      query: (credentials) => ({
        url: `${API_ENDPOINTS.register}`,
        method: "POST",
    
        body: credentials,
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterUserMutation,
} = authApi;
