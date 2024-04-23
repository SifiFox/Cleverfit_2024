import React, {useEffect} from 'react';
import {urlImageBack} from '@pages/profile-page/const/constants.ts';
import {Content} from 'antd/es/layout/layout';

import styles from './settings-page.module.scss'

import {
    useGetTariffListQuery
} from '@/features/catalogs/model/catalogs-service.ts';
import {Settings} from '@/features/settings/ui/settings.tsx';
import {setUserState} from '@/features/user/model/slices/user-slice.ts';
import {useGetUserDataQuery} from '@/features/user/model/user-service.ts';
import {useAppDispatch} from '@/hooks';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {Header} from '@/widgets/header';


export const SettingsPage: React.FC = () => {
    const {data: userData} = useGetUserDataQuery(false)
    const {data, isLoading, isError, isSuccess} = useGetTariffListQuery(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(userData){
            if(userData.imgSrc && userData?.imgSrc[0] === '/'){
                dispatch(setUserState({userData: {
                        ...userData,
                        imgSrc: `${urlImageBack}${userData.imgSrc}`
                    }}))
            }
        }
    }, [userData]);

    useEffect(() => {
        dispatch(setLoading(isLoading))
        if(data){
            dispatch(setUserState({tariffList: data}))
        }

    }, [data, isLoading, isError, isSuccess, userData]);

    return(
            <Content className={styles.settingsContent}>
                {
                    userData &&
                    <React.Fragment>
                        <Header title="Настройки" titleClickable={true} withSettings={false}/>
                        <Settings title="Мой тариф"/>
                    </React.Fragment>
                }
            </Content>
        )
}
