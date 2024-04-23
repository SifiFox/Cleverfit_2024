import React, {useEffect, useState} from 'react';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import Search from 'antd/es/input/Search';

import styles from '../../workouts-joint.module.scss'

import { WorkoutsJointTypes } from '@/features/workout/constants/constants';
import {sortPartners} from '@/features/workout/helpers/helpers.ts';
import {useWorkoutSelector} from '@/features/workout/model/slices/workout-slice.ts';
import {
    PartnersList
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-patners/ui/partners-list/partners-list.tsx';
import {useAppSelector} from '@/hooks';


export const WorkoutsJointPartners: React.FC<{changeLayout: (arg: WorkoutsJointTypes) => void}> = ({changeLayout}) => {
    const {partners} = useAppSelector(useWorkoutSelector)
    const [search, setSearch] = useState('')
    const [partnersList, setPartnersList] = useState(partners)
    const onSearch = (value: string) => {
        setSearch(value)
    }

    useEffect(() => {
        setPartnersList(partners)
    }, [partners]);
    const filteredPartners = sortPartners(partnersList).filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <React.Fragment>
            <div className={styles.workoutsPartnersHead}>
                <Button type="text" onClick={() => changeLayout(WorkoutsJointTypes.BASIC)}>
                    <ArrowLeftOutlined/>
                    Назад
                </Button>
                <Search
                    data-test-id='search-input'
                    placeholder='Поиск по имени'
                    onSearch={onSearch}
                    className={styles.search}
                />
            </div>
            <div>
                <PartnersList searchedValue={search} partners={filteredPartners} />
            </div>
        </React.Fragment>
    )
}
