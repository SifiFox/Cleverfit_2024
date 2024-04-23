
import {Image} from 'antd';

import styles from './charts-empty.module.scss'

import noFoundImg from '@/shared/assets/images/noFoundImage.png'

export const ChartsEmpty = () => (
        <div className={styles.chartsEmpty}>
            <Image
                src={noFoundImg}
                preview={false}
                width={200}
            />
            <p>Ой, такой тренировки на этой неделе не было.</p>
        </div>
    )
