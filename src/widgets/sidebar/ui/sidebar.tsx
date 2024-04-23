import React, {useEffect, useState} from 'react';
import {useAppDispatch, useWindowWidth} from '@hooks/index.ts'
import {Layout} from 'antd';

import styles from './sidebar.module.scss'

import {logout} from '@/features/auth/model/slices/auth-slice.ts';
import {clearUserState} from '@/features/user/model/slices/user-slice.ts';
import LogoutIcon from '@/shared/assets/images/exit.svg?react'
import {classNames} from '@/shared/lib/classnames/classnames.ts';
import {CustomButton} from '@/shared/ui/custom-button';
import {Logo} from '@/shared/ui/logo';
import {MainMenu} from '@/shared/ui/main-menu';
import {MenuCollapser} from '@/shared/ui/menu-collapser/ui/menu-collapser.tsx';

const { Sider } = Layout;

type TSiderSize = {
    width: number,
    collapsedWidth: number
}
export const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const windowWidth = useWindowWidth();
    const [siderSize, setSiderSize] = useState<TSiderSize>({
        width: 0,
        collapsedWidth: 0
    })
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if (windowWidth >= 834) setSiderSize({width: 208, collapsedWidth: 64})
        else setSiderSize({width: 106, collapsedWidth: 64})
    },[windowWidth])

    const handleClickLogout = () => {
        dispatch(logout())
        dispatch(clearUserState())
    }

    return (
        <Sider
            className={classNames(styles.sider, {[styles.collapsed]: collapsed})}
            trigger={null}
            collapsible={true}
            collapsed={collapsed}
            width={siderSize.width}
            collapsedWidth={siderSize.collapsedWidth}
        >
            <div>

                <MenuCollapser collapsed={collapsed} handleClick={setCollapsed} />
                <Logo collapsed={collapsed} />
                <MainMenu collapsed={collapsed} />
            </div>
            <div role="presentation" className={styles.logout} onClick={handleClickLogout}>
                <CustomButton
                    divider={true}
                    collapsed={collapsed}
                    icon={<LogoutIcon className={styles.logoutIcon}/>}
                    textAlign='left'
                    title="Выход"
                />
            </div>
        </Sider>
    )
}
