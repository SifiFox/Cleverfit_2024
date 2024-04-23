import React, {useState} from 'react';
import {Radio, RadioChangeEvent, Space} from 'antd';

import styles from '@pages/settings-page/ui/tarif-drawer/ui/tarif-drawer.module.scss';

import {Tariff} from '@/features/user/model/slices/user-slice.ts';

const costWithCommas = (cost: number) => `${String(cost).replace('.', ',') } $`

export const Periods: React.FC<{tariff: Tariff}> = ({tariff}) => {
    const [value, setValue] = useState();
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    return (
        <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical" style={{width: '100%'}}>
                {
                    tariff?.periods?.map(item =>
                        <Radio key={item.cost} value={item.days} className={styles.tariffRadio}
                               data-test-id={`tariff-${item.cost}`}>
                            <p className={styles.tariffRadioTitle}>{item.text}</p>
                            <p style={{
                                fontWeight: 600,
                                whiteSpace: 'nowrap'
                            }}>{costWithCommas(item.cost)}</p>
                        </Radio>
                    )
                }
            </Space>
        </Radio.Group>
    )
}
