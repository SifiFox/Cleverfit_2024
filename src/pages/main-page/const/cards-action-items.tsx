import {ReactNode} from 'react';
import {CalendarTwoTone, HeartFilled, ProfileOutlined} from '@ant-design/icons';

type CardsActionsItem = {
    key: number,
    title: string,
    link: string,
    icon?: ReactNode,
    body?: string,
    testId?: string
}

export const CARDS_ACTIONS_ITEMS:CardsActionsItem[] = [
    {
        key: 1,
        title: 'Расписать тренировки',
        link: '/training',
        icon: <HeartFilled className='card-action__icon' style={{color:'#2F54EB'}} />,
        body: 'Тренировки',
        testId: 'menu-button-training'
    },
    {
        key: 2,
        title: 'Назначить календарь',
        link: '/calendar',
        icon: <CalendarTwoTone className='icon-two-colors-light card-action__icon' />,
        body: 'Календарь',
        testId: 'menu-button-calendar'
    },
    {
        key: 3,
        title: 'Заполнить профиль',
        link: '/profile',
        icon: <ProfileOutlined className='card-action__icon' style={{color:'#2F54EB'}} />,
        body: 'Профиль',
        testId: 'menu-button-profile'
    }]
