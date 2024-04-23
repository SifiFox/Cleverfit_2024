import {createReduxHistoryContext} from 'redux-first-history';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {createBrowserHistory} from 'history';

import {changePassAPI} from '@/features/auth/model/services/change-password-service.ts';
import {recoverAPI} from '@/features/auth/model/services/check-email-service.ts';
import {confirmEmailAPI} from '@/features/auth/model/services/confirm-email-service.ts';
import {loginAPI} from '@/features/auth/model/services/login-service.tsx';
import {registrationAPI} from '@/features/auth/model/services/registration-service.ts';
import authSlice from '@/features/auth/model/slices/auth-slice.ts';
import {trainingsAPI} from '@/features/calendar/model/services/trainings-service.ts';
import trainingsSlice from '@/features/calendar/model/slices/trainings-slice.ts';
import {catalogsAPI} from '@/features/catalogs/model/catalogs-service.ts';
import {feedbacksAPI} from '@/features/feedbacks/model/services/feedbacks-service.ts';
import {inviteAPI} from '@/features/invite/model/invite-service.ts';
import invitesSlice from '@/features/invite/model/slices/invite-slice.ts';
import userSlice from '@/features/user/model/slices/user-slice.ts';
import {userAPI} from '@/features/user/model/user-service.ts';
import workoutSlice from '@/features/workout/model/slices/workout-slice.ts';
import loaderSlice from '@/shared/ui/loader/model/loader-slice.ts';
import modalSlice from '@/widgets/custom-modal/model/modal-slice.ts';
import resultSlice from '@/widgets/result/model/slices/result-slice.ts';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer,
} = createReduxHistoryContext({history: createBrowserHistory(), savePreviousLocations: 5});

export const rootReducer = combineReducers({
    router: routerReducer,
    loader: loaderSlice,
    result: resultSlice,
    modal: modalSlice,
    auth: authSlice,
    trainings: trainingsSlice,
    user: userSlice,
    workout: workoutSlice,
    invites: invitesSlice,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [registrationAPI.reducerPath]: registrationAPI.reducer,
    [recoverAPI.reducerPath]: recoverAPI.reducer,
    [confirmEmailAPI.reducerPath]: confirmEmailAPI.reducer,
    [changePassAPI.reducerPath]: changePassAPI.reducer,
    [feedbacksAPI.reducerPath]: feedbacksAPI.reducer,
    [trainingsAPI.reducerPath]: trainingsAPI.reducer,
    [catalogsAPI.reducerPath]: catalogsAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [inviteAPI.reducerPath]: inviteAPI.reducer,
})

export const setupStore = () => configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
            .concat(routerMiddleware)
            .concat(loginAPI.middleware)
            .concat(registrationAPI.middleware)
            .concat(recoverAPI.middleware)
            .concat(confirmEmailAPI.middleware)
            .concat(changePassAPI.middleware)
            .concat(feedbacksAPI.middleware)
            .concat(trainingsAPI.middleware)
            .concat(catalogsAPI.middleware)
            .concat(userAPI.middleware)
            .concat(inviteAPI.middleware)
    })

export const store = setupStore()
export const history = createReduxHistory(store)
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
