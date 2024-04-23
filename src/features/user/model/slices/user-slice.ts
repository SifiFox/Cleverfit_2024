import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Moment} from 'moment';


export type Nullable<T> = null | T

export type UserDataType = {
    email: string,
    firstName: string,
    lastName: string,
    birthday: Moment | string,
    readyForJointTraining: boolean,
    sendNotification: boolean,
    tariff: Nullable<UserTariff>,
    imgSrc?: string,
    password?: string,
}

type Period = {
    cost: number,
    days: number,
    text: string
}
export type Tariff = {
    name: string,
    _id: string,
    periods: Nullable<Period[]>
}

export type UserTariff = {
    tariffId: string,
    expired: string
}

type UserState = {
    userData: UserDataType,
    tariffList:  Nullable<Tariff[]>
}

const initialState: UserState = {
    userData: {
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        readyForJointTraining: false,
        sendNotification: false,
        imgSrc: '',
        password: '',
        tariff: null
    },
    tariffList: null
}

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setUserState: (state, action: PayloadAction<any>) => {
            state.userData = {...state.userData, ...action.payload.userData}
            state.tariffList = {...state.tariffList, ...action.payload.tariffList}
        },
        clearUserState: (state) => {
            state.userData = initialState.userData
            state.tariffList = initialState.tariffList
        }
    },
    selectors: {
        useUserSelector: (state) => state
    }
})
export const {
    setUserState,
    clearUserState
} = userSlice.actions
export const {useUserSelector} = userSlice.selectors
export default userSlice.reducer
