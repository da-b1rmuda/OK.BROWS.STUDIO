import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    keepalive: false,
  }),
  tagTypes: ["Resource"],
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (data) => {
        return {
          url: `/appointments/createAppointment`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    editAppointment: builder.mutation({
      query: (data) => {
        return {
          url: `/appointments/editAppointment`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    editStatusAppointment: builder.mutation({
      query: (data) => {
        return {
          url: `/appointments/editStatusAppointment`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Resource"],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => {
        return {
          url: `/appointments/deleteAppointment/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Resource"],
    }),
    getAppointments: builder.query({
      query: () => {
        return {
          url: `/appointments/getAppointments`,
        };
      },
      providesTags: ["Resource"],
    }),
    getAppointmentsUser: builder.query({
      query: (id) => {
        return {
          url: `/appointments/getAppointmentsUser/${id}`,
        };
      },
      providesTags: ["Resource"],
    }),
    getAppointmentsStatus: builder.query({
      query: () => {
        return {
          url: `/appointments/getAppointmentsStatus`,
        };
      },
      providesTags: ["Resource"],
    }),
    getTotalSum: builder.query({
      query: () => {
        return {
          url: `/appointments/getTotalSum`,
        };
      },
      providesTags: ["Resource"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useEditAppointmentMutation,
  useEditStatusAppointmentMutation,
  useGetAppointmentsQuery,
  useGetAppointmentsStatusQuery,
  useGetTotalSumQuery,
} = bookingApi;
