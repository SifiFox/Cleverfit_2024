import React, {useEffect} from 'react';
import {history, RootState} from '@redux/configure-store.ts';
import {Button, Form, Input, Typography} from 'antd';

import {LocationState} from '@/app/types/global';
import {
    resultChangePasswordError,
    resultChangePasswordSuccess
} from '@/features/auth/model/const/change-password-results.tsx';
import {
    useChangePasswordMutation
} from '@/features/auth/model/services/change-password-service.ts';
import {renderResult} from '@/features/auth/model/services/render-result.ts';
import {setChangePassData, useAuthSelector} from '@/features/auth/model/slices/auth-slice.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {AppRoutes} from '@/shared/config/route-config/route-config.tsx';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';

type TChangePassForm = {
    password: string,
    confirmPassword: string
}
export const ChangePasswordForm: React.FC = () => {
    const [changePass, {isLoading: changePassLoading, data: changePassData, error: changePassError, isSuccess}] = useChangePasswordMutation()
    const dispatch = useAppDispatch()
    const {location} = useAppSelector((state: RootState) => state.router);
    const {changePassStoreData} = useAppSelector(useAuthSelector)
    const locationState = location?.state as LocationState
    const onFinish = (values: TChangePassForm) => {
        dispatch(setChangePassData(values))
        changePass(values)
    }

    useEffect(() => {
        if(locationState.from === '/result/error-change-password') {
            onFinish({password: changePassStoreData.password, confirmPassword: changePassStoreData.confirmPassword})
        }
        if(locationState.from !== '/result/error-change-password' && locationState.from !== '/auth/confirm-email'){
            history.push(AppRoutes.AUTH)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(setLoading(changePassLoading))
        if(changePassError){
            renderResult(resultChangePasswordError)
        }
        if(isSuccess){
            renderResult(resultChangePasswordSuccess)
        }
    }, [changePassData, changePassError, isSuccess, changePassLoading, dispatch]);


    return  <React.Fragment>
        <Typography.Title
            style={{
                fontSize: 'var(--font-l)',
                marginBottom: 'var(--xll)',
                textAlign: 'center'
            }}
        >
            Восстановление аккауанта
        </Typography.Title>
        <Form
            name="change__password"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="password"
                help='Пароль не менее 8 символов,  с заглавной буквой и цифрой'
                rules={[{ required: true, pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/, message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой' }]}
                style={{marginBottom: 'var(--m)', height: '70px'}}
            >
                <Input.Password style={{height: '40px'}} data-test-id='change-password' placeholder="Пароль" />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    {required: true, min: 8,  message: '' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
                style={{marginBottom: 'var(--m)', height: '70px'}}
            >
                <Input.Password style={{height: '40px'}} data-test-id='change-confirm-password' placeholder="Пароль" />
            </Form.Item>
            <Form.Item>
                <Button
                    data-test-id='change-submit-button'
                    style={{marginBottom: 'var(--m)', height: 'var(--h-l)'}}
                    type="primary"
                    htmlType="submit"
                    block={true}
                >
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    </React.Fragment>
}
