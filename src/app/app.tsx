import React, {useEffect} from 'react';
import {history} from '@redux/configure-store.ts';
import {Layout} from 'antd';

import styles from './app.module.scss'

import AppRouter from '@/app/providers/router/ui/app-router.tsx';
import { initAuth} from '@/features/auth/model/slices/auth-slice.ts';
import {setUserState, useUserSelector} from '@/features/user/model/slices/user-slice.ts';
import {useLazyGetUserDataQuery} from '@/features/user/model/user-service.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {Loader} from '@/shared/ui/loader';
import {useIsLoadingSelector} from '@/shared/ui/loader/model/loader-slice.ts';

const App: React.FC = () => {
    const userInited = true;
    const dispatch = useAppDispatch()
    const [fetchUserData, {data: user}] = useLazyGetUserDataQuery()
    const {userData} = useAppSelector(useUserSelector)

    useEffect(() => {
        if(!userData.email && !history.location.pathname.includes('/auth') && !history.location.pathname.includes('/result')){
            fetchUserData(null)
        }
    });

    useEffect(() => {
        if(user){
            if(user.imgSrc && user?.imgSrc[0] === '/'){
                dispatch(setUserState({userData: {...user, imgSrc:`https://training-api.clevertec.ru${user.imgSrc}`}}))
            }
            else{
                dispatch(setUserState({userData: user}))
            }
        }
    }, [user]);

    useEffect(() => {
        dispatch(initAuth())
    }, [dispatch]);

    return (
        <div className='app'>
            <Layout className={styles.layout}>
                {userInited &&
                    <AppRouter />
                }
            </Layout>
            <Loader visible={useIsLoadingSelector()} />
        </div>
    );
}

export default App
