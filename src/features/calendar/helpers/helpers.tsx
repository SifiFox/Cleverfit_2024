import moment, {Moment} from 'moment/moment';

import {defaultFormat} from '@/features/calendar/const/constants.tsx';
import {
    ExerciseType,
    TrainingsListItemType, TrainingsTypes,
    TrainingType
} from '@/features/calendar/model/types/training.ts';

export const getUnusedTrainings = (trainingsList: TrainingsListItemType[], trainingsByDay: TrainingType[] | null | undefined) => trainingsByDay ? trainingsList.filter(obj => !trainingsByDay.some(item => item.name === obj.name)) : trainingsList
export const formattedDate = (date: moment.Moment | string | undefined) => moment(date).format(defaultFormat)
export const filterTrainingsByDate = (date: Moment | string, trainings: TrainingType[]) => {
    const filteredTrainings = trainings.filter(training => formattedDate(training.date) === date)

    return filteredTrainings.length > 0 ? filteredTrainings : null
}
export const isToday = (date: Moment | string | undefined) => date ? formattedDate(moment()) === formattedDate(date) : null
export const isDateBefore = (date: Moment | string | undefined) =>  (moment().unix() - moment(date).unix()) > 0


export const isEqualExercises = (data1: ExerciseType[] | undefined, data2: ExerciseType[] | null | undefined) => {
    if (!data1 || !data2) return false
    if (data1 && !('exercises' in data1) || data2 && !('exercises' in data2)) return false
    if (data1?.length !== data2?.length) return false
    if (JSON.stringify(data1) === JSON.stringify(data2)) {
        return true
    }
    data1?.forEach(item => {
        const equalEl = data2?.find(exercise =>
            exercise.name === item.name &&
            exercise.replays === item.replays &&
            exercise.weight === item.weight &&
            exercise.approaches === item.approaches
        )

        if (!equalEl) return false;
    })

    return false
}

export const getTrainingType = (trainingsList: TrainingsListItemType[] | undefined, selectedTraining: TrainingType) => trainingsList?.find((item: { name: string; }) => selectedTraining.name === item.name) ?? {key: TrainingsTypes.LEGS}
