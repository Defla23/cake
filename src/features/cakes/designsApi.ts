// src/features/designs/designApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";


export type Design = {
  DesignID: number;
  DesignName: string;
  Description: string;
  BaseFlavor: string;
  Availability: boolean;
  Size: string;
  ImageUrl: string;

  Category: string;
  CreatedAt?: string;
  UpdatedAt?: string;
};


export const designAPI = createApi({
  reducerPath: 'designAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Designs'],
  endpoints: (builder) => ({
   
    getAllDesigns: builder.query<Design[], void>({
      query: () => '/designs',
      providesTags: ['Designs']
    }),

    
    getDesignById: builder.query<Design, number>({
      query: (id) => `/designs/${id}`,
      providesTags: ['Designs']
    }),

    
    createDesign: builder.mutation<Design, {
      DesignName: string;
      Description: string;
      BaseFlavor: string;
      Availability: boolean;
      Size: string;
      ImageUrl?: string;
      Category: string;
    }>({
      query: (newDesign) => ({
        url: '/designs',
        method: 'POST',
        body: newDesign
      }),
      invalidatesTags: ['Designs']
    }),

   
    updateDesign: builder.mutation<Design, {
      id: number;
      design: {
        DesignName?: string;
        Description?: string;
        BaseFlavor?: string;
        Availability?: number;
        Size?: string;
        ImageUrl?: string;
        Category?: string;
      };
    }>({
      query: ({ id, design }) => ({
        url: `/designs/${id}`,
        method: 'PUT',
        body: design
      }),
      invalidatesTags: ['Designs']
    }),

    
    deleteDesign: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/designs/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Designs']
    }),
  })
});

// Export hooks for usage in components
export const {
  useGetAllDesignsQuery,
  useGetDesignByIdQuery,
  useCreateDesignMutation,
  useUpdateDesignMutation,
  useDeleteDesignMutation
} = designAPI;
