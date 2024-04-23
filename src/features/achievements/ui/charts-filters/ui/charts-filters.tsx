import React from 'react';
import {Button} from 'antd';

import styles from '../../achievements.module.scss'

import {TrainingsListItemType} from '@/features/calendar/model/types/training.ts';
import {classNames} from '@/shared/lib/classnames/classnames.ts';

export type FilterType = {
    name: string,
    key: string
}

type ChartsFiltersProps = {
    trainingList?: TrainingsListItemType[],
    selectedFilter: FilterType,
    handleClickFilter: (arg: FilterType) => void
}

export const isFilterSelected = (selectedFilter: FilterType, filter: FilterType) => selectedFilter.key === filter.key

export const ChartsFilters: React.FC<ChartsFiltersProps> = ({trainingList, selectedFilter, handleClickFilter}) => {
    const filtersListArray = trainingList && [{name: 'Все', key: 'all'}, ...trainingList]

    return (
        <div className={styles.filters}>
            <span>Тип тренировки:</span>
            <div className={styles.filtersList}>
                {
                    filtersListArray?.map((item, index) => (
                        <Button
                            type="text"
                            onClick={() => handleClickFilter(item)}
                            key={`filter${index}`}
                            className={classNames(styles.filterButton, {[styles.selectedFilter]: isFilterSelected(selectedFilter, item)})}
                        >
                            {item.name}
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}
