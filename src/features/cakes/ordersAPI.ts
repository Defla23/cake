// src/features/cakes/ordersAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

export type Order = {
  Id: number;
  userid: number;
  DesignID: number ;
  Size:string;
  Flavor: string;
  Message: string;
  Status: string; 
  PaymentStatus: string; 
  Price: number;
  SampleImages: string;
  ColorPreferences: string;
  Notes: string;
  ExtendedDescription: string;
  CreatedAt: string;
  UpdatedAt: string;
};


export type CreateOrderDto = {
  userid: number;
  DesignID?: number;
  Size?: "Small" | "Medium" | "Large";
  Flavor?: string;
  Message?: string;
  Status: string;
  Price: number;
  DeliveryDate: string;
  SampleImages?: string;
  ColorPreferences?: string;
  Notes?: string;
  ExtendedDescription?: string;
};

export const orderAPI = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    
    getAllOrders: builder.query<Order[], void>({
      query: () => "/orders",
      transformResponse: (response: any) => response.data || response,
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query<Order, number>({
      query: (id) => `/orders/${id}`,
      transformResponse: (response: any) => response.data || response,
      providesTags: ["Orders"],
    }),

    
    getOrdersByUser: builder.query<Order[], number>({
      query: (userid) => `/user/orders/${userid}`,
      transformResponse: (response: any) => response.data || response,
      providesTags: ["Orders"],
    }),

    
    createOrder: builder.mutation<Order, CreateOrderDto>({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
      transformResponse: (response: any) => response.data || response,
      invalidatesTags: ["Orders"],
    }),

   
    updateOrderStatus: builder.mutation<
      Order,
      { OrderID: number; Status: string }
    >({
      query: ({ OrderID, Status }) => ({
        url: `/orders/${OrderID}`,
        method: "PUT",
        body: { Status },
      }),
      transformResponse: (response: any) => response.data || response,
      invalidatesTags: ["Orders"],
    }),

    updateOrderDetails: builder.mutation<
      Order,
      { OrderID: number; data: Partial<Order> }
    >({
      query: ({ OrderID, data }) => ({
        url: `/orders/${OrderID}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any) => response.data || response,
      invalidatesTags: ["Orders"],
    }),

    
    deleteOrder: builder.mutation<{ success: boolean }, number>({
      query: (OrderID) => ({
        url: `/orders/${OrderID}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response.data || response,
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrdersByUserQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useUpdateOrderDetailsMutation,
  useDeleteOrderMutation,
} = orderAPI;
