import {useEffect} from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import { Switch, Tooltip} from 'antd';

import styles from './settings-controls.module.scss'

import {useUserSelector} from '@/features/user/model/slices/user-slice.ts';
import {useUpdateUserDataMutation} from '@/features/user/model/user-service.ts';
import {useAppDispatch, useAppSelector, useWindowWidth} from '@/hooks';
import {isDesktopWidth} from '@/shared/const/constants.tsx';
import {classNames} from '@/shared/lib/classnames/classnames.ts';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';

type ControlType = {
    iconTestId: string,
    switchTestId: string,
    tooltip: string,
    id: string,
    title: string
}

const controlsArray: ControlType[] = [
    {
        id: 'readyForJointTraining',
        title: 'Открыт для совместных тренировок',
        tooltip: 'включеная функция позволит участвовать в совместных тренировках',
        switchTestId: 'tariff-trainings',
        iconTestId: 'tariff-trainings-icon'
    },
    {
        id: 'sendNotification',
        title: 'Уведомления',
        tooltip: 'включеная функция позволит получать уведомления об активностях',
        switchTestId: 'tariff-notifications',
        iconTestId: 'tariff-notifications-icon'
    },
    {
        id: 'darkTheme',
        title: 'Тёмная тема',
        tooltip: 'темная тема доступна для PRO tariff',
        switchTestId: 'tariff-theme',
        iconTestId: 'tariff-theme-icon'
    },
]



export const SettingsControls = () => {
    const {userData} = useAppSelector(useUserSelector)
    const [sentUpdate, {data, isLoading, isError}] = useUpdateUserDataMutation()
    const dispatch = useAppDispatch()
    const windowWidth = useWindowWidth()
    const isDesktop = isDesktopWidth(windowWidth)
    const onChange = (checked: boolean, item: ControlType) => {
        const toSave = {
            email: userData.email,
            readyForJointTraining: false,
            sendNotification: false,
        }

        if (item.id === 'readyForJointTraining') {
            toSave.readyForJointTraining = checked
        }
        if (item.id === 'sendNotification') {
            toSave.sendNotification = checked
        }
        sentUpdate(toSave)
    };

    useEffect(() => {
        dispatch(setLoading(isLoading))
    }, [data, isLoading, isError]);
    const isDefaultChecked = (item: ControlType) => {
        if (item.id === 'readyForJointTraining') {
            return userData.readyForJointTraining
        }
        if (item.id === 'sendNotification') {
            return userData.sendNotification
        }

        return false
    }
    const isDisabled = (item: ControlType) => {
        if (!userData?.tariff && item.id === 'darkTheme') {
            return true
        }

            return false

    }

    return (
        <div className={styles.settingsSwitches}>
            {userData?.email && controlsArray.map(item =>
                <div key={item.id} className={styles.switchBlock}>
                    <div
                        className={classNames(styles.switchWrapper, {[styles.disabledRow]: isDisabled(item)}, [])}>
                        <div
                            className={styles.switchTitle}>
                            <p>{item.title}</p>
                            <Tooltip title={item.tooltip} placement="bottomLeft">
                                <ExclamationCircleOutlined data-test-id={item.iconTestId}/>
                            </Tooltip>
                        </div>
                        <Switch
                            size={isDesktop ? 'default' : 'small'}
                            defaultChecked={isDefaultChecked(item)}
                            onChange={(checked) => onChange(checked, item)}
                            disabled={isDisabled(item)}
                            data-test-id={item.switchTestId}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
