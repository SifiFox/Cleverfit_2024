import React from 'react';
import {Navigate} from 'react-router-dom';
import {Col, Row} from 'antd';
import {Content} from 'antd/es/layout/layout';

import {AuthLayouts} from '../const/auth-layouts.ts';

import styles from './auth-page.module.scss'

import {Auth} from '@/features/auth';
import {useAuthSelector} from '@/features/auth/model/slices/auth-slice.ts';
import {
    ChangePasswordForm
} from '@/features/auth/ui/change-password-form/ui/change-password-form.tsx';
import {ConfirmEmailForm} from '@/features/auth/ui/confirm-email-form';
import {useAppSelector} from '@/hooks';
import {classNames} from '@/shared/lib/classnames/classnames.ts';
import {ResultForm} from '@/widgets/result';

type AuthPageProps = {
    type: AuthLayouts
}

const LayoutByType: Record<AuthLayouts, React.JSX.Element>  = {
    [AuthLayouts.AUTH]: <Auth type={AuthLayouts.AUTH}/>,
    [AuthLayouts.REGISTRATION]: <Auth type={AuthLayouts.REGISTRATION}/>,
    [AuthLayouts.RESULT]: <ResultForm />,
    [AuthLayouts.CONFIRM]: <ConfirmEmailForm />,
    [AuthLayouts.CHANGE_PASSWORD]: <ChangePasswordForm />,
};


export const AuthPage: React.FC<AuthPageProps> = (props: AuthPageProps) => {
    const {auth} = useAppSelector(useAuthSelector)

    if(auth){
        return <Navigate to="/main"/>
    }

    return (
        <Content className={styles.authContent}>
            <div className={styles.formWrapper}>
                <Row justify='center'>

                    <Col className={
                        classNames(
                            styles.formContent,
                            {},
                            [styles[props.type]])}
                         xs={22} md={16} lg={9}
                    >
                        {LayoutByType[props.type]}
                    </Col>
                </Row>
            </div>
        </Content>
    );
};
