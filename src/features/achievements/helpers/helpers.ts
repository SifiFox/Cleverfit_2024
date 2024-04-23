import moment from 'moment';

import {AchievementsLayouts} from '@/features/achievements/constants/constants.tsx';
import {FilterType} from '@/features/achievements/ui/charts-filters/ui/charts-filters.tsx';
import {defaultFormat, shortDate} from '@/features/calendar/const/constants.tsx';
import {
    ExerciseType,
    TrainingType
} from '@/features/calendar/model/types/training.ts';
import {Nullable} from '@/features/user/model/slices/user-slice.ts';

export type FilterTrainingsParams = {
    type: FilterType,
    period: AchievementsLayouts
}

export const filterTrainings = (trainings: Nullable<TrainingType[]>, params: FilterTrainingsParams) => {
    const {type, period} = params
    const filteredArrayByTypes: TrainingType[] = filterByTypes(trainings, type)

    return filterByPeriod(filteredArrayByTypes, period, type)
}

const filterByTypes = (trainings: Nullable<TrainingType[]>, type: FilterType) => {
    const localArray: TrainingType[] = []

    trainings?.filter(training => {
        if(training.name === type.name || type.key === AchievementsLayouts.ALL) localArray.push(training)
    })

    return localArray
}


export type FormattedTrainingType = {
    shortDate: string,
    date: string,
    average: number,
    trainingsNames: string[],
    trainingsByDate: TrainingType[],
    type: FilterType
    exercises?: ExerciseType[],
}
export const filterByPeriod = (trainings: TrainingType[], period: AchievementsLayouts, type: FilterType) => {
    const localArray: FormattedTrainingType[] = []

    if(period === AchievementsLayouts.WEEK){
        for(let i = 0; i <= 6; i++){
            const trainingsByDate: TrainingType[] = trainings.filter(training =>
                moment(training.date).format(shortDate) === moment().subtract(i, 'days').format(shortDate))
            const dateNames: string[] = []

            trainingsByDate.map(training => dateNames.push(training.name))
            if(trainingsByDate.length === 0){
                localArray.unshift({
                    shortDate: moment().subtract(i, 'days').format(shortDate),
                    date: moment().subtract(i, 'days').toISOString(),
                    average: 0,
                    exercises: [],
                    trainingsNames: dateNames,
                    trainingsByDate,
                    type
                })
            }else{
                const dateExercises: ExerciseType[] = []

                trainingsByDate.map(training =>  dateExercises.push(...training.exercises))
                localArray.push({
                    exercises: dateExercises.flat(),
                    average: getAverageLoad(dateExercises.flat()),
                    shortDate: moment().subtract(i, 'days').format(shortDate),
                    date: moment().subtract(i, 'days').toISOString(),
                    trainingsNames: dateNames,
                    trainingsByDate,
                    type
                })
            }
        }
    }
    if(period === AchievementsLayouts.MONTH){
        const today = moment();
        const endDate = today.clone().endOf('week');
        const startDate = endDate.clone().subtract(4, 'weeks').add(1, 'day');
        const dates = [];
        let currentDate = startDate.clone();

        while (currentDate.isSameOrBefore(endDate)) {
            dates.push(currentDate.format(defaultFormat));
            const trainingsByDate = trainings.filter(training => moment(training.date).format(defaultFormat) === currentDate.format(defaultFormat))
            const dateNames: string[] = []

            trainingsByDate.map(training => dateNames.push(training.name))
            if(trainingsByDate.length === 0){
                localArray.unshift({
                    shortDate: currentDate.format(shortDate),
                    date: currentDate.toISOString(),
                    average: 0,
                    exercises: [],
                    trainingsNames: dateNames,
                    trainingsByDate,
                    type
                })
            }else{
                const dateExercises: ExerciseType[] = []

                trainingsByDate.map(training => dateExercises.push(...training.exercises))
                localArray.push({
                    date: currentDate.toISOString(),
                    shortDate: currentDate.format(shortDate),
                    average: getAverageLoad(dateExercises.flat()),
                    exercises: dateExercises,
                    trainingsNames: dateNames,
                    trainingsByDate,
                    type
                })
            }
            currentDate = currentDate.add(1, 'day');
        }
    }

    return localArray.sort((a,b) => moment(a.date).diff(moment(b.date)))
}

export const getAverageLoad = (exercisesArray: ExerciseType[]) => {
    let load = 0

    exercisesArray.map(exercise => {
        if(!exercise || exercise.weight === 0) return 0
        let exerciseLoad = 1

        if(exercise.approaches !== 0 ){
            exerciseLoad *= exercise.approaches ?? 0
        }
        if(exercise.replays !== 0){
            exerciseLoad *= exercise.replays ?? 0
        }
        if(exercise.weight !== 0){
            exerciseLoad *= exercise.weight ?? 0
        }
        load += exerciseLoad
    })

    return Math.round(load / exercisesArray.length)
}

export const getWeeksData = (trainings: FormattedTrainingType[]) => {
    const weeks: (FormattedTrainingType[])[] = []
    const week: FormattedTrainingType[]  = []

    trainings.forEach(training => {
        week.push(training)
        if(week.length === 7){
            weeks.push([...week])
            week.length = 0
        }
    })

    return weeks
}

export const getDayFullLoad = (trainings: FormattedTrainingType[]) => Math.round(getFullLoad(trainings) / trainings.length)
export const notEmptyExercises = (trainings: FormattedTrainingType[]): Array<ExerciseType | undefined> =>
    trainings.flatMap(training => training.exercises).filter(item => item?.weight !== 0)
export const getFullLoad = (trainings: FormattedTrainingType[]) => {
    const notEmptyExercises =
        trainings.flatMap(training => training.exercises).filter(item => item?.weight !== 0)

    return notEmptyExercises.reduce((sum, current) =>  {
        const approaches = current?.approaches ?? 0;
        const replays = current?.replays ?? 0;
        const weight = current?.weight ?? 0;

        return sum + approaches * replays * weight;
    }, 0)
}
export const getMaxApproaches = (trainings: FormattedTrainingType[]) => {
    if(notEmptyExercises(trainings).length === 0){
        return 0
    }

    return notEmptyExercises(trainings).reduce((sum, training) => {
        if (training?.approaches !== undefined) {
            return sum + training.approaches;
        }

        return sum;
    }, 0);
};
export const getMaxReplays = (trainings: FormattedTrainingType[]) => {
    if(notEmptyExercises(trainings).length === 0){
        return 0
    }

    return notEmptyExercises(trainings).reduce((sum, training) => {
        if (training?.replays !== undefined) {
            return sum + training.replays;
        }

        return sum;
    }, 0);
}

export const findMostFrequentString = (strings: string[] ): string => {
    if(strings.length !== 0){
        const stringCounts = strings.reduce((acc, str) => {
            acc[str] = (acc[str] || 0) + 1;

            return acc;
        }, {} as { [key: string]: number });

        const [mostFrequentString] = Object.entries(stringCounts).reduce((max, current) => current[1] > max[1] ? current : max);

        return mostFrequentString;
    }

    return ''
}
