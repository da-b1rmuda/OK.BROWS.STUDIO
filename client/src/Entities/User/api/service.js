import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    keepalive: false,
  }),
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => {
        return {
          url: `/user/registration`,
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: `/user/login`,
          method: "POST",
          body: data,
        };
      },
    }),
    editUser: builder.mutation({
      query: (data) => {
        return {
          url: `/user/editUser`,
          method: "PUT",
          body: data,
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/user/deleteUser/${id}`,
          method: "DELETE",
        };
      },
    }),
    getUsers: builder.query({
      query: () => {
        return {
          url: `/user/getUsers`,
        };
      },
    }),
    getUserInfo: builder.query({
      query: (id) => {
        return {
          url: `/user/getUserInfo/${id}`,
        };
      },
    }),
    getUserVisitsHistory: builder.query({
      query: (id) => {
        return {
          url: `/user/getUserVisitsHistory/${id}`,
        };
      },
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserInfoQuery,
  useGetUserVisitsHistoryQuery,
  useGetUsersQuery,
  useLoginMutation,
  useRegistrationMutation,
} = userAPI;
