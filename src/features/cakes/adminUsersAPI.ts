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
   
    createUser: builder.mutation<{ message: string }, Partial<TUser>>({
      query: (newUser) => ({
        url: '/users/register',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),

    
    verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
      query: (data) => ({
        url: '/users/verify',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

    
    resendVerificationCode: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/users/verify/resend',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

   getUsers: builder.query<TUser[], void>({
  query: () => '/users',
  transformResponse: (response: any) => response.data || response, 
  providesTags: ['Users'],
}),


   
    getUserById: builder.query<TUser, number>({
      query: (id) => `/users/${id}`,
    }),

   
    updateUser: builder.mutation<{ message: string }, { id: number; updates: Partial<TUser> }>({
      query: ({ id, updates }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Users'],
    }),

    
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
