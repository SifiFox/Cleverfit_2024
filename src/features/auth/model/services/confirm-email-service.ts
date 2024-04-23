import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const confirmEmailAPI = createApi({
    reducerPath: 'confirmEmailAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        credentials: 'include'}
    ),
    tagTypes: ['confirm'],
    endpoints: (build) => ({
        confirmEmail: build.mutation({
            query: (data) => ({
                url: '/auth/confirm-email',
                method: 'POST',
                body: data,
                redirect: 'follow',
            }),
            invalidatesTags: ['confirm'],
        }),
    })
})
