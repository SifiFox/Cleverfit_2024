import React from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Button, Select} from 'antd';

import styles from '@/features/calendar/ui/custom-popover/ui/custom-popover.module.scss';

import {useTrainingsSelector} from '@/features/calendar/model/slices/trainings-slice.ts';
import {CardAddTitleProps} from '@/features/calendar/model/types/training.ts';
import {useAppSelector} from '@/hooks';

export const CardAddTitle: React.FC<CardAddTitleProps> = (props: CardAddTitleProps) => {
    const {handleClickBack, onSelect, selectOptions} = props
    const {selectedTraining} = useAppSelector(useTrainingsSelector)
    const handleOnSelect = (value: string) => {
        onSelect(value)
    }

    return(
        <div className={styles.cardHeader}>
            <Button data-test-id='modal-exercise-training-button-close' onClick={handleClickBack} type="text"><ArrowLeftOutlined /></Button>
            <Select
                data-test-id='modal-create-exercise-select'
                defaultValue={selectedTraining?.name ?? 'Выбор типа тренировки'} onSelect={handleOnSelect}>
                {
                    selectOptions.map((option) =>
                        <Select.Option key={option.key} value={option.key}>{option.name}</Select.Option>)
                }
            </Select>
        </div>
    )
}
