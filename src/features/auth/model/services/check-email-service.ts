import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type TCheckData = {
    email?: string | null
}
export const recoverAPI = createApi({
    reducerPath: 'recoverAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://marathon-api.clevertec.ru/'}),
    endpoints: (build) => ({
        sendRecoveryCode: build.mutation({
            query: (data: TCheckData) => ({
                url: '/auth/check-email',
                method: 'POST',
                body: data,
                redirect: 'follow'
            }),
        }),
    })
})

export const {useSendRecoveryCodeMutation} = recoverAPI
