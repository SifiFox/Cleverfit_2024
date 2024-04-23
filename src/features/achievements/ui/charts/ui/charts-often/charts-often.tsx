import React from 'react';

import styles from '../../../achievements.module.scss'

import {
    findMostFrequentString, FormattedTrainingType
} from '@/features/achievements/helpers/helpers.ts';

type ChartsOftenProps = {
    trainings: FormattedTrainingType[]
}
export const ChartsOften: React.FC<ChartsOftenProps> = (props) => {
    const {trainings} = props
    const names = trainings.flatMap(training => training.trainingsNames)
    const exercisesNames = trainings?.flatMap(training => training.exercises).map(exercise => exercise?.name ?? '')
    const popularTraining = findMostFrequentString(names)
    const popularExercise = findMostFrequentString(exercisesNames)

    return (
        <div className={styles.oftenWrapper}>
            {trainings[0].type.key === 'all' && popularTraining && <p><span
                className={styles.oftenTitle}>Самая частая тренировка: </span><span>{popularTraining}</span>
            </p>}
            {popularExercise && <p><span
                className={styles.oftenTitle}>Самое частое упражнение: </span><span>{popularExercise}</span>
            </p>}
        </div>
    )
}
