import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
    }),
    tagTypes: ['login'],
    endpoints: (build) => ({
        authByEmail: build.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['login'],
        }),
        authByGoogle: build.query({
            query: () => ({
                url: '/auth/google',
                method: 'GET',
            })
        })
    })
})
export const { useLazyAuthByGoogleQuery, useAuthByEmailMutation } = loginAPI
