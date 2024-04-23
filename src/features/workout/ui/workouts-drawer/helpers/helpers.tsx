import {CloseOutlined} from '@ant-design/icons';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {Button, FormInstance, message} from 'antd';

import styles from '../../workout.module.scss'

import {DrawerState, setTrainingsState} from '@/features/calendar/model/slices/trainings-slice.ts';
import {TrainingType} from '@/features/calendar/model/types/training.ts';
import {Nullable} from '@/features/user/model/slices/user-slice.ts';

type RemoveItemsType = {
    form: FormInstance,
    dispatch: ThunkDispatch<any, any, any>,
    drawerState?: Nullable<DrawerState>,
    selectedTraining?: Nullable<TrainingType>
}

export const removeItems = (params: RemoveItemsType) => {
    const {form, drawerState, dispatch, selectedTraining} = params
    const itemsAfterRemove = drawerState?.exercises?.filter(item => !item.remove) ?? []

    dispatch(setTrainingsState({
        drawerState: {open: true, exercises: itemsAfterRemove},
        selectedTraining: {
            name: selectedTraining?.name,
            _id: selectedTraining?._id,
            exercises: itemsAfterRemove
        }
    }))
    form.setFieldsValue({exercises: drawerState?.exercises})
    form.resetFields([itemsAfterRemove])
}


export const showMessage = (messageText: string) => {
    message.success(
        {
            content:
                <span
                    data-test-id='create-training-success-alert'
                    className={styles.messageNotification}
                >

                    {messageText}
                    <Button type="link">
                                <CloseOutlined
                                    onClick={() => message.destroy()}
                                    style={{color: '#262626', marginRight: 0}}
                                />
                            </Button>
                        </span>,
            style: {
                bottom: 72
            },
            duration: 0
        })
}
