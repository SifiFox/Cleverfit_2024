import React from 'react';
import {AndroidFilled, AppleFilled} from '@ant-design/icons';
import {history} from '@redux/configure-store.ts';
import {Button, Card} from 'antd';

import styles from './footer.module.scss'

import {AppRoutes} from '@/shared/config/route-config/route-config.tsx';

export const Footer: React.FC = () => {
    const handleClickFeedback = () => {
        history.push(AppRoutes.FEEDBACKS, {state: {from: AppRoutes.MAIN}})
    }

    return(
        <div className={styles.footer}>
            <Button
                type='link'
                className={styles.footerBtn}
                onClick={handleClickFeedback}
                data-test-id='see-reviews'
            >
                Смотреть отзывы
            </Button>
            <Card
                extra={
                    <div className={styles.extra}>
                        <Button type='link'>
                            Скачать на телефон
                        </Button>
                        <p>Доступно в PRO-тарифе</p>
                    </div>
                }
                bordered={false}
            >
                <Button type='text'>
                    <AndroidFilled />
                    <span>Android OS</span>
                </Button>
                <Button type='text'>
                    <AppleFilled />
                    <span>Apple iOS</span>
                </Button>
            </Card>
        </div>
    )
}
