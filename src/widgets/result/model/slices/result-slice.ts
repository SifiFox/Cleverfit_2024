import {ReactNode} from 'react';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ResultStatusType} from 'antd/lib/result';

export type ResultSliceState = {
    inited: boolean
    title: string,
    subtitle: string,
    buttonTitle: string,
    status?: ResultStatusType,
    extra?: ReactNode
}

const initialState: ResultSliceState = {
    inited: false,
    title: '',
    subtitle: '',
    buttonTitle: '',
    status: undefined,
}

export const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setResult: (state: ResultSliceState, action: PayloadAction<ResultSliceState>) => {
            // eslint-disable no-param-reassign
            state.inited = action.payload.inited
            state.title = action.payload.title
            state.subtitle = action.payload.subtitle
            state.status = action.payload.status
            state.extra = action.payload.extra
            // eslint-disable  no-param-reassign
        },
        clearResult: (state: ResultSliceState) => {
            // eslint-disable
            state.inited = false
            state.title = ''
            state.subtitle = ''
            state.status = undefined
            state.extra = ''
            // eslint-disable
        },
    },
    selectors: {
        useResultDataSelector: (state) => state
    }
})

export const { setResult, clearResult } = resultSlice.actions
export const { useResultDataSelector } = resultSlice.selectors

export default resultSlice.reducer
