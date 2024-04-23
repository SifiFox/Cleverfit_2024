import React from 'react';
import {
    CheckCircleTwoTone, InfoCircleOutlined
} from '@ant-design/icons';
import {Avatar, Button, Card} from 'antd';

import styles from './partner-card.module.scss'

import {DrawerTypes, setTrainingsState} from '@/features/calendar/model/slices/trainings-slice.ts';
import { PartnerType, setSelectedPartnerState} from '@/features/workout/model/slices/workout-slice.ts';
import {useAppDispatch} from '@/hooks';
import {classNames} from '@/shared/lib/classnames/classnames.ts';
import {TextHighlight} from '@/shared/ui/text-highlight/text-highlight.tsx';

export enum Statuses {
    ACCEPTED = 'accepted',
    PENDING = 'pending',
    REJECTED = 'rejected'
}

export const ButtonTexts = {
    [Statuses.ACCEPTED]: {
        title: 'Отменить тренировку',
        subtitle: 'тренировка одобрена',
        icon: <CheckCircleTwoTone twoToneColor={['#FFFFFF', '#52C41A']}/>
    },
    [Statuses.PENDING]: {
        title: 'Создать тренировку',
        subtitle: 'ожидает подтверждения',
        icon: null
    },
    [Statuses.REJECTED]: {
        title: 'Создать тренировку',
        subtitle: 'тренировка отклонена',
        icon: <InfoCircleOutlined/>
    },
}

export enum PartnerCardTypes {
    CLEAR = 'clear',
    ACTIVE = 'active'
}

type PartnerCardProps = {
    partner: PartnerType,
    searchedValue: string,
    index: number,
    type?: PartnerCardTypes,
    onClickCard?: (arg: PartnerType) => void
}

export const PartnerCard: React.FC<PartnerCardProps> = (
    {
        partner,
        searchedValue,
        index,
        type = PartnerCardTypes.ACTIVE,
        onClickCard
    }) => {
    const dispatch = useAppDispatch()
    const handleClickCreateTraining = () => {
        dispatch(setSelectedPartnerState(partner))
        dispatch(setTrainingsState({
            drawerState: {open: true},
            drawerType: DrawerTypes.JOINT
        }))
    }
    const handleClickCard = () => {
        if (type === PartnerCardTypes.CLEAR) {
            if (onClickCard) {
                onClickCard(partner)
            }
        }
    }

    return (
        <div className={styles.partnerCardWrapper}>
            <Card
                className={classNames(styles.partnerCard, {[styles.clearCard]: type === PartnerCardTypes.CLEAR})}
                data-test-id={`joint-training-cards${index}`}
                onClick={handleClickCard}
            >
                <div className={styles.partnerCardHeader}>
                    <Avatar src={partner.imageSrc}/>
                    <span><TextHighlight base={partner.name} target={searchedValue}/></span>
                </div>
                <div>
                    <div className={styles.partnerCardTrainings}>
                        <div className={styles.partnerCardTraining}>
                            <span className={styles.partnerTrainingTitle}>Тип тренировки</span>
                            <span className={styles.partnerTrainingValue}>{partner.trainingType}</span>
                        </div>
                        <div className={styles.partnerCardTraining}>
                            <span className={styles.partnerTrainingTitle}>Средняя нагрузка:</span>
                            <span
                                className={styles.partnerTrainingValue}>{partner.avgWeightInWeek} кг/нед</span>
                        </div>
                    </div>
                </div>
                {
                    type !== PartnerCardTypes.CLEAR &&
                    <div className={styles.partnerCardFooter}>
                        {
                            partner.status
                                ? <React.Fragment>
                                    <Button type="primary" disabled={partner.status !== Statuses.REJECTED}
                                            onClick={handleClickCreateTraining} block={true}>
                                        {ButtonTexts[partner.status].title}
                                    </Button>
                                    <p>
                                        <span>
                                        {ButtonTexts[partner.status].subtitle}
                                        </span>
                                        {ButtonTexts[partner.status].icon}
                                    </p>
                                </React.Fragment>
                                : <Button type="primary" onClick={handleClickCreateTraining} block={true}>
                                    Создать тренировку
                                </Button>
                        }

                    </div>
                }
            </Card>
        </div>
    )
}
