import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeftOutlined, SettingOutlined} from '@ant-design/icons';
import {history} from '@redux/configure-store.ts';
import {Breadcrumb, Button, Col, Row} from 'antd';

import styles from './header.module.scss'

import {AppRoutes, TBreadcrumb} from '@/shared/config/route-config/route-config.tsx';
import {classNames} from '@/shared/lib/classnames/classnames.ts';

type HeaderProps = {
    title?: string,
    breadcrumbs?: TBreadcrumb[],
    breadcrumbsOnly?: boolean,
    withSettings?: boolean,
    titleClickable?: boolean
}
export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const {
        title,
        breadcrumbs,
        breadcrumbsOnly = false,
        withSettings = false,
        titleClickable = false,
    } = props

    const handleClickSettings = () => {
        history.push(AppRoutes.SETTINGS, {state: {from: history.location.pathname}})
    }

    const handleClickBack = () => {
        history.push(history.location.state.state.from, {state: {from: history.location.pathname}})
    }

    return (
        <Col className={styles.header}>
            <Row>
                <Breadcrumb>
                    {breadcrumbs?.map((breadcrumb) =>
                        <Breadcrumb.Item key={breadcrumb.breadcrumbName}>
                            <Link to={breadcrumb.path}>{breadcrumb.breadcrumbName}</Link>
                        </Breadcrumb.Item>
                    )}
                </Breadcrumb>
            </Row>
            {
                !breadcrumbsOnly &&
                <Row
                    className={classNames(styles.content, {[styles.justifyRight]: withSettings}, [])}
                >
                    {
                        title &&
                        <Col xs={{span: 21}} md={{span: 20}} lg={{span: 21}}>
                            {
                                titleClickable
                                    ? <div
                                        role='presentation'
                                        data-test-id='settings-back'
                                        onClick={handleClickBack}
                                        className={styles.titleClickable}
                                    >
                                        <ArrowLeftOutlined/>
                                        <h1 className={styles.heading1}>{title}</h1>
                                    </div>
                                    : <h1 className={styles.heading1}>{title}</h1>
                            }
                        </Col>
                    }
                    {
                        withSettings &&
                        <Col xs={{span: 3}} md={{span: 4}} lg={{span: 3}}>
                            <Button
                                data-test-id='header-settings'
                                type="text"
                                block={true}
                                className={styles.btnSettings}
                                onClick={handleClickSettings}
                            >
                                <SettingOutlined/>
                                <span className={styles.btnSettingsTitle}>Настройки</span>
                            </Button>
                        </Col>
                    }
                </Row>
            }
        </Col>
    )
}
