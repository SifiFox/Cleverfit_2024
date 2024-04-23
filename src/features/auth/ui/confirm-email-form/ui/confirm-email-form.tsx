import {useEffect, useState} from 'react';
import VerificationInput from 'react-verification-input';
import {history,RootState} from '@redux/configure-store.ts';
import {Result} from 'antd';

import styles from './confirm-email-form.module.scss'

import {LocationState} from '@/app/types/global';
import {confirmEmailAPI} from '@/features/auth/model/services/confirm-email-service.ts';
import {useAuthSelector} from '@/features/auth/model/slices/auth-slice.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {AppRoutes} from '@/shared/config/route-config/route-config.tsx';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';

export const ConfirmEmailForm = () => {
    const [confirmEmail, {isLoading: confirmEmailLoading, data: confirmEmailData, error: confirmEmailError, isError, isSuccess}] = confirmEmailAPI.useConfirmEmailMutation()
    const [verInputValue, setVerInputValue] = useState('')
    const dispatch = useAppDispatch()
    const {currentEmail, changePassStoreData} = useAppSelector(useAuthSelector)
    const {location} = useAppSelector((state: RootState) => state.router);
    const locationState = location?.state as LocationState

    useEffect(() => {
        if(locationState?.from === '/result/error-change-password') {
            confirmEmail(changePassStoreData)
        }
        if(locationState?.from !== '/result/error-change-password' && locationState?.from !== AppRoutes.AUTH) {
            history.push(AppRoutes.AUTH)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleComplete =  (e: string) => {
         confirmEmail({email: currentEmail, code: e})
    }

    useEffect(() => {
        if(isSuccess){
            history.push('/auth/change-password', {from: '/auth/confirm-email'})
            setVerInputValue('')
        }
        if(isError){
            setVerInputValue('')
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        dispatch(setLoading(confirmEmailLoading))
        if(confirmEmailData){
            history.push('/auth/change-password', {from: '/auth/confirm-email'})
        }
    }, [dispatch, confirmEmailLoading, confirmEmailData]);

    return <Result
        status={confirmEmailError ? 'error' : 'info'}
        title={confirmEmailError ? 'Неверный код. Введите код для восстановления аккаунта' :'Введите код для восстановления аккаунта'}
        subTitle={`Мы отправили вам на e-mail ${currentEmail} шестизначный код. Введите его в поле ниже.`}
        extra={
            <VerificationInput
                classNames={{
                    character:  confirmEmailError ? styles.viCharacterError : styles.viCharacter,
                    characterInactive: confirmEmailError ? styles.characterInactiveError  : styles.characterInactive,
                }}
                length={6}
                onComplete={(e) => handleComplete(e)}
                inputProps={{'data-test-id': 'verification-input'}}
                validChars='/0-9/'
                value={verInputValue}
                onChange={(e) => setVerInputValue(e)}
            />
        }
    />
}
