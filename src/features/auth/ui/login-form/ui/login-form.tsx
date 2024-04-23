import React, {useCallback, useEffect, useState} from 'react';
import {GooglePlusOutlined} from '@ant-design/icons';
import {history,RootState} from '@redux/configure-store.ts';
import {Button, Checkbox, Form,Input} from 'antd';

import styles from './login-form.module.scss'

import {LocationState} from '@/app/types/global';
import {
    resultCheckEmailError,
    resultErrorCheckEmailNoExist,
    resultLoginError
} from '@/features/auth/model/const/login-results.tsx';
import {
    useSendRecoveryCodeMutation
} from '@/features/auth/model/services/check-email-service.ts';
import {
    useAuthByEmailMutation,
    useLazyAuthByGoogleQuery
} from '@/features/auth/model/services/login-service.tsx';
import {renderResult} from '@/features/auth/model/services/render-result.ts';
import {
    setAuthState,
    setCheckEmail, setCurrentEmail,
    useAuthSelector
} from '@/features/auth/model/slices/auth-slice.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {AppRoutes} from '@/shared/config/route-config/route-config.tsx';
import {ACCESSTOKEN_LOCALSTORAGE_KEY} from '@/shared/const/localstorage.ts';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';

type TLoginForm = {
    email: string,
    password: string,
    remember: boolean
}

export const LoginForm: React.FC = () => {
    const [emailValid, setEmailValid] = useState(true)
    const [googleAuth ,{isFetching: googleAuthFetching}] = useLazyAuthByGoogleQuery()
    const [authByEmail, {isLoading: authLoading, data: authData, error: authError}] = useAuthByEmailMutation()
    const [checkEmail, {isLoading: checkLoading, data: checkData, error: checkError, isSuccess: isCheckSuccess}] = useSendRecoveryCodeMutation()

    const requireWithoutMessage = { required: true, message: ''}
    const [form] = Form.useForm()

    const {location, previousLocations} = useAppSelector((state: RootState) => state.router);
    const locationState = location?.state as LocationState
    const {currentEmail} = useAppSelector(useAuthSelector)
    const dispatch = useAppDispatch()

    const onFinish = (values: TLoginForm) => {
        const {email, password} = values

        authByEmail({email, password});
    };
    const saveToken = useCallback((data: { accessToken?: string; }) => {
        if(form.getFieldsValue().remember){
            localStorage.setItem(ACCESSTOKEN_LOCALSTORAGE_KEY, data.accessToken as string)
        }
        dispatch(setAuthState({auth: data.accessToken}))
    }, [dispatch, form])
    const validateEmail = async () => {
        await form.validateFields(['email'])
            .then(() => {
                setEmailValid(true)
            }).catch(() => {
                setEmailValid(false)
            })
    }
    const handleGoogleAuth = () => {
        window.location.href = 'https://marathon-api.clevertec.ru/auth/google'
        googleAuth(false)
    }

    useEffect(() => {
        dispatch(setLoading(googleAuthFetching))
        if(!(previousLocations) || previousLocations[4]?.location?.search) {
            if (previousLocations) {
                localStorage.setItem('accessToken', previousLocations[4]?.location?.search.slice(13) as string)
                saveToken({
                    accessToken: previousLocations[4]?.location?.search.slice(13)
                })
            }
        }
    }, [googleAuthFetching, dispatch, saveToken, previousLocations]);


    useEffect(() => {
        dispatch(setLoading(authLoading || checkLoading))
    }, [dispatch, authLoading, checkLoading]);

    useEffect(() => {
        if(authData && authData.accessToken){
            saveToken(authData)
        }
        if(authError){
            renderResult(resultLoginError)
        }
    },[
        authData,
        authError,
        saveToken
    ]);

    const handleClickForgot = async () => {
        await form.validateFields(['email'])
            .then(() => {
                setEmailValid(true)
                sessionStorage.setItem('email', form.getFieldsValue().email);
                dispatch(setCurrentEmail(form.getFieldsValue().email))
                checkEmail({email: form.getFieldsValue().email})
            }).catch(() => {
                setEmailValid(false)
            })
    }

    useEffect(() => {
        if(locationState?.from === '/result/error-check-email'){
            checkEmail({email: currentEmail})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(isCheckSuccess){
            dispatch(setCheckEmail(currentEmail))
            history.push('/auth/confirm-email', {from: AppRoutes.AUTH})
        }
        if(checkError){
            if('status' in checkError) switch (checkError.status) {
                case 404:
                    renderResult(resultErrorCheckEmailNoExist);
                    break;
                default: {
                    renderResult(resultCheckEmailError)
                    break;
                }
            }
        }
    }, [checkData, checkError, isCheckSuccess, currentEmail, dispatch]);


    return(
        <Form
            form={form}
            name='normal_login'
            className={styles.loginForm}
            initialValues={{ remember: false }}
            onFinish={onFinish}
        >
            <Form.Item
                name='email'
                rules={[{type: 'email', message: ''},requireWithoutMessage]}
            >
                <Input
                    data-test-id='login-email'
                    addonBefore='e-mail:'
                    onChange={validateEmail}
                />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{...requireWithoutMessage, min: 8}]}
                style={{marginBottom: 'var(--m)', height: 'var(--h-xl)'}}
            >
                <Input.Password data-test-id='login-password' placeholder='Пароль' />
            </Form.Item>

            <Form.Item className={styles.formItemsRow} style={{maxHeight: 'var(--xl)'}}>
                <Form.Item name='remember' valuePropName='checked' noStyle={true}>
                    <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                </Form.Item>

                <Button
                    type='link'
                    data-test-id='login-forgot-button'
                    className={styles.formLink}
                    disabled={!emailValid}
                    onClick={() => handleClickForgot()}
                >
                    Забыли пароль?
                </Button>
            </Form.Item>

            <Form.Item>
                <Button
                    data-test-id='login-submit-button'
                    style={{marginBottom: 'var(--m)'}}
                    type='primary'
                    htmlType='submit'
                    className={styles.fullWidth}
                >
                    Войти
                </Button>
                <Button onClick={handleGoogleAuth} type='default' htmlType='submit' className={styles.fullWidth}>
                    <GooglePlusOutlined />
                    Войти через Google
                </Button>
            </Form.Item>
        </Form>
    )
}
