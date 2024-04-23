import React from 'react';
import {Column} from '@ant-design/charts';
import {ColumnConfig} from '@ant-design/plots/es/components/column';
import moment from 'moment';

import {AchievementsLayouts} from '@/features/achievements/constants/constants.tsx';
import {FormattedTrainingType} from '@/features/achievements/helpers/helpers.ts';

moment.updateLocale('ru', {
    week: { dow: 1 }
});
type LoadGraphicProps = {
    trainings: FormattedTrainingType[],
    period: AchievementsLayouts
}
export const LoadGraphic: React.FC<LoadGraphicProps> = (props) => {
    const {trainings, period} = props
    const config: ColumnConfig = {
        data: trainings,
        height: 266,
        xField: 'shortDate',
        yField: 'average',
        style: {
            fill: '#85A5FF',
            maxWidth: 90
        },
        xAxis: {
            label: {
                autoRotate: false
            },
        },
        axis: {
            x: {tick: false},
            y: { labelFormatter: (val: string) => `${val} кг`, tick: false }
        }
    };

    if(period !== AchievementsLayouts.WEEK){
        config.scrollbar = {
            x: {
                ratio: 0.5,
            },
        }
    }

    return <Column {...config} />;
}
