import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { authApi } from "@/store/services";
import { apiSlice } from "@/store/services";

// const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
//   console.log("Dispatching:", action);
//   let result = next(action);
//   console.log("Next State:", store.getState());
//   return result;
// };

// store variable is a global variable.
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, apiSlice.middleware),
    // getDefaultMiddleware().concat(authApi.middleware, loggerMiddleware),
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
