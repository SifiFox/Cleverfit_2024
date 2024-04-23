import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {baseApiQuery} from '@/shared/api/api.ts';

export const  trainingsAPI = createApi({
    reducerPath: 'trainingsAPI',
    baseQuery: fetchBaseQuery(baseApiQuery),
    tagTypes: ['trainings'],
    endpoints: (build) => ({
        getTrainings: build.query({
            query: () => ({
                url: '/training',
                method: 'GET',
                redirect: 'follow',
            }),
            extraOptions: { auth: true },
            providesTags: () => ['trainings']
        }),
        addTraining: build.mutation({
            query: (data) => ({
                url: '/training',
                method: 'POST',
                body: data,
                redirect: 'follow'
            }),
            invalidatesTags: ['trainings']
        }),
        editTraining: build.mutation({
            query: (data) => ({
                url: `/training/${data.id}`,
                method: 'PUT',
                body: data.body,
                redirect: 'follow'
            }),
            invalidatesTags: ['trainings']
        }),
    })
})
export const {
    useLazyGetTrainingsQuery,
    useAddTrainingMutation,
    useEditTrainingMutation
} = trainingsAPI
