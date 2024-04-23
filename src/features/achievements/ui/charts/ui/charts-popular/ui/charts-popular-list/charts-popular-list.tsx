import React, {useId} from 'react';
import moment from 'moment';

import styles from '../charts-popular.module.scss'

import {AchievementsLayouts} from '@/features/achievements/constants/constants.tsx';
import {
    PopularTrainingsType
} from '@/features/achievements/ui/charts/ui/charts-popular/ui/charts-popular.tsx';
import {
    ListItemTypes,
    LoadListItem
} from '@/features/achievements/ui/load-list/ui/load-list-item/load-list-item.tsx';

type ChartsPopularListProps = {
    trainings: PopularTrainingsType[],
    period: AchievementsLayouts
}
const popularByWeekDay = 'Самые частые  упражнения по дням недели';

export const ChartsPopularList: React.FC<ChartsPopularListProps> = (props) => {
    const {trainings, period} = props
    const weekData = trainings.sort((a,b) => moment(a.date).weekday() - moment(b.date).weekday())

    return (
        <div>
            <span className={styles.chartsPopularListTitle}>{popularByWeekDay} {period === AchievementsLayouts.MONTH && ' за месяц'}</span>
            {
                weekData.map(day => (
                    <LoadListItem key={useId()} type={ListItemTypes.RED} dayData={day} />
                ))
            }
        </div>
    )
}
