import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

export type TUser = {
  userid: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  role: 'admin' | 'customer' | 'baker';
  is_verified: boolean;
  verification_code?: string | null;
  Created_At?: string;
  Updated_At?: string;
};

export const adminUsersAPI = createApi({
  reducerPath: 'adminUsersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    // Create new user
    createUser: builder.mutation<{ message: string }, Partial<TUser>>({
      query: (newUser) => ({
        url: '/users/register',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),

    // Verify user
    verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
      query: (data) => ({
        url: '/users/verify',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

    // Resend verification code
    resendVerificationCode: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/users/verify/resend',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

    // Get all users
   getUsers: builder.query<TUser[], void>({
  query: () => '/users',
  transformResponse: (response: any) => response.data || response, 
  providesTags: ['Users'],
}),


    // Get user by ID
    getUserById: builder.query<TUser, number>({
      query: (id) => `/users/${id}`,
    }),

    // Update user / role
    updateUser: builder.mutation<{ message: string }, { id: number; updates: Partial<TUser> }>({
      query: ({ id, updates }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Users'],
    }),

    // Delete user
    deleteUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useResendVerificationCodeMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminUsersAPI;
