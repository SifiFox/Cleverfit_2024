import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {baseApiQuery} from '@/shared/api/api.ts';

export const  userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery(baseApiQuery),
    endpoints: (build) => ({
        getUserData: build.query({
            query: () => ({
                url: '/user/me',
                method: 'GET',
                redirect: 'follow',
            })
        }),
        updateUserData: build.mutation({
            query: (data) => ({
                url: '/user',
                method: 'PUT',
                body: data,
                redirect: 'follow',
            }),
        }),
        updateUserTariff: build.mutation({
            query: (data) => ({
                url: '/tariff',
                method: 'POST',
                body: data,
                redirect: 'follow',
            }),
        }),
    })
})
export const {
    useGetUserDataQuery,
    useLazyGetUserDataQuery,
    useUpdateUserDataMutation,
    useUpdateUserTariffMutation,
} = userAPI
