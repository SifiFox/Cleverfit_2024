import React from 'react';

import styles from '../../../../achievements.module.scss'

type StatCardProps = {
    title: string,
    value: string
}
export const StatCard: React.FC<StatCardProps> = (props) => {
    const {title, value} = props

    return (
        <div className={styles.statCard}>
            <span className={styles.cardValue}>{value}</span>
            <h3 className={styles.cardTitle}>{title}</h3>
        </div>
    )
}
