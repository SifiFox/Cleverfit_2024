import moment from 'moment';

import {FormattedTrainingType} from '@/features/achievements/helpers/helpers.ts';
import {withoutYear} from '@/features/calendar/const/constants.tsx';
import {ExerciseType} from '@/features/calendar/model/types/training.ts';


type ExerciseCount = {
    name: string;
    count: number;
}

export const getDayExercises = (trainings: FormattedTrainingType[]): Array<{
    date: string;
    dayOfWeek: string;
    exercises: ExerciseType[];
    mostPopular: { name: string; count: number }
}> => {
    const weeklyExercises: { [dayOfWeek: string]: ExerciseType[] } = {};
    const weeklyDays: { [dayOfWeek: string]: string } = {};

    trainings.forEach((training) => {
        const dayOfWeek = moment(training.date).format(withoutYear);

        if (!weeklyExercises[dayOfWeek]) {
            weeklyExercises[dayOfWeek] = [];
            weeklyDays[dayOfWeek] = ''
        }
        training?.exercises && weeklyExercises[dayOfWeek].push(...training?.exercises);
        weeklyDays[dayOfWeek] = training?.date;
    });

    return Object.entries(weeklyExercises).map(([dayOfWeek, exercises]) => ({
        dayOfWeek,
        exercises,
        date: weeklyDays[dayOfWeek],
        mostPopular: {
            name: findMostPopularExercise(exercises),
            count: exercises.filter(item => item.name === findMostPopularExercise(exercises)).length
        }
    }));
}

export const findMostPopularExercise = (exercises: ExerciseType[]): string => {
    const exerciseCounts: { [name: string]: number } = {};

    exercises.forEach((exercise) => {
        if (exercise.name) {
            exerciseCounts[exercise.name] = (exerciseCounts[exercise.name] || 0) + 1;
        }
    });
    let mostPopularExercise = '';
    let maxCount = 0;

    for (const exerciseName in exerciseCounts) {
        if (exerciseCounts[exerciseName] > maxCount) {
            mostPopularExercise = exerciseName;
            maxCount = exerciseCounts[exerciseName];
        }
    }

    return mostPopularExercise;
}

export const aggregateExerciseCounts = (exerciseCountArray: ExerciseCount[]): ExerciseCount[] => {
    const aggregatedExercises: { [name: string]: number } = {};

    exerciseCountArray.forEach(({name, count}) => {
        if (aggregatedExercises[name]) {
            aggregatedExercises[name] += count;
        } else {
            aggregatedExercises[name] = count;
        }
    });

    return Object.entries(aggregatedExercises).map(([name, count]) => ({name, count}));
}
