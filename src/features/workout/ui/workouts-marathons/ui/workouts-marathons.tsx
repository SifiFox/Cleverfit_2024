import React from 'react';

import styles from '../../workout.module.scss'

export const WorkoutsMarathons: React.FC = () => (
        <div className={styles.marathonsWrapper}>
            <p className={styles.marathonsTitle}>В данный период <br/> ни один марафон не проводится</p>
            <p className={styles.marathonsSubTitle}>Заглядывайте сюда почаще <br/> и ваш первый марафон скоро начнётся.</p>
        </div>
    )
