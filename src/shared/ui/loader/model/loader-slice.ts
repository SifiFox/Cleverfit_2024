import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {useAppSelector} from '@/hooks';


type LoaderState = {
    loading: boolean
}

const initialState: LoaderState = {
    loading: false,
}

export const loaderSlice = createSlice({
    name: 'loaderSlice',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
})

export const { setLoading } = loaderSlice.actions
export const useIsLoadingSelector = () => useAppSelector(state => state.loader.loading)
export default loaderSlice.reducer
