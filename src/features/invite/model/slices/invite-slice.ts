import {createSlice,  PayloadAction} from '@reduxjs/toolkit';
import {Moment} from 'moment';

import {TrainingType} from '@/features/calendar/model/types/training.ts';
import {Nullable} from '@/features/user/model/slices/user-slice.ts';

export type InviteType = {
    _id: string,
    from: {
        _id: string,
        firstName: null,
        lastName: null,
        imageSrc: null
    },
    training: TrainingType,
    status: string,
    createdAt: Moment | string
}

type InvitesType = {
    invites: Nullable<InviteType[]>
}

const initialState: InvitesType = {
    invites: null
}

export const invitesSlice = createSlice({
    initialState,
    name: 'invites',
    reducers: {
        setInvitesState: (state, action: PayloadAction<InviteType[]>) => {
            state.invites = action.payload
        }
    },
    selectors: {
        useInvitesSelector: (state: InvitesType) => state
    }
})
export const {
    setInvitesState
} = invitesSlice.actions
export const {useInvitesSelector} = invitesSlice.selectors
export default invitesSlice.reducer
