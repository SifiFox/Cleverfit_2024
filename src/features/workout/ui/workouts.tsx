import React, {ReactNode} from 'react';
import {Badge, Tabs} from 'antd';

import { TrainingLayouts } from '../constants/constants';

import {useGetInvitesQuery} from '@/features/invite/model/invite-service.ts';
import {InviteType} from '@/features/invite/model/slices/invite-slice.ts';
import {WorkoutsJoint} from '@/features/workout/ui/workouts-joint/ui/workouts-joint.tsx';
import {
    WorkoutsMarathons
} from '@/features/workout/ui/workouts-marathons/ui/workouts-marathons.tsx';
import {WorkoutsMy} from '@/features/workout/ui/workouts-my/ui/workouts-my.tsx';


const LayoutByType: Record<TrainingLayouts, React.JSX.Element> = {
    [TrainingLayouts.MY]: <WorkoutsMy/>,
    [TrainingLayouts.JOINT]: <WorkoutsJoint/>,
    [TrainingLayouts.MARATHONS]: <WorkoutsMarathons/>,
};

type WorkoutTab = {
    label: string,
    key: string,
    children: ReactNode,
    count?: number
}


const tabs = [
    {label: 'Мои тренировки', key: 'my', children: LayoutByType.my},
    {label: 'Совместные тренировки', key: 'joint', count: true,  children: LayoutByType.joint},
    {label: 'Марафоны', key: 'marathons', children: LayoutByType.marathons},
];

const renderTab = (tabItem: WorkoutTab, invites: InviteType[]) => {
    if (invites && tabItem.count) {
        return (
            <div>
                {tabItem.label}
                <Badge
                    offset={[4,0]}
                    style={{minWidth: 24, maxHeight: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0}}
                    count={invites?.length}/>
            </div>
        );
    }

    return tabItem.label;
};

export const Workouts: React.FC= () => {
    const {data} = useGetInvitesQuery(false)

    return (
        <Tabs>
                {tabs.map((tab) => (
                    <Tabs.TabPane tab={renderTab(tab, data)} key={tab.key}>
                        {tab.children}
                    </Tabs.TabPane>
                ))}
            </Tabs>
    )
}
