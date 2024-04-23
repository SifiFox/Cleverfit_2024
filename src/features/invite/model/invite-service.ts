import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {baseApiQuery} from '@/shared/api/api.ts';

export const inviteAPI = createApi({
    reducerPath: 'inviteAPI',
    baseQuery: fetchBaseQuery(baseApiQuery),
    tagTypes: ['invite'],
    endpoints: (build) => ({
        getInvites: build.query({
            query: () => ({
                url: '/invite',
                method: 'GET',
                redirect: 'follow',
            }),
            providesTags: () => ['invite']
        }),
        sendInvite: build.mutation({
            query: (data) => ({
                url: '/invite',
                method: 'POST',
                body: data,
                redirect: 'follow',
            }),
            invalidatesTags: ['invite']
        }),
        answerInvite: build.mutation({
            query: (data) => ({
                url: '/invite',
                method: 'PUT',
                body: data,
                redirect: 'follow',
            }),
            invalidatesTags: ['invite']
        }),
        deleteInvite: build.mutation({
            query: (data) => ({
                url: `/invite/${data}`,
                method: 'DELETE',
                redirect: 'follow',
            }),
            invalidatesTags: ['invite']
        }),
    })
})
export const {
    useGetInvitesQuery,
    useLazyGetInvitesQuery,
    useSendInviteMutation,
    useAnswerInviteMutation,
    useDeleteInviteMutation,
} = inviteAPI
