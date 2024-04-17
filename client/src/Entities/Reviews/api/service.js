import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    keepalive: false,
  }),
  tagTypes: ["Resource"],
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => {
        return {
          url: `/reviews/createReview`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `/reviews/deleteReview/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Resource"],
    }),
    getAllReviews: builder.query({
      query: () => {
        return {
          url: `/reviews/getAllReviews`,
        };
      },
      providesTags: ["Resource"],
    }),
    getDefiniteReviews: builder.query({
      query: () => {
        return {
          url: `/reviews/getDefiniteReviews`,
        };
      },
      providesTags: ["Resource"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useGetDefiniteReviewsQuery,
} = reviewsApi;
