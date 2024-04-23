import React from 'react';
import {EditFilled, EditTwoTone} from '@ant-design/icons';
import {Badge, Button} from 'antd';

import styles from '@/features/calendar/ui/custom-popover/ui/custom-popover.module.scss';

import {getTrainingType} from '@/features/calendar/helpers/helpers.tsx';
import {DrawerTypes, setTrainingsState} from '@/features/calendar/model/slices/trainings-slice.ts';
import {
    BadgesItemProps, CardTypes,
    ColorByType, TrainingType
} from '@/features/calendar/model/types/training.ts';
import {useAppDispatch} from '@/hooks';
import {classNames} from '@/shared/lib/classnames/classnames.ts';

export const BadgesItem: React.FC<BadgesItemProps> = (props: BadgesItemProps) => {
    const {item, trainingsList, index, editable, handleChangeCardType} = props
    const trainingType = getTrainingType(trainingsList, item)
    const status = ColorByType[trainingType.key]
    const dispatch = useAppDispatch()
    const handleClickEdit = (training: TrainingType) => {
        if (handleChangeCardType) {
            handleChangeCardType(CardTypes.ADD)
        }
        dispatch(setTrainingsState({selectedTraining: training, drawerType: DrawerTypes.EDIT}))
    }

    return (
        <li
            key={item._id}
            className={classNames(styles.badgeWrapper, {[styles.badgeDisabled]: item.isImplementation}, [])}
        >
            <Badge
                status={status}
                text={
                    <React.Fragment>
                        <span>{item.name}</span>
                        {editable &&
                            <Button
                                type='text'
                                disabled={item.isImplementation}
                                className={styles.badgeEditBtn}
                                onClick={() => handleClickEdit(item)}
                                data-test-id={`modal-update-training-edit-button${index}`}
                            >
                                {item.isImplementation
                                    ? <EditFilled/>
                                    : <EditTwoTone/>
                                }
                            </Button>
                        }
                    </React.Fragment>
                }
            />
        </li>
    )
}
