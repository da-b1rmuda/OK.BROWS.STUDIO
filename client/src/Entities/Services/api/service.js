import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    keepalive: false,
  }),
  tagTypes: ["Resource"],
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (data) => {
        return {
          url: `/services/createService`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    editService: builder.mutation({
      query: (data) => {
        return {
          url: `/services/editService`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    deleteService: builder.mutation({
      query: (id) => {
        return {
          url: `/services/deleteService/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Resource"],
    }),
    getServices: builder.query({
      query: () => {
        return {
          url: `/services/getServices`,
        };
      },
      providesTags: ["Resource"],
    }),
    getServicesGroup: builder.query({
      query: () => {
        return {
          url: `/services/getServicesGroup`,
        };
      },
      providesTags: ["Resource"],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useEditServiceMutation,
  useGetServicesQuery,
  useGetServicesGroupQuery,
} = serviceApi;
