import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ACCESSTOKEN_LOCALSTORAGE_KEY} from '@/shared/const/localstorage.ts';

type TChangePass = {
    password: string,
    confirmPassword: string
}

type TResult = {
    inited: boolean
    title: string
    subtitle: string
    buttonTitle: string
}

type TCheckEmail = {
    checkEmail: boolean
    email: string
}

type AuthState = {
    auth: string | null,
    result: TResult,
    checkEmail: TCheckEmail,
    currentEmail: string | null,
    changePassStoreData: TChangePass,
}

const initialState: AuthState = {
    auth: localStorage.getItem(ACCESSTOKEN_LOCALSTORAGE_KEY),
    result: {
        inited: false,
        title: '',
        subtitle: '',
        buttonTitle: ''
    },
    checkEmail: {
        checkEmail: false,
        email: ''
    },
    currentEmail: sessionStorage.getItem('email'),
    changePassStoreData: {
        password: '',
        confirmPassword: ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state: AuthState, action: PayloadAction<AuthState>) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state[key] = value
            }
        },
        initAuth: (state: AuthState) => {
            if(localStorage.getItem(ACCESSTOKEN_LOCALSTORAGE_KEY)) {
                state.auth = localStorage.getItem(ACCESSTOKEN_LOCALSTORAGE_KEY)
            }else{
                state.auth = null
            }
        },
        logout: (state: AuthState) => {
            const token = localStorage.getItem(ACCESSTOKEN_LOCALSTORAGE_KEY)

            if(token){
                localStorage.removeItem(ACCESSTOKEN_LOCALSTORAGE_KEY)
            }
            state.auth = null
        },
        setCheckEmail: (state: AuthState, action: PayloadAction<TCheckEmail>) => {
            state.checkEmail.checkEmail = true;
            state.checkEmail.email = action.payload.email
        },
        setCurrentEmail: (state: AuthState, action: PayloadAction<string>) => {
            state.currentEmail = action.payload
        },
        setChangePassData: (state: AuthState, action: PayloadAction<TChangePass>) => {
            state.changePassStoreData.password = action.payload.password
            state.changePassStoreData.confirmPassword = action.payload.confirmPassword
        }

    },
    selectors: {
        useAuthSelector: (state) => state
    }
})
export const {
    setAuthState,
    initAuth,
    logout,
    setCheckEmail,
    setCurrentEmail,
    setChangePassData
} = authSlice.actions
export const {useAuthSelector} = authSlice.selectors
export default authSlice.reducer
