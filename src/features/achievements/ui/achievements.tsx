import React, {ReactNode, useState} from 'react';
import {Tabs} from 'antd';

import {AchievementsLayouts} from '@/features/achievements/constants/constants.tsx';
import {filterTrainings} from '@/features/achievements/helpers/helpers.ts';
import {Charts} from '@/features/achievements/ui/charts/ui/charts.tsx';
import {FilterType} from '@/features/achievements/ui/charts-filters/ui/charts-filters.tsx';
import {useTrainingsSelector} from '@/features/calendar/model/slices/trainings-slice.ts';
import {useAppSelector} from '@/hooks';


const tabs = [
    {label: 'За неделю', key: AchievementsLayouts.WEEK, children: <Charts period={AchievementsLayouts.WEEK}/>},
    {label: 'За месяц', key: AchievementsLayouts.MONTH,  children: <Charts period={AchievementsLayouts.MONTH}/>},
    {label: 'За всё время (PRO)', key: AchievementsLayouts.ALL, children: <Charts period={AchievementsLayouts.ALL}/>},
]

type AchievementsTab = {
    label: string,
    key: AchievementsLayouts,
    children: ReactNode,
}
const renderTab = (tabItem: AchievementsTab, handleClickTab: (arg: AchievementsLayouts) => void) => <span onClick={() => handleClickTab(tabItem.key)}>{tabItem.label}</span>;

export const Achievements: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState<FilterType>({name: 'Все', key: 'all'})
    const [selectedTab, setSelectedTab] = useState<AchievementsLayouts>(AchievementsLayouts.WEEK)
    const {trainings, trainingsListState} = useAppSelector(useTrainingsSelector)
    const handleClickTab = (targetKey: AchievementsLayouts) => {
        if(targetKey !== AchievementsLayouts.ALL){
            setSelectedTab(targetKey)
        }
    }
    const handleClickFilter = (item: FilterType) => {
        setSelectedFilter(item)
    }

    if(trainings){
        const filteredTrainings = filterTrainings(trainings, {
            period: selectedTab,
            type: selectedFilter
        })

        return (
            <Tabs
                destroyInactiveTabPane={true}
            >
                {tabs.map((tab) => (
                    <Tabs.TabPane tab={renderTab(tab, handleClickTab)} key={tab.key} disabled={tab.key === AchievementsLayouts.ALL}>
                        {React.cloneElement(tab.children,
                            {
                                additionalProps: {
                                    handleClickFilter,
                                    selectedFilter,
                                    trainingsListState,
                                    filteredTrainings
                                }})}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        )
    }

        return null
    
}
