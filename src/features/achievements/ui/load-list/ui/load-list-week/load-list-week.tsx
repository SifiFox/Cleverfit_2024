import React, {useId, useState} from 'react';
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import moment, {MomentInput} from 'moment/moment';

import styles from '../../../achievements.module.scss'

import {AchievementsLayouts} from '@/features/achievements/constants/constants.tsx';
import {FormattedTrainingType} from '@/features/achievements/helpers/helpers.ts';
import {
    ListItemTypes,
    LoadListItem
} from '@/features/achievements/ui/load-list/ui/load-list-item/load-list-item.tsx';
import {defaultFormat, shortDate, withoutYear} from '@/features/calendar/const/constants.tsx';
import {useWindowWidth} from '@/hooks';
import {isDesktopWidth} from '@/shared/const/constants.tsx';
import {classNames} from '@/shared/lib/classnames/classnames.ts';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
    weekdays: [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
    ]
});

type LoadListWeekProps = {
    week: FormattedTrainingType[],
    period: AchievementsLayouts
}
export const LoadListWeek: React.FC<LoadListWeekProps> = (props) => {
    const {week, period} = props
    const [hidden, setHidden] = useState(true)
    const windowWidth = useWindowWidth()

    const weekData = period === AchievementsLayouts.WEEK
        ? week.sort((a: { date: MomentInput; }, b: {
            date: MomentInput;
        }) => moment(a.date).weekday() - moment(b.date).weekday())
        : week

    const handleClickTitle = () => setHidden(prev => !prev)

    return (
        <div className={classNames(styles.loadListWeek,
            {[styles.loadListWeekHidden]: (period !== AchievementsLayouts.WEEK && hidden && !isDesktopWidth(windowWidth))})}
        >
            {period !== AchievementsLayouts.WEEK &&
                <div className={styles.weekTitle} onClick={handleClickTitle}>
                    <span>Неделя {moment(week[0].date).format(shortDate)} - {moment(week[6].date).format(shortDate)}</span>
                    {!isDesktopWidth(windowWidth) && (hidden ? <DownOutlined/> : <UpOutlined/>)}
                </div>
            }
            {
                weekData.map((day: FormattedTrainingType) => (
                    <LoadListItem
                        key={useId()}
                        type={ListItemTypes.DEFAULT}
                        dayData={{
                            day,
                            title: moment(day.date).format(period === AchievementsLayouts.WEEK ? withoutYear : defaultFormat),
                            canHide: period !== AchievementsLayouts.WEEK
                        }}
                    />
                ))
            }
        </div>
    )
}
