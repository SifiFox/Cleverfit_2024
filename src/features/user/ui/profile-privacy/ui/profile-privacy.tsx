import React from 'react';
import {Form, Input} from 'antd';

import styles from '@/features/user/ui/profile-info/ui/profile-info.module.scss';

const helpTitle = 'Пароль не менее 8 символов,  с заглавной буквой и цифрой'
const requireWithoutTitle = { required: true, message: '' }
const equalPassValidation = (getFieldValue: { (name: string): string; (arg0: string): string; }) => ({
        validator(_: any, value: string) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }

            return Promise.reject(new Error('Пароли не совпадают'));
        },
    })

export const ProfilePrivacy: React.FC = () => (
        <div className={styles.profileInfoWrapper}>
            <div className={styles.profilePrivacyInputs}>
                <Form.Item
                    name="email"
                    rules={[
                        {type: 'email', message: ''},
                        requireWithoutTitle]}
                >
                    <Input data-test-id='profile-email' addonBefore="e-mail:"/>
                </Form.Item>

                <Form.Item
                    help={helpTitle}
                    name="password"
                    rules={[{ required: false, pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/, message: helpTitle}]}
                >
                    <Input.Password placeholder='Пароль' data-test-id='profile-password'/>
                </Form.Item>
                <Form.Item
                    name="passwordConfirm"
                    dependencies={['password']}
                    rules={[({ getFieldValue }) => equalPassValidation(getFieldValue)]}
                >
                    <Input.Password placeholder='Повторите пароль'  data-test-id='profile-repeat-password'/>
                </Form.Item>
            </div>
        </div>
    )

