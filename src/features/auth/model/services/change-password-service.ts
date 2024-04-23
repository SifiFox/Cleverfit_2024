import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type ChangePasswordData = {
    password: string,
    confirmPassword: string
}
export const changePassAPI = createApi({
    reducerPath: 'changePassAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        credentials: 'include'
    }),
    endpoints: (build) => ({
        changePassword: build.mutation({
            query: (data: ChangePasswordData) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: data,
                redirect: 'follow'
            }),
        }),
    })
})

export const {useChangePasswordMutation} = changePassAPI
