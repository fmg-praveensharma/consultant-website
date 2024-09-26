import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services";
import {
  AUTH_TOKEN,
  expireCookies,
  getAuthCookie,
  removeCookies,
  setAuthCookie,
} from "@/lib/cookies";
import { VerifyOtpResponse } from "../services"; // Adjust the import path if necessary

// Define the initial state
interface AuthState {
  auth_token?: string;
  user?: VerifyOtpResponse["data"];
}

const initialState: AuthState = {
  auth_token: getAuthCookie(AUTH_TOKEN) || undefined,
  user: undefined,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("Executing logout action...", getAuthCookie(AUTH_TOKEN));
      // Remove the auth_token
      removeCookies([AUTH_TOKEN]);
      state.auth_token = undefined;
      state.user = undefined;
      console.log("Cookies after logout:", getAuthCookie(AUTH_TOKEN));
    },
    expireToken: (state, action: PayloadAction<string[]>) => {
      console.log("Executing expireToken action with payload:", action.payload);
      expireCookies(action.payload);
      state.auth_token = getAuthCookie(AUTH_TOKEN) || undefined;
      console.log("Updated auth_token after expireToken:", state.auth_token);
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        auth_token: string;
        user: VerifyOtpResponse["data"];
      }>
    ) => {
      const { auth_token, user } = action.payload;
      console.log("Setting credentials with auth_token:", auth_token);
      state.auth_token = auth_token;
      state.user = user;
      setAuthCookie(auth_token, AUTH_TOKEN);
      console.log("Cookies after setCredentials:", getAuthCookie(AUTH_TOKEN));
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verifyOtp.matchFulfilled,
      (state, { payload }) => {
        const auth_token = payload.data.auth_token;
        console.log("verifyOtp fulfilled, setting auth_token:", auth_token);

        // Set the auth_token in cookies
        setAuthCookie(auth_token, AUTH_TOKEN);

        // Update the state directly
        state.auth_token = auth_token;
        state.user = payload.data;
      }
    );
  },
});

export const authReducer = slice.reducer;
export const { logout, expireToken, setCredentials } = slice.actions;
