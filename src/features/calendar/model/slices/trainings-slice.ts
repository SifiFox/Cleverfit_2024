import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Moment} from 'moment';

import {ExerciseType, TrainingsListItemType,TrainingType} from '@/features/calendar/model/types/training.ts';
import {Nullable} from '@/features/user/model/slices/user-slice.ts';


export enum DrawerTypes {
    ADD = 'add',
    EDIT = 'edit',
    VIEW = 'view',
    TRAINING_NEW = 'training_new',
    TRAINING_EDIT = 'training_edit',
    JOINT = 'joint'
}

export type DrawerExercise = {
    id?: string,
    name?: string,
    remove?: boolean,
    approaches?: number,
    weight?: number,
    replays?: number
}

export type DrawerState = {
    open: boolean,
    exercises?: Nullable<DrawerExercise[]>,
}

type SaveBodyType = {
    name?: string,
    exercises?: ExerciseType[],
    date?: Moment | string,
    isImplementation?: Nullable<boolean>
}

export type SaveDataType = {
    id?: string,
    body?: SaveBodyType,
    name?: string,
    exercises?: ExerciseType[] | TrainingsListItemType[],
    date?: Moment | string
}

type SaveType = {
    readyToSave: boolean;
    saveData?: SaveDataType;
}

type TrainingsState = {
    [key: string]:
        | TrainingType
        | TrainingType[]
        | TrainingsListItemType
        | TrainingsListItemType[]
        | SaveType
        | DrawerState
        | Moment
        | undefined
        | null
        | string;
    trainings?: Nullable<TrainingType[]>;
    trainingsListState?: TrainingsListItemType[];
    selectedDate?: Moment | string;
    selectedTraining?: Nullable<TrainingType | TrainingsListItemType>;
    toSaveState?: SaveType
    drawerState?: Nullable<DrawerState>;
    drawerType?: DrawerTypes;
};



const initialState: TrainingsState = {
    trainings: null,
    trainingsListState: [],
    selectedTraining: null,
    selectedDate: '',
    toSaveState: {
        readyToSave: false
    },
    drawerState: {
        open: false,
        exercises: null,
    },
    drawerType: DrawerTypes.ADD
}

export const trainingsSlice = createSlice({
    name: 'trainings',
    initialState,
    reducers: {
        setTrainingsState: (state: TrainingsState, action: PayloadAction<TrainingsState>) => {
            for (const [key, value] of Object.entries(action.payload)) {
                /* eslint-disable-next-line */
                state[key] = JSON.parse(JSON.stringify(value))
            }
        }
    },
    selectors: {
        useTrainingsSelector: (state: TrainingsState) => state
    }
})
export const {
    setTrainingsState,
} = trainingsSlice.actions
export const {useTrainingsSelector} = trainingsSlice.selectors
export default trainingsSlice.reducer
