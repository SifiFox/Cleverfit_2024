import React from 'react';
import {history} from '@redux/configure-store.ts';
import {Button, Result} from 'antd';

import styles from './not-found-page.module.scss'

import {AppRoutes} from '@/shared/config/route-config/route-config.tsx';

export const NotFoundPage: React.FC = () => {
    const handleClick = () => {
        history.push(AppRoutes.AUTH)
    }

    return (
        <div className={styles.notFoundWrapper}>
            <div>
                <Result
                    status="404"
                    title="Такой страницы нет"
                    subTitle="Извините, страница не найдена, возможно, она была удалена или перемещена."
                    extra={<Button onClick={handleClick} type="primary">На главную</Button>}
                />
            </div>
        </div>
    )
}
