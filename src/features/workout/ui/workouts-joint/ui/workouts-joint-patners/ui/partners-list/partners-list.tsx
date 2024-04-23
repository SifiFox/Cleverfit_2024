import React from 'react';
import {List} from 'antd';

import {PartnerType} from '@/features/workout/model/slices/workout-slice.ts';
import {
    PartnerCard
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-patners/ui/partner-card/partner-card.tsx';



type PartnersListProps = {
    partners: PartnerType[],
    searchedValue: string
}

export const PartnersList: React.FC<PartnersListProps> = (props) => {
   const {partners, searchedValue} = props

    return (
        <List
            grid={{
                gutter: 16,
            }}
            dataSource={partners}
            pagination={{
                pageSize: 12,
                size: 'small'
            }}
            renderItem={(item, index) => (
                <List.Item>
                    <PartnerCard index={index} searchedValue={searchedValue} partner={item} />
                </List.Item>
            )}
        />
    )
}
