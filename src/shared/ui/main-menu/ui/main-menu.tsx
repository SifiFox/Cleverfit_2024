import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {CalendarTwoTone, HeartFilled, ProfileOutlined, TrophyFilled} from '@ant-design/icons';
import {history} from '@redux/configure-store.ts';
import {Badge, Menu, MenuProps} from 'antd'

import styles from './main-menu.module.scss'

import {useGetInvitesQuery} from '@/features/invite/model/invite-service.ts';
import {setInvitesState} from '@/features/invite/model/slices/invite-slice.ts';
import {useAppDispatch, useWindowWidth} from '@/hooks';
import {isDesktopWidth} from '@/shared/const/constants.tsx';
import {classNames} from '@/shared/lib/classnames/classnames.ts';

export type MenuItem = Required<MenuProps>['items'][number];
type MainMenuProps = {
    collapsed?: boolean
}

export const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {
    const {collapsed} = props;
    const {data} = useGetInvitesQuery(false)
    const location = useLocation()
    const dispatch = useAppDispatch()
    const windowWith = useWindowWidth()

    useEffect(() => {
        if (data) {dispatch(setInvitesState(data))}
    }, [data]);
    const handleMenuItemClick = (menuItem: MenuItem) => {
        if(menuItem?.key && typeof menuItem?.key === 'string'){
            history.push(menuItem?.key, {state: {from: history.location.pathname}})
        }
    }

    return (
        <Menu
            theme="light"
            mode="vertical"
            className={classNames(styles.mainMenu, {}, [collapsed ? 'main-menu__collapsed' : null])}
            defaultSelectedKeys={[location.pathname]}
        >
            <Menu.Item onClick={(item) => handleMenuItemClick(item)}
                       key="/calendar"
                       icon={<CalendarTwoTone/>} title="Календарь">Календарь</Menu.Item>
            <Menu.Item
                onClick={(item) => handleMenuItemClick(item)}
                key="/training"
                icon={data && isDesktopWidth(windowWith)
                        ? <Badge count={data.length} offset={[3, 0]} size="small" data-test-id='notification-about-joint-training'>
                            <HeartFilled/>
                        </Badge>
                        : <HeartFilled/>
                }
                title="Тренировки">
                Тренировки
            </Menu.Item>
            <Menu.Item onClick={(item) => handleMenuItemClick(item)}
                       key="/achievements" icon={<TrophyFilled/>}
                       title="Достижения"
                       data-test-id='sidebar-achievements'>
                Достижения
            </Menu.Item>
            <Menu.Item onClick={(item) => handleMenuItemClick(item)}
                       key="/profile" icon={<ProfileOutlined/>}
                       title="Профиль">Профиль</Menu.Item>
        </Menu>

    )
}
