import React from 'react';

import styles from '@/features/calendar/ui/custom-popover/ui/custom-popover.module.scss';

import {
    BadgesProps
} from '@/features/calendar/model/types/training.ts';
import {BadgesItem} from '@/features/calendar/ui/badges/badges-item/badges-item.tsx';
import {useGetTrainingListQuery} from '@/features/catalogs/model/catalogs-service.ts';


export const Badges: React.FC<BadgesProps> = (props: BadgesProps) => {
    const {
        cellItems,
        editable,
        handleChangeCardType,
        handleSelect
    } = props
    const {data: trainingsList} = useGetTrainingListQuery(false)

    if (cellItems && trainingsList) {
        return (
            <ul className={styles.badgesWrapper}>
                {cellItems.map((item, index) =>
                    <BadgesItem
                        key={index}
                        item={item}
                        trainingsList={trainingsList}
                        index={index}
                        editable={editable}
                        handleChangeCardType={handleChangeCardType}
                        handleSelect={handleSelect}
                    />
                )}
            </ul>
        )
    }

    return null

}
