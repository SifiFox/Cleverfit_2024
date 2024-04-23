import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {baseApiQuery} from '@/shared/api/api.ts';

export const  feedbacksAPI = createApi({
    reducerPath: 'feedbacksAPI',
    baseQuery: fetchBaseQuery(baseApiQuery),
    tagTypes: ['feedbacks'],
    endpoints: (build) => ({
        getFeedbacks: build.query({
            query: () => ({
                url: '/feedback',
                method: 'GET',
                redirect: 'follow',
            }),
            extraOptions: { auth: true },
            providesTags: () => ['feedbacks']
        }),
        sendFeedback: build.mutation({
            query: (data) => ({
                url: '/feedback',
                method: 'POST',
                body: data,
                redirect: 'follow'
            }),
            invalidatesTags: ['feedbacks']
        }),
    })
})
export const { useLazyGetFeedbacksQuery, useSendFeedbackMutation } = feedbacksAPI
