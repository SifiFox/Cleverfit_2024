import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {TrainingType} from '@/features/calendar/model/types/training.ts';
import {Nullable} from '@/features/user/model/slices/user-slice.ts';
import {
    Statuses
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-patners/ui/partner-card/partner-card.tsx';


export type PartnerType = {
    avgWeightInWeek: number,
    id: string,
    imageSrc: string,
    inviteId: Nullable<string>
    name: string,
    status: Nullable<Statuses>
    trainingType: string
}

type WorkoutState = {
    partners: Nullable<PartnerType[]>
    selectedPartner: Nullable<PartnerType>,
    addedTraining: Nullable<TrainingType>
    pals?: Nullable<PartnerType[]>
}
const initialState: WorkoutState = {
    partners: null,
    selectedPartner: null,
    addedTraining: null,
    pals: null
}

export const workoutSlice = createSlice({
    initialState,
    name: 'workout',
    reducers: {
        setPartnerState: (state, action: PayloadAction<PartnerType[]>) => {
            state.partners = action.payload
        },
        updatePartnersState: (state, action) => {
            if(action.payload.to._id){
                state.partners = state.partners
                    ? current(state.partners).map(item =>
                        item.id === action.payload.to._id ? {...item, status: action.payload.status} : item)
                    : state.partners
            }
            if(typeof action.payload.to === 'string'){
                state.partners = state.partners
                    ? current(state.partners).map(item => item.id === action.payload.to ? {...item, status: 'pending'} : item)
                    : state.partners
            }
        },
        setSelectedPartnerState: (state, action: PayloadAction<PartnerType>) => {
            state.selectedPartner = action.payload
        },
        setPalsState: (state, action) => {
            state.pals = action.payload
        },
        updatePalsState: (state, action: PayloadAction<PartnerType>) => {
            state.pals = state.pals?.filter((item: { id: string; }) => item.id !== action.payload.id)
        },
        setAddedTrainingState: (state, action: PayloadAction<PartnerType>) => {
            state.addedTraining = action.payload
        },

        clearWorkoutState: (state) => {
            state.partners = initialState.partners
            state.selectedPartner = initialState.selectedPartner
        }
    },
    selectors: {
        useWorkoutSelector: (state: WorkoutState) => state
    }
})
export const {
    setPartnerState,
    setSelectedPartnerState,
    setAddedTrainingState,
    updatePartnersState,
    setPalsState,
    updatePalsState,
} = workoutSlice.actions
export const {useWorkoutSelector} = workoutSlice.selectors
export default workoutSlice.reducer
