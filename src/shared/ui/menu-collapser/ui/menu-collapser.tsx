import React, {useEffect, useState} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {useWindowWidth} from '@hooks/index.ts';

import styles from './menu-collapser.module.scss'

type MenuCollapseProps = {
    collapsed: boolean,
    handleClick: (collapsed: boolean) => void
}

enum TestIdValue {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    DESKTOP= 'sider-switch',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MOBILE = 'sider-switch-mobile'
}
export const MenuCollapser: React.FC<MenuCollapseProps> = ({collapsed, handleClick}:MenuCollapseProps) => {
    const windowWidth = useWindowWidth();
    const isDesktop = windowWidth > 750
    const [testId, setTestId] = useState('')

    useEffect(()=>{
        isDesktop
            ? setTestId(TestIdValue.DESKTOP)
            : setTestId(TestIdValue.MOBILE)
    },[setTestId, windowWidth, isDesktop])

    return(
        <div
            className={styles.collapseTrigger}
            data-test-id={testId}
        >
            {
                collapsed
                    ? <MenuUnfoldOutlined style={{color: '#8C8C8C'}}  className={styles.trigger} onClick={() => handleClick(!collapsed)}/>
                    : <MenuFoldOutlined style={{color: '#8C8C8C'}} className={styles.trigger} onClick={() => handleClick(!collapsed)}/>
            }
        </div>
    )
}
