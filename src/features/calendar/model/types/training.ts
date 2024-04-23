import {BadgeProps} from 'antd'
import {Moment} from 'moment';

import {DrawerTypes} from '@/features/calendar/model/slices/trainings-slice.ts';
import {Nullable} from '@/features/user/model/slices/user-slice.ts';
import {PartnerType} from '@/features/workout/model/slices/workout-slice.ts';


export type ExerciseType = {
    name: string,
    _id?: string
    approaches?: number,
    isImplementation?: boolean
    replays?: number,
    weight?: number,
}

export type DrawerExercise = Omit<ExerciseType, '_id'>


export type ParameterType = {
    jointTraining: boolean,
    participants: [],
    period: number,
    repeat: boolean
}

export type TrainingType = {
    name: string,
    exercises: ExerciseType[] | DrawerExercise[] | [],
    date?: Moment | string,
    userId?: string,
    _id?: string
    isImplementation?: boolean,
    parameters?: ParameterType,
}

export type TrainingsListItemType = {
    _id?: string,
    exercises?: ExerciseType[],
    name: string,
    key: TrainingsTypes
}


export enum TrainingsTypes {
    LEGS = 'legs',
    STRENGTH = 'strength',
    HANDS = 'hands',
    CHEST = 'chest',
    BACK = 'back'
}
export const ColorByType: {[typeName: string]: BadgeProps['status'];} = {
    [TrainingsTypes.LEGS]: 'error',
    [TrainingsTypes.STRENGTH]: 'processing',
    [TrainingsTypes.HANDS]: 'default',
    [TrainingsTypes.CHEST]: 'success',
    [TrainingsTypes.BACK]: 'warning'
}


export enum CardTypes {
    BASIC = 'basic',
    ADD = 'add'
}

export type CardBasicTitleProps = {
    onClose: () => void,
    date?: Moment | string
    isEmpty?: boolean,
    trainings: boolean
}

export type CardAddTitleProps = {
    onSelect: (arg0: string) => void,
    selectOptions: TrainingsListItemType[],
    trainings: boolean
    handleClickBack: () => void,
    date?: Moment | string,
}

export type BadgesProps = {
    handleChangeCardType?: (arg0: CardTypes) => void,
    cellItems?: TrainingType[] | null,
    editable?: boolean,
    onSelect?: (arg0: string) => void,
    handleSelect?: (arg0: string) => void
}

export type BadgesItemProps = {
    item: TrainingType,
    trainingsList: TrainingsListItemType[],
    index: number,
    editable?: boolean,
    handleChangeCardType?: (arg0: CardTypes) => void,
    handleSelect?: (arg0: CardTypes) => void
}

export type TrainingCardProps = {
    onClose: () => void,
    trainingsList: TrainingsListItemType[],
    showDrawer: () => void
    trainings?: TrainingType[] | null,
    date?: Moment | string,
}



export type DrawerSelectedTraining = {
    isImplementation?: boolean,
    _id: string,
    name?: string;
    exercises?: ExerciseType[] | null

}

export type TrainingDrawerProps = {
    selectedTraining?: TrainingType | DrawerSelectedTraining | null
}


export type CalendarProps = {
    trainings: TrainingType[]
}


export type CustomPopoverProps = {
    onClose: () => void,
    trainings: TrainingType[],
    trainingsList: TrainingsListItemType[]
}


export type DrawerHeaderProps = {
    onClose: () => void,
    type: DrawerTypes
    selectedTraining?: TrainingType | null,
    trainingsList?: TrainingsListItemType[],
    selectedDate?: Moment | string,
    withoutBadge?: boolean
    selectedPartner?: Nullable<PartnerType>
}
