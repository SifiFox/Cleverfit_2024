import React, {useMemo} from 'react';

import styles from '../../achievements.module.scss'

import {AchievementsLayouts} from '@/features/achievements/constants/constants.tsx';
import {
    FormattedTrainingType
} from '@/features/achievements/helpers/helpers.ts';
import {ChartsEmpty} from '@/features/achievements/ui/charts/ui/charts-empty/ui/charts-empty.tsx';
import {ChartsOften} from '@/features/achievements/ui/charts/ui/charts-often/charts-often.tsx';
import {
    ChartsPopular
} from '@/features/achievements/ui/charts/ui/charts-popular/ui/charts-popular.tsx';
import {ChartsStats} from '@/features/achievements/ui/charts/ui/charts-stats/charts-stats.tsx';
import {
    ChartsFilters, FilterType
} from '@/features/achievements/ui/charts-filters/ui/charts-filters.tsx';
import {LoadGraphic} from '@/features/achievements/ui/load-graphic/ui/load-graphic.tsx';
import {LoadList} from '@/features/achievements/ui/load-list/ui/load-list.tsx';
import {TrainingsListItemType} from '@/features/calendar/model/types/training.ts';
import {classNames} from '@/shared/lib/classnames/classnames.ts';

type AdditionalChartProps = {
    trainingsListState: TrainingsListItemType[],
    selectedFilter: FilterType,
    handleClickFilter: (arg: FilterType) => void,
    filteredTrainings: FormattedTrainingType[]
}

type ChartsProps = {
    period: AchievementsLayouts,
    additionalProps?: AdditionalChartProps
}
export const Charts: React.FC<ChartsProps> = (props) => {
    const {additionalProps, period} = props

    if (additionalProps) {
        const {
            handleClickFilter,
            selectedFilter,
            trainingsListState,
            filteredTrainings
        } = additionalProps
        const exercisesByPeriod = useMemo(() => filteredTrainings.flatMap(training => training.exercises), [filteredTrainings]);

        return (
            <div className={styles.charts}>
                <ChartsFilters trainingList={trainingsListState} selectedFilter={selectedFilter}
                               handleClickFilter={(item) => handleClickFilter(item)}/>
                {
                    exercisesByPeriod.length === 0
                        ? <ChartsEmpty/>
                        : <React.Fragment>
                            <div
                                className={classNames(styles.chartsTopData, {[styles.chartsTopDataFull]: period !== AchievementsLayouts.WEEK})}>
                                <figure
                                    className={classNames(styles.graphicWrapper, {[styles.full]: period !== AchievementsLayouts.WEEK})}>
                                    <LoadGraphic trainings={filteredTrainings} period={period}/>
                                    <figcaption>Нагрузка, кг</figcaption>
                                </figure>
                                <LoadList trainings={filteredTrainings} period={period}/>
                            </div>
                            <ChartsStats trainings={filteredTrainings} period={period}/>
                            <ChartsOften
                                trainings={filteredTrainings}
                            />
                            <ChartsPopular
                                trainings={filteredTrainings}
                                period={period}
                            />
                        </React.Fragment>
                }
            </div>
        )
    }
 
        return null
    
}
