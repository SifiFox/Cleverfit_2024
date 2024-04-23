import React from 'react';

import styles from '../../achievements.module.scss'

import {AchievementsLayouts} from '@/features/achievements/constants/constants.tsx';
import {FormattedTrainingType, getWeeksData} from '@/features/achievements/helpers/helpers.ts';
import {
    LoadListWeek
} from '@/features/achievements/ui/load-list/ui/load-list-week/load-list-week.tsx';
import {classNames} from '@/shared/lib/classnames/classnames.ts';

type LoadListProps = {
    trainings: FormattedTrainingType[],
    period: AchievementsLayouts
}

export const LoadList: React.FC<LoadListProps> = (props) => {
    const  {trainings, period} = props
    const weeks = getWeeksData(trainings)

    return (
        <div className={styles.loadList}>
            {
                period === AchievementsLayouts.WEEK &&
                <p>Средняя силовая нагрузка по дням недели</p>
            }
            <div className={classNames(styles.loadLists, {[styles.loadListsMonth]: period === AchievementsLayouts.MONTH})}>
                {
                    weeks.map((week, index) => (
                        <LoadListWeek key={`loadWeed${index}`} week={week} period={period}/>
                    ))
                }
            </div>
        </div>
    )
}


