import React from 'react';

import styles from '../../../achievements.module.scss'

import {AchievementsLayouts} from '@/features/achievements/constants/constants.tsx';
import {
FormattedTrainingType,
    getDayFullLoad,
    getFullLoad,
    getMaxApproaches,
    getMaxReplays} from '@/features/achievements/helpers/helpers.ts';
import {StatCard} from '@/features/achievements/ui/charts/ui/charts-stats/stat-card/stat-card.tsx';

type ChartsStatsProps = {
    trainings: FormattedTrainingType[],
    period: AchievementsLayouts
}
export const ChartsStats: React.FC<ChartsStatsProps> = (props) => {
    const {trainings} = props
    const fullLoad = getFullLoad(trainings)
    const dayLoad = getDayFullLoad(trainings)
    const maxApproaches = getMaxApproaches(trainings)
    const maxReplays = getMaxReplays(trainings)

    return (
        <div className={styles.chartsStats}>
            <StatCard title="Общая нагрузка, кг" value={fullLoad.toString()} />
            <StatCard title="Нагрузка в день, кг" value={dayLoad.toString()} />
            <StatCard title="Количество повторений, раз" value={maxApproaches.toString()} />
            <StatCard title="Подходы, раз" value={maxReplays.toString()} />
        </div>
    )
}

