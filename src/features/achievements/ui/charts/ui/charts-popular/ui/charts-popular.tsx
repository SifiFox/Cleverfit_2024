import React from 'react';

import styles from '../../../../achievements.module.scss'

import {AchievementsLayouts} from '@/features/achievements/constants/constants.tsx';
import {FormattedTrainingType} from '@/features/achievements/helpers/helpers.ts';
import {
    getDayExercises
} from '@/features/achievements/ui/charts/ui/charts-popular/helpers/helpers.tsx';
import {
    ChartsPie
} from '@/features/achievements/ui/charts/ui/charts-popular/ui/charts-pie/charts-pie.tsx';
import {
    ChartsPopularList
} from '@/features/achievements/ui/charts/ui/charts-popular/ui/charts-popular-list/charts-popular-list.tsx';
import {
    MostPopular
} from '@/features/achievements/ui/load-list/ui/load-list-item/load-list-item.tsx';
import {ExerciseType} from '@/features/calendar/model/types/training.ts';

type ChartsPopularProps = {
    trainings: FormattedTrainingType[],
    period: AchievementsLayouts
}

export type PopularTrainingsType = {
    date: string,
    dayOfWeek: string,
    exercises: ExerciseType[],
    mostPopular: MostPopular
}
export const ChartsPopular: React.FC<ChartsPopularProps> = (props) => {
    const {trainings, period} = props
    const populars = getDayExercises(trainings)

    return (
        <div className={styles.statsBottom}>
            <ChartsPie trainings={populars}/>
            <ChartsPopularList trainings={populars} period={period}/>
        </div>
    )
}
