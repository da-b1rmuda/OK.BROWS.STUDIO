import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    keepalive: false,
  }),
  tagTypes: ["Resource"],
  endpoints: (builder) => ({
    createNews: builder.mutation({
      query: (data) => {
        return {
          url: `/news/createNews`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    editNews: builder.mutation({
      query: (data) => {
        return {
          url: `/news/editNews`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    deleteNews: builder.mutation({
      query: (id) => {
        return {
          url: `/news/deleteNews/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Resource"],
    }),
    getNews: builder.query({
      query: () => {
        return {
          url: `/news/getNews`,
        };
      },
      providesTags: ["Resource"],
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useEditNewsMutation,
  useGetNewsQuery,
} = newsApi;
