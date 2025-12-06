import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";

export type readycakes = {
    cakeId: number;
    cakeName: string;
    flavorsUsed: string;
    size: string;
    price: number;
    imageURL: string;
    quantityAvailable: number;
};

// export type CakeResponse = {
//     data: readycakes[];
// };

export const readyCakesAPI = createApi({
    reducerPath: 'readyCakesAPI',
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
    tagTypes: ['Cakes'],
    endpoints: (builder) => ({
        // ✔ FIXED — added /api
        getAllCakes: builder.query<readycakes[], void>({
            query: () => '/api/readycakes',
            providesTags: ['Cakes']
        }),

        getCakeById: builder.query<readycakes, number>({
            query: (id) => `/api/readycakes/${id}`,
            providesTags: ['Cakes']
        }),

        createCake: builder.mutation<readycakes, Partial<readycakes>>({
            query: (newCake) => ({
                url: '/api/readycakes',
                method: 'POST',
                body: newCake
            }),
            invalidatesTags: ['Cakes']
        }),

        updateCake: builder.mutation<readycakes, { id: number; cake: Partial<readycakes> }>({
            query: ({ id, cake }) => ({
                url: `/api/readycakes/${id}`,
                method: 'PUT',
                body: cake
            }),
            invalidatesTags: ['Cakes']
        }),

        deleteCake: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/api/readycakes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cakes']
        }),
    })
});
