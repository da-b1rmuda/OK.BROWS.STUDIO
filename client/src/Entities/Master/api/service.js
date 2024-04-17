import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const masterApi = createApi({
  reducerPath: "masterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    keepalive: false,
  }),
  endpoints: (builder) => ({
    editMasterWorking: builder.mutation({
      query: (data) => {
        return {
          url: `/master/editMasterWorking`,
          method: "PUT",
          body: data,
        };
      },
    }),
    deletePreviousDates: builder.mutation({
      query: () => {
        return {
          url: `/master/deletePreviousDates`,
          method: "PUT",
        };
      },
    }),
    getMasters: builder.query({
      query: () => {
        return {
          url: `/master/getMasters`,
        };
      },
    }),
  }),
});

export const {
  useEditMasterWorkingMutation,
  useGetMastersQuery,
  useDeletePreviousDatesMutation,
} = masterApi;
