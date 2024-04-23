/* eslint-disable no-underscore-dangle */
import React, {ReactNode} from 'react';
import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Table} from 'antd';

import styles from '../../workout.module.scss'

import {
    DrawerTypes,
    setTrainingsState,
    useTrainingsSelector
} from '@/features/calendar/model/slices/trainings-slice.ts';
import {TrainingType} from '@/features/calendar/model/types/training.ts';
import {WorkoutsDrawer} from '@/features/workout/ui/workouts-drawer/workouts-drawer.tsx';
import {
    DateColumn,
    EditColumn, RenderTrainingType,
    TypeColumn,
} from '@/features/workout/ui/workouts-my/ui/workouts-columns.tsx';
import {
    WorkoutsMyEmpty
} from '@/features/workout/ui/workouts-my/ui/workouts-my-empty/workouts-my-empty.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';

export const WorkoutsMy: React.FC = () => {
    const {trainings, trainingsListState, selectedTraining} = useAppSelector(useTrainingsSelector)
    const dispatch = useAppDispatch()
    const handleClickEditTraining = (data: RenderTrainingType) => {
        const {item} = data

        dispatch(setTrainingsState({
            selectedTraining: item,
            drawerState: {open: true, exercises: item.exercises},
            selectedDate: item.date,
            drawerType: DrawerTypes.TRAINING_EDIT
        }))
    }


    type Column = {
        title: string | ReactNode,
        key: string,
        render: any,
        width?: number,
        sorter?: any,
    }
    const columns: Column[] = [
        {
            title: 'Тип тренировки',
            key: 'name',
            width: 259,
            render: (item: RenderTrainingType) =>
                TypeColumn(
                    {
                        training: item,
                        trainingsListState,
                        dispatch,
                        selectedTraining,
                    }
                )
        },
        {
            title: <React.Fragment><span>Периодичность</span><DownOutlined/></React.Fragment>,
            key: 'sort',
            render: (item: RenderTrainingType) => DateColumn({training: item}),
            sorter: (a: { item: TrainingType }, b: {
                item: TrainingType
            }) => Number(a.item.parameters?.period) - Number(b.item.parameters?.period)
        },
        {
            width: 30,
            title: '',
            key: 'edit',
            render: (item: RenderTrainingType, render: any, index: number) => EditColumn({
                training: item,
                index,
                clickEdit: handleClickEditTraining
            })
        },
    ]
    const filteredTrainings = trainings?.map(item => ({
        item,
        key: item._id
    })).sort((a, b) => Number(b.item.parameters?.period) - Number(a.item.parameters?.period))


    const handleClickAddTraining = () => {
        dispatch(setTrainingsState({
            drawerState: {open: true},
            drawerType: DrawerTypes.TRAINING_NEW
        }))
    }

    return (
        <React.Fragment>
            <WorkoutsDrawer/>
            {
                filteredTrainings && filteredTrainings?.length > 0
                    ? <div className={styles.tableWrapper}>
                        <Table
                            dataSource={filteredTrainings || []}
                            columns={columns} size='small'
                            pagination={{position: ['bottomLeft']}}
                            data-test-id='my-trainings-table'
                        />
                        <Button
                            className={styles.tableCreateButton}
                            onClick={handleClickAddTraining}
                            type="primary"
                            style={{marginTop: 24, height: 40}}
                            data-test-id="create-new-training-button"
                        >

                            <PlusOutlined/>
                            Новая тренировка
                        </Button>
                    </div>
                    : <WorkoutsMyEmpty handleClick={handleClickAddTraining}/>
            }
        </React.Fragment>
    )
}
