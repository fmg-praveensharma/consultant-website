// src/store/apiSlice.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  FollwersListResponse,
  ReviewsListResponse,
  OrdersListResponse,
  SkillsListResponse,
  CategoriesListResponse,
  ConsultantDetails,
  ConsultantPriceChange,
} from "@/types/user";

import { API_ENDPOINTS, BASE_URL } from "@/constants/api";
import { RootState } from "../store";

// Create an API slice
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.auth_token; 
      console.log("state", state);
      if (token) {
        // let mytoken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExOSwidGltZXN0YW1wIjoxNzI2ODI1MDAyNzA3LCJpYXQiOjE3MjY4MjUwMDIsImV4cCI6MTc1ODM2MTAwMn0.8cYh5Fyd3gWE8RALM8L2fQ8fF6V-73R0J5v6jRy1jaE"
        headers.set("Authorization", `Bearer ${token}`);
      }

      console.log("headers", headers);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMyFollowers: builder.query<FollwersListResponse, { id: number }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.FollowersList}`,
        method: "GET",
      }),
    }),

    getMyOrders: builder.query<
      OrdersListResponse,
      { page: number; size: number }
    >({
      query: ({ page, size }) => ({
        url: `api/v1/consultant/management/order/get-consultant-orders?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),

    getSkillsList: builder.query<SkillsListResponse, {}>({
      query: () => ({
        url: `/meta/coach_skill/get_all`,
        method: "GET",
      }),
    }),

    getCategoriesList: builder.query<CategoriesListResponse, {}>({
      query: () => ({
        url: `/meta/coach_categories/get_all`,
        method: "GET",
      }),
    }),

    getReviewsList: builder.query<
      ReviewsListResponse,
      { id: number; page: number; limit: number }
    >({
      query: ({ id, page, limit }) => ({
        url: `/coach-rating/get_all_reviews_on_coach/${id}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),

    // get consultant details

    getConsultantDetails: builder.query<ConsultantDetails, { id: number }>({
      query: ({ id }) => ({
        url: `/api/v1/consultant/profile/consultant-details`,
        method: "GET",
      }),
    }),

    // get consultant details

    getConsultantDetail: builder.query<ConsultantDetails, { code: number }>({
      query: () => ({
        url: `/api/v1/consultant/profile/consultant-details`,
        method: "GET",
      }),
    }),

    // update consultant details

    updateConsultantDetails: builder.mutation<ConsultantDetails, { body: any }>(
      {
        
        query: ( body ) => ({
          url: `/api/v1/consultant/profile`,
          method: "PUT",
          body,
        }),
        // invalidatesTags: ["consultant"],
      }
    ),

    // get api for price change history

    getConsultantPriceHistory: builder.query<
      ConsultantPriceChange,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/api/v1/consultant/profile/consultant-price/price-request-log?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),

    // request for consultant new price

    createConsultantPriceReq: builder.mutation<
      ConsultantDetails,
      { body: any }
    >({
      query: (body) => ({
        url: `/api/v1/consultant/profile/consultant-price/add`,
        method: "POST",
        body,
      }),
      // invalidatesTags: ["consultant"],
    }),

    // ******************************** delete api for consultant price list

    deleteConsultantPriceList: builder.mutation<ConsultantDetails, { id: any }>(
      {
        query: ({ id }) => ({
          url: `/api/v1/consultant/profile/consultant-price/cancel-price-request/${id}`,
          method: "PUT",
        }),
        // invalidatesTags: ["consultant"],
      }
    ),

    // get api for wallet change history

    getConsultantWalletHistory: builder.query<
      ConsultantPriceChange,
      { page: number; size: number }
    >({
      query: ({ page, size }) => ({
        url: `/api/v1/consultant/management/order/get-consultant-orders?page=${page}&size=${size}`,
        method: "GET",
      }),
    }),


      // Add Image in gallery at the time of registration 

    createConsultantImage: builder.mutation<
      ConsultantDetails,
      { body: any }
    >({
      query: (body) => ({
        url: `/api/v1/consultant/profile/photos/`,
        method: "POST",
        body,
      }),
      // invalidatesTags: ["consultant"],
    }),


    // set profile pic
    updateConsultantProfilePic: builder.mutation<
      ConsultantDetails,
      { body: any; id: number }
    >({
      query: ({ id, body }) => ({
        url: `/api/v1/consultant/profile/photos/${id}`,
        method: "PUT",
        body,
      }),
      // invalidatesTags: ["gallery"],
    }),

    // delete consultant photo
    deleteGallery: builder.mutation<ConsultantDetails, { id: number }>({
      query: ({ id }) => ({
        url: `/api/v1/consultant/profile/photos/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["gallery"],
    }),

    // get api for wallet change history

    getConsultantEarning: builder.query<
      ConsultantPriceChange,
      { page: number; size: number }
    >({
      query: () => ({
        url: `/api/v1/consultant/payment/overview-data`,
        method: "GET",
      }),
    }),

    // get api for  consultant service list

    getConsultantServiceList: builder.query<ConsultantPriceChange, {}>({
      query: () => ({
        url: `/api/v1/consultant/profile/service-status`,
        method: "GET",
      }),
    }),

    // update consultant status
    updateConsultantStatus: builder.mutation<
      ConsultantDetails,
      { body: any; type: number }
    >({
      query: ({ type, body }) => ({
        url: `/api/v1/consultant/profile/service-status/${type}`,
        method: "PUT",
        body,
      }),
      // invalidatesTags: ["consultant"],
    }),

    

    // update consultant status
    CreateConsultantRegister: builder.mutation<
      ConsultantDetails,
      { body: any; type: number }
    >({
      query: ( body ) => ({
        url: `/api/v1/consultant/profile/register`,
        method: "POST",
        body,
      }),
      // invalidatesTags: ["consultant"],
    }),

    // update Phone Number 
    UpdateConsultantPhoneNumber: builder.mutation<
      ConsultantDetails,
      { body: any; type: number }
    >({
      query: ( body ) => ({
        url: `/api/v1/consultant/auth/update-mobile`,
        method: "POST",
        body,
      }),
      // invalidatesTags: ["consultant"],
    }),

    // verify otp after update phone number
    UpdateConsultantPhoneNumberOtp: builder.mutation<
      ConsultantDetails,
      { body: any; type: number }
    >({
      query: ( body ) => ({
        url: `/api/v1/consultant/auth/verify-otp`,
        method: "PATCH",
        body,
      }),
      // invalidatesTags: ["consultant"],
    }),


  }),
});

// Correctly export the generated hook
export const {
  useGetMyFollowersQuery,
  useGetMyOrdersQuery,
  useGetReviewsListQuery,
  useGetSkillsListQuery,
  useGetCategoriesListQuery,
  useGetConsultantDetailsQuery,
  useUpdateConsultantDetailsMutation,
  useGetConsultantPriceHistoryQuery,
  useCreateConsultantPriceReqMutation,
  useDeleteConsultantPriceListMutation,
  useGetConsultantWalletHistoryQuery,
  useGetConsultantDetailQuery,
  useUpdateConsultantProfilePicMutation,
  useDeleteGalleryMutation,
  useCreateConsultantImageMutation,
  useGetConsultantEarningQuery,
  useGetConsultantServiceListQuery,
  useUpdateConsultantStatusMutation,
  useCreateConsultantRegisterMutation,
  useUpdateConsultantPhoneNumberMutation,
  useUpdateConsultantPhoneNumberOtpMutation
} = apiSlice;
