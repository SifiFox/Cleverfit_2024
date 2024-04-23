import React from 'react';
import moment, {Moment} from 'moment';

import styles from '../../../achievements.module.scss'

import {FormattedTrainingType} from '@/features/achievements/helpers/helpers.ts';
import {
    PopularTrainingsType
} from '@/features/achievements/ui/charts/ui/charts-popular/ui/charts-popular.tsx';
import {classNames} from '@/shared/lib/classnames/classnames.ts';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
    weekdays: [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
    ]
});

export enum ListItemTypes {
    DEFAULT = 'default',
    RED = 'red'
}

export type MostPopular = {
    name: string,
    count: number
}

export type DayData = {
    title: string,
    canHide: boolean,
    day: FormattedTrainingType,
    date?: Moment,
    dayOfWeek?: number,
    mostPopular?: MostPopular
}
export type LoadListItemProps = {
    type: ListItemTypes
    dayData: DayData | PopularTrainingsType,
}

const isDayData = (data: DayData | PopularTrainingsType): data is DayData => 'day' in data

export const LoadListItem: React.FC<LoadListItemProps> = (props) => {
    const {dayData, type = ListItemTypes.DEFAULT} = props

    if (type === ListItemTypes.DEFAULT && isDayData(dayData)) {
        const { day, title } = dayData;

        return (
            <div className={styles.loadListItem}>
                <span className={classNames(styles.weekDay, {[styles.weekDayFilled]: !!day.average})}>{moment(day.date).weekday() + 1}</span>
                    <span className={styles.dayTitle}>{title}</span>
                    <span className={styles.loadListItemValue}>
                    {day.average > 0 && `${day.average} кг`}
                    </span>
            </div>
        )
    }
    if (type === ListItemTypes.RED) {
        return (
            <div className={styles.loadListItem}>
                <span className={classNames(styles.weekDayRed, {[styles.weekDayFilledRed]: !!dayData?.mostPopular?.name})}>{moment(dayData.date).weekday() + 1}</span>
                    <span className={styles.dayTitle}>{dayData?.dayOfWeek}</span>
                    <span className={styles.loadListItemValue}>{dayData?.mostPopular?.name}</span>
            </div>
        )
    }

    return null
}
