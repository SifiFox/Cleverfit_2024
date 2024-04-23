import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const registrationAPI = createApi({
    reducerPath: 'registrationAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/'}
    ),
    tagTypes: ['registration'],
    endpoints: (build) => ({
        registrationByEmail: build.mutation({
            query: (data) => ({
                url: '/auth/registration',
                method: 'POST',
                body: data,
                redirect: 'follow'
            }),
            invalidatesTags: ['registration'],
        })
    }),
})
