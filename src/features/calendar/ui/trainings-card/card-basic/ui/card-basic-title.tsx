import React from 'react';
import {CloseOutlined} from '@ant-design/icons';

import styles from '@/features/calendar/ui/custom-popover/ui/custom-popover.module.scss';

import {formattedDate} from '@/features/calendar/helpers/helpers.tsx';
import {CardBasicTitleProps} from '@/features/calendar/model/types/training.ts';

export const CardBasicTitle: React.FC<CardBasicTitleProps> = (props: CardBasicTitleProps) => {
    const {date, onClose, isEmpty} = props

    return(
        <div className={styles.cardHeader}>
            <div className={styles.layoutBlocks}>
                <p className={styles.cardTitle}>Тренировки на {formattedDate(date)}</p>
                {
                    isEmpty &&
                    <p className={styles.cardSubtitle}>Нет активных тренировок</p>
                }
            </div>
            <div
                role='presentation'
                data-test-id='modal-create-training-button-close'
                className={styles.closeBtn}
                onClick={onClose}
            >
                <CloseOutlined />
            </div>
        </div>
    )
}
