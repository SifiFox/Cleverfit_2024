import React, {useEffect} from 'react';
import {urlImageBack} from '@pages/profile-page/const/constants.ts';

import styles from './profile-page.module.scss'

import {setUserState} from '@/features/user/model/slices/user-slice.ts';
import {useGetUserDataQuery} from '@/features/user/model/user-service.ts';
import {UserProfile} from '@/features/user/ui/user-profile.tsx';
import {useAppDispatch} from '@/hooks';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {Header} from '@/widgets/header';

export const ProfilePage: React.FC = () => {
    const {data: userData, isLoading: isUserDataFetching} = useGetUserDataQuery(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setLoading(isUserDataFetching))
        if(userData){
            if(userData.imgSrc && userData?.imgSrc[0] === '/'){
                dispatch(setUserState({userData: {
                        ...userData,
                        imgSrc: `${urlImageBack}${userData.imgSrc}`
                    }}))
            }
            else{
                dispatch(setUserState({userData}))
            }
        }
    }, [userData, isUserDataFetching]);

    return (
        (
            <div className={styles.profilePageWrapper}>
                <Header title="Профиль" withSettings={true}/>
                <UserProfile/>
            </div>
        )
    )
};
