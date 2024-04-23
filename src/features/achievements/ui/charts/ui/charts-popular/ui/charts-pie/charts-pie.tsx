import React, {useMemo} from 'react';
import { Pie } from '@ant-design/charts';

import 'antd/dist/antd.css';
import styles from '../charts-popular.module.scss'

import {
    aggregateExerciseCounts
} from '@/features/achievements/ui/charts/ui/charts-popular/helpers/helpers.tsx';
import {
    PopularTrainingsType
} from '@/features/achievements/ui/charts/ui/charts-popular/ui/charts-popular.tsx';
import {
    MostPopular
} from '@/features/achievements/ui/load-list/ui/load-list-item/load-list-item.tsx';

type ChartsPieProps = {
    trainings: PopularTrainingsType[]
}
export const ChartsPie: React.FC<ChartsPieProps> = (props) => {
    const {trainings} = props
    const exerciseCounts = useMemo(() => trainings.flatMap((training: { mostPopular: MostPopular; }) => training.mostPopular), [trainings])

    const dataArray = aggregateExerciseCounts(exerciseCounts)
    const config = {
        appendPadding: 20,
        data: dataArray,
        innerRadius: 0.6,
        angleField: 'count',
        colorField: 'name',
        radius: 0.8,
        legend: false,
        label: {
            text: 'name',
            style: {
                fill: '#262626',
                offset: 50,
                fontSize: 'var(--ssm)',
                fontWeight: 500
            }
        },
        tooltip: false
    };

    return <div className={styles.pieWrapper}><Pie {...config} /></div>;
}


