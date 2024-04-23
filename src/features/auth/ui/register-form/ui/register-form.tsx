import {useEffect, useState} from 'react';
import {GooglePlusOutlined} from '@ant-design/icons';
import {RootState} from '@redux/configure-store.ts';
import {Button, Form, Input} from 'antd';

import styles from './register-form.module.scss';

import {
    resultBadConnection,
    resultError, resultErrorUserExist,
    resultSuccess
} from '@/features/auth/model/const/registration-results.tsx';
import {registrationAPI} from '@/features/auth/model/services/registration-service.ts';
import {renderResult} from '@/features/auth/model/services/render-result.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';

export const RegisterForm = () => {
    const [registrationByEmail, {isLoading: registrationLoading, isSuccess, data: registrationData, error}] = registrationAPI.useRegistrationByEmailMutation()
    const dispatch = useAppDispatch()
    const location = useAppSelector((state: RootState) => state.router.previousLocations);
    const [form] = Form.useForm()
    const [disabledSave, setDisabledSave] = useState(false)
    const helpTitle = 'Пароль не менее 8 символов,  с заглавной буквой и цифрой'
    const requireWithoutTitle = { required: true, message: '' }
    const handleFormChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);

        setDisabledSave(hasErrors);
    }


    const onFinish = async (values: unknown) => {
        sessionStorage.setItem('email', form.getFieldsValue().email);
        sessionStorage.setItem('password', form.getFieldsValue().password);
        await registrationByEmail(values);
    };

    useEffect(() => {
        dispatch(setLoading(registrationLoading))
        if(!(location) || location[1]?.location?.pathname === '/result/error'){
            const prevData = {
                email: sessionStorage.getItem('email'),
                password: sessionStorage.getItem('password')
            }

            onFinish(prevData)
        }

        if(!registrationLoading){
            if(error)
                if('status' in error) switch (error.status) {
                case 409:
                    renderResult(resultErrorUserExist);
                    break;
                case 500:
                    renderResult(resultBadConnection);
                    break;
                default: {
                    renderResult(resultError)
                    break;
                }
            }
            if(isSuccess){
                renderResult(resultSuccess)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationData, registrationLoading, error]);

    return(
        <Form
            onFieldsChange={handleFormChange}
            form={form}
            name="normal_register"
            className={styles.registerForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {type: 'email', message: ''},
                    requireWithoutTitle]}
            >
                <Input data-test-id='registration-email' addonBefore="e-mail:"/>
            </Form.Item>


            <Form.Item
                help={helpTitle}
                className={styles.inputWithLabel}
                name="password"
                rules={[{ required: true, pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/, message: helpTitle}]}
            >
                <Input.Password placeholder='Пароль' data-test-id='registration-password'/>
            </Form.Item>

            <Form.Item
                className={styles.lastFormInput}
                name="password-confirm"
                dependencies={['password']}
                rules={[
                    {...requireWithoutTitle, min: 8},
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder='Повторите пароль'  data-test-id='registration-confirm-password'/>
            </Form.Item>
            <Form.Item className={styles.flexColumn}>
                <Button
                    data-test-id='registration-submit-button'
                    style={{marginBottom: 'var(--m)'}}
                    type="primary"
                    block={true}
                    disabled={disabledSave}
                    htmlType="submit">
                    Войти
                </Button>
                <Button type="default" htmlType="submit" block={true}>
                    <GooglePlusOutlined />
                    Регистрация через Google
                </Button>
            </Form.Item>
        </Form>
    )
}
