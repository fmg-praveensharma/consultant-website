export interface User {
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

export interface SendOtpResponse {
  status: boolean;
  message: string;
  data: {};
}

export interface SendOtpRequest {
  phoneNumber: string;
  countryCode: string;
}

export interface VerifyOtpResponse {
  status: boolean;
  message: string;
  data: User;
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: number;
  device_id: string;
  device_token: string;
  country_code: string;
}

export interface GetFollowersParams {
  userId: string;
}

export interface AuthResponse {
  data: any;
  error: string;
  message: string;
  status: boolean;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

export type RegisterCredentials = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  gender: number;
  marital_status: number;
  languages: string[];
  consultant_type: number;
  skills: number[];
  categories: number[];
  from_where_did_you_learn_flute: string;
  description:string;
};
