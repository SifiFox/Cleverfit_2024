import React from 'react';
import {CloseOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {Avatar, Badge} from 'antd';

import styles from '@/features/calendar/ui/custom-popover/ui/custom-popover.module.scss';

import {formattedDate, getTrainingType} from '@/features/calendar/helpers/helpers.tsx';
import {DrawerTypes} from '@/features/calendar/model/slices/trainings-slice.ts';
import {ColorByType, DrawerHeaderProps} from '@/features/calendar/model/types/training.ts';
import {getTrainingsListValueByName} from '@/features/workout/helpers/helpers.ts';


const DrawerHeaderParams = {
    [DrawerTypes.ADD]: {
        title: 'Добавление упражнений',
        icon: <PlusOutlined/>
    },
    [DrawerTypes.EDIT]: {
        title: 'Редактирование',
        icon: <EditOutlined/>
    },
    [DrawerTypes.VIEW]: {
        title: 'Просмотр упражнений',
        icon: null
    },
    [DrawerTypes.TRAINING_NEW]: {
        title: 'Добавление упражнений',
        icon:  <PlusOutlined/>
    },
    [DrawerTypes.TRAINING_EDIT]: {
        title: 'Редактирование',
        icon:  <EditOutlined/>
    },
    [DrawerTypes.JOINT]: {
        title: 'Совместная тренировка',
        icon:  <PlusOutlined/>
    }
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = (props: DrawerHeaderProps) => {
    const {
        type,
        onClose,
        selectedTraining,
        trainingsList,
        selectedDate,
        withoutBadge,
        selectedPartner
    } = props
    const {title, icon} = DrawerHeaderParams[type]
    const getStatusType = () => getTrainingsListValueByName(trainingsList, selectedPartner?.trainingType)

    if(withoutBadge){
        return (
            <React.Fragment>
                <div className={styles.drawerHeaderWrapper}>
                    {icon && icon}
                    <p>{title}</p>
                    <div
                        role='presentation'
                        data-test-id='modal-drawer-right-button-close'
                        className={styles.drawerCloseWrapper}
                        onClick={onClose}
                    >
                        <CloseOutlined/>
                    </div>
                </div>
                {
                    type && type === DrawerTypes.JOINT &&
                    <div className={styles.drawerJointHeaderInfo}>
                        <div className={styles.drawerJointPartnerInfo}>
                            <Avatar src={selectedPartner?.imageSrc}/>
                            <p>{selectedPartner?.name}</p>
                        </div>
                        <Badge
                            status={ColorByType[getStatusType()]}
                            text={<span>{selectedPartner?.trainingType}</span>}
                        />
                    </div>
                }
            </React.Fragment>
        )
    }

    if (selectedTraining) {
        const trainingType = getTrainingType(trainingsList, selectedTraining)
        const status = ColorByType[trainingType?.key] ?? 'warning'

        return (
            <React.Fragment>
                <div className={styles.drawerHeaderWrapper}>
                    {icon && icon}
                    <p>{title}</p>
                    <div
                        role='presentation'
                        data-test-id='modal-drawer-right-button-close'
                        className={styles.drawerCloseWrapper}
                        onClick={onClose}
                    >
                        <CloseOutlined/>
                    </div>
                </div>
                <div className={styles.trainingInfo}>
                    <Badge
                        status={status}
                        text={<span>{selectedTraining.name}</span>}
                    />
                    <p>
                        {formattedDate(selectedDate)}
                    </p>
                </div>
            </React.Fragment>
        )
    }



    return null
}
