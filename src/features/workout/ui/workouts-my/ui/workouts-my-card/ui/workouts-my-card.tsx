import React, {useState} from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Button, Card} from 'antd';

import styles from './workouts-my-card.module.scss'

import {DrawerTypes, setTrainingsState} from '@/features/calendar/model/slices/trainings-slice.ts';
import {TrainingType} from '@/features/calendar/model/types/training.ts';
import {useAppDispatch} from '@/hooks';


type WorkoutsMyCardProps = {
    training: TrainingType,
}

const colors = [
    {
        key: 'legs',
        trainingName: 'Ноги',
        color: '#FF4D4F'
    },
    {
        key: 'hands',
        trainingName: 'Руки',
        color: '#13C2C2'
    },
    {
        key: 'strength',
        trainingName: 'Силовая',
        color: '#FADB14'
    },
    {
        key: 'back',
        trainingName: 'Спина',
        color: '#FA8C16'
    },
    {
        key: 'chest',
        trainingName: 'Грудь',
        color: '#52C41A'
    },
];

export const WorkoutsMyCard: React.FC<WorkoutsMyCardProps> = ({training}) => {
    const [cardOpen, setCardOpen] = useState(true)
    const headerBottomColor = () => {
        const colorItem = colors.find(item => item?.trainingName === training?.name)

        return colorItem ? colorItem.color : 'red'
    }
    const dispatch = useAppDispatch()
    const handleClickAdd = () => {
       dispatch(setTrainingsState({
           drawerType: DrawerTypes.TRAINING_EDIT,
           drawerState: {open: true, exercises: training.exercises}
       }))
    }
    const handleClickBack = () => {
        dispatch(setTrainingsState({selectedTraining: null}))
        setCardOpen(false)
    }

    return (
        cardOpen &&
        <Card className={styles.cardMyWrapper}>
            <div className={styles.cardMyHeader}
                 style={{borderBottom: `2px solid ${headerBottomColor()}`}}
            >
                <div className={styles.headerWrapper}>
                    <ArrowLeftOutlined onClick={handleClickBack} />
                    <span>{training.name}</span>
                </div>
            </div>
            <div className={styles.cardMyBody}>
                {training.exercises?.map((exercise,index) => (
                    <span  key={`exerciseMy${index}`}>{exercise.name}</span>
                ))}
            </div>
            <div className={styles.cardMyFooter}>
                <Button type="default" block={true} onClick={handleClickAdd}>Добавить упражнения</Button>
            </div>
        </Card>
    )
}
