import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {AuthLayouts} from '@pages/auth-page/const/auth-layouts.ts';
import {Tabs} from 'antd';

import styles from './auth.module.scss'

import {LoginForm} from '@/features/auth/ui/login-form';
import {RegisterForm} from '@/features/auth/ui/register-form';
import TitleLogo from '@/shared/assets/images/logo__full.svg?react'

const tabs = [
    { label: 'Вход', path: '/auth', key: '', children: <LoginForm/> },
    { label: 'Регистрация', path: '/auth/registration', key: 'registration', children: <RegisterForm/> },
];

type AuthProps = {
    type?: AuthLayouts
}

export const Auth: React.FC<AuthProps> = (props: AuthProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleClickTab = (value: string) => {
        navigate(`/auth/${value}`, {state: {from: location}})
    }

    const {type} = props;

    return(
        <React.Fragment>
            <TitleLogo className={styles.titleLogo}/>
            <Tabs
                onChange={(value) => handleClickTab(value)}
                className={styles.authTabs}
                defaultActiveKey={type}
                centered={true}
                items={tabs}
            />
        </React.Fragment>
    )
}
