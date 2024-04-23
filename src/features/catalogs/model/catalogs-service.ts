import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {TrainingsListItemType} from '@/features/calendar/model/types/training.ts';
import {baseApiQuery} from '@/shared/api/api.ts';

export const  catalogsAPI = createApi({
    reducerPath: 'catalogsAPI',
    baseQuery: fetchBaseQuery(baseApiQuery),
    tagTypes: ['catalogs', 'list', 'invite'],
    endpoints: (build) => ({
        getTrainingList: build.query<TrainingsListItemType[],boolean>({
            query: () => ({
                url: '/catalogs/training-list',
                method: 'GET',
                redirect: 'follow',
            }),
        }),
        getUserList: build.query({
            query: () => ({
                url: '/catalogs/user-list',
                method: 'GET',
                redirect: 'follow',
            }),
        }),
        getTariffList: build.query({
            query: () => ({
                url: '/catalogs/tariff-list',
                method: 'GET',
                redirect: 'follow',
            }),
        }),
        getTrainingPals: build.query({
            query: () => ({
                url: '/catalogs/training-pals',
                method: 'GET',
                redirect: 'follow',
            }),
            providesTags: () => ['invite']
        }),
        getUserJointTrainingList: build.query({
            query: (body) => ({
                    url: '/catalogs/user-joint-training-list',
                    method: 'GET',
                    redirect: 'follow',
                    params: body
                }),
        }),
    })
})
export const {
    useLazyGetTrainingListQuery,
    useGetTrainingListQuery,
    useGetTariffListQuery,
    useLazyGetUserJointTrainingListQuery,
    useGetTrainingPalsQuery,
    useLazyGetTrainingPalsQuery,
} = catalogsAPI
