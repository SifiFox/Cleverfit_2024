import React, {useEffect, useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {Avatar, Badge, Button, Popover} from 'antd';

import styles from '../../../../workouts-joint.module.scss'

import {formattedDate} from '@/features/calendar/helpers/helpers.tsx';
import {useTrainingsSelector} from '@/features/calendar/model/slices/trainings-slice.ts';
import {ColorByType, ExerciseType} from '@/features/calendar/model/types/training.ts';
import {catalogsAPI} from '@/features/catalogs/model/catalogs-service.ts';
import {useAnswerInviteMutation} from '@/features/invite/model/invite-service.ts';
import {Nullable} from '@/features/user/model/slices/user-slice.ts';
import {WorkoutsJointTypes} from '@/features/workout/constants/constants';
import {getPeriodTitle, getTrainingsListValueByName} from '@/features/workout/helpers/helpers.ts';
import {
    InvitesDataType
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-basic/ui/workouts-joint-messages/ui/workouts-joint-messages.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';


const trainingNames = [
    {
        key: 'legs',
        value: 'тренировок ног'
    },
    {
        key: 'hands',
        value: 'тренировок рук'
    },
    {
        key: 'strength',
        value: 'силовых тренировок'
    },
    {
        key: 'back',
        value: 'тренировок спины'
    },
    {
        key: 'chest',
        value: 'тренировок груди'
    },
]

enum Statuses {
    ACCEPT = 'accepted',
    REJECT = 'rejected'
}

type JointMessageProps = {
    data: InvitesDataType,
    changeLayout: (arg: WorkoutsJointTypes) => void,
    messageKey: string
}

export const JointMessage: React.FC<JointMessageProps> = ({data, changeLayout,messageKey}) => {
    const [answerInviteQuery, {isSuccess}] = useAnswerInviteMutation()
const {trainingsListState} = useAppSelector(useTrainingsSelector)
const trainingNameValue = getTrainingsListValueByName(trainingsListState, data.training.name)
const messText = trainingNames.find(item => item.key === trainingNameValue)?.value
const [popoverOpen, setPopoverOpen] = useState(false)
const status = ColorByType[getTrainingsListValueByName(trainingsListState, data.training.name)]
const [reqStatus, setReqStatus] = useState<Nullable<Statuses>>(null)
const dispatch = useAppDispatch()
const hide = () => {
    setPopoverOpen(false);
};
const handleOpenChange = (newOpen: boolean) => {
    setPopoverOpen(newOpen);
};

useEffect(() => {
    if (isSuccess && reqStatus === Statuses.ACCEPT) {
        changeLayout(WorkoutsJointTypes.CLEAR)
        dispatch(catalogsAPI.util?.invalidateTags(['invite']))
    }
}, [isSuccess]);

const answerInvite = (status: Statuses) => {
    setReqStatus(status)
    answerInviteQuery({
        id: data._id,
        status
    })
}

return (
    <div className={styles.jointMessage} key={messageKey}>
        <div className={styles.messageUser}>
            <Avatar src={`https://training-api.clevertec.ru${data.from.imageSrc}`}/>
            <div>
                <p>{data.from.firstName}</p>
                <p>{data.from.lastName}</p>
            </div>
        </div>
        <div className={styles.messageBody}>
            <div>{formattedDate(data.createdAt)}</div>
            <p className={styles.messageBodyDesc}>
                Привет, я ищу партнёра для совместных [{messText}]. Ты хочешь присоединиться ко мне на следующих
                тренировках?
            </p>
            <div className={styles.messageBodyAction}>
                <Popover
                    open={popoverOpen}
                    showArrow={false}
                    onOpenChange={handleOpenChange}
                    align={{offset: [40, 170]}}
                    placement="top"
                    content={
                        <div className={styles.messagePopoverContent} data-test-id='joint-training-review-card'>
                            <div className={styles.messagePopoverHeader}>
                                <Badge
                                    status={status}
                                    text={
                                        <span>{data.training.name}</span>
                                    }
                                />
                                <Button type="text" onClick={hide}><CloseOutlined/></Button>
                            </div>
                            <div className={styles.messagePopoverBody}>
                                <div className={styles.popoverInfoMain}>
                                    {
                                        data.training.parameters?.period &&
                                        <span
                                            className={styles.popoverInfoPeriod}>{data.training.parameters.period && getPeriodTitle(data.training)}</span>
                                    }
                                    <span>{formattedDate(data.training.date)}</span>
                                </div>
                                <div className={styles.popoverInfo}>
                                    {
                                        data.training.exercises?.map((exercise: ExerciseType, index: number) => (
                                            <div className={styles.popoverExercise} key={`exercise${index}`}>
                                                <span className={styles.popoverExerciseName}>{exercise.name}</span>
                                                <span
                                                    className={styles.popoverExerciseValue}>{exercise.replays}x({exercise.weight} кг)</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    trigger="click"
                >
                    <Button type="link" onClick={() => setPopoverOpen(true)}>Посмотреть детали тренировки</Button>
                </Popover>
            </div>
        </div>
        <div className={styles.messageActions}>
            <Button type="primary" onClick={() => answerInvite(Statuses.ACCEPT)}>Тренироваться вместе</Button>
            <Button type="default" onClick={() => answerInvite(Statuses.REJECT)}>Отклонить запрос</Button>
        </div>
    </div>
)
}
