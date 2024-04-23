import React from 'react';
import {DownOutlined, EditOutlined, EditTwoTone} from '@ant-design/icons';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {Badge, Button, Space} from 'antd';

import {getTrainingType} from '@/features/calendar/helpers/helpers.tsx';
import {setTrainingsState} from '@/features/calendar/model/slices/trainings-slice.ts';
import {
    ColorByType,
    TrainingsListItemType,
    TrainingType
} from '@/features/calendar/model/types/training.ts';
import {Nullable} from '@/features/user/model/slices/user-slice.ts';
import {getPeriodTitle} from '@/features/workout/helpers/helpers.ts';
import {
    WorkoutsMyCard
} from '@/features/workout/ui/workouts-my/ui/workouts-my-card/ui/workouts-my-card.tsx';


type DateColumnProps = {
    training: RenderTrainingType
}

export type RenderTrainingType = {
    item: TrainingType,
    key: string
}
type TypeColumnProps = {
    training: RenderTrainingType,
    dispatch: ThunkDispatch<any, any, any>,
    trainingsListState?: TrainingsListItemType[],
    selectedTraining?: Nullable<TrainingType>,
}

type EditColumnProps = {
    training: RenderTrainingType,
    index: number,
    clickEdit: (arg: RenderTrainingType) => void
    render?: any,
}
export const TypeColumn: React.FC<TypeColumnProps> = (props) => {
    const {
        training,
        trainingsListState,
        dispatch,
        selectedTraining,
    } = props
    const trainingType = getTrainingType(trainingsListState, training.item)
    const status = ColorByType[trainingType?.key] || 'default'
    const handleClickItem = () => {
        dispatch(setTrainingsState({selectedTraining: training.item}))
    }

    return (
        <Space key={`${training.item._id}type`}
               style={{display: 'flex', justifyContent: 'space-between'}}
               onClick={handleClickItem}
        >
            <Badge status={status} text={training.item.name}/>
            <DownOutlined/>
            {
                selectedTraining?._id === training.item._id &&
                <WorkoutsMyCard training={training.item} />
            }
        </Space>
    )
}

export const DateColumn: React.FC<DateColumnProps> = (props) => {
    const {training} = props

    return <span>{getPeriodTitle(training.item)}</span>
}
export const EditColumn: React.FC<EditColumnProps> = (props) => {
    const {training, index, clickEdit} = props

    return (
        <Button data-test-id={`update-my-training-table-icon${index}`}
                onClick={() => clickEdit(training)}
                type="text"
                disabled={training.item.isImplementation}
        >
            {training.item.isImplementation ? (
                <EditOutlined style={{fontSize: 'var(--xl)'}}/>
            ) : (
                <EditTwoTone style={{fontSize: 'var(--xl)'}}/>
            )}
        </Button>
    )
}


