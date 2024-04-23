import React from 'react';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {TariffInfo} from '@pages/settings-page/ui/tarif-drawer/constants/constants.ts';

import styles from '@pages/settings-page/ui/tarif-drawer/ui/tarif-drawer.module.scss';


type TariffsInfoBlockProps = {
    tariffsInfo: TariffInfo[]
}
export const TariffsInfoBlock:React.FC<TariffsInfoBlockProps> = (props: TariffsInfoBlockProps) => {
    const {tariffsInfo} = props

    return (
        <div className={styles.tarifsInfo}>
            {
                tariffsInfo?.map((option, index) =>
                    <div key={index} className={styles.optionRow}>
                        <p className={styles.tarifsInfoTitle}>{option.title}</p>
                        <span>{option.free ? <CheckCircleOutlined/> :
                            <CloseCircleOutlined style={{color: 'var(--disable-25)'}}/>}</span>
                        <span>{option.pro ? <CheckCircleOutlined/> :
                            <CloseCircleOutlined style={{color: 'var(--disable-25)'}}/>}</span>
                    </div>
                )
            }
        </div>
    )
}
