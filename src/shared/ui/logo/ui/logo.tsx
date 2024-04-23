import React from 'react';

import Clever from '../../../assets/images/Clever.svg'
import Fit from '../../../assets/images/fit.svg'
import {classNames} from '../../../lib/classnames/classnames.ts'

import styles from './logo.module.scss'

type LogoProps = {
    collapsed: boolean
}

export const Logo:React.FC<LogoProps> = ({collapsed}:LogoProps) => (
        <div className={classNames(styles.logoWrapper, {[styles.collapsed]: collapsed} )}>
            <div className={classNames( styles.logoContainer, {[styles.logoContainerCollapsed]: collapsed})}>
                <div className={styles.logo}>
                    {
                        !collapsed && <img src={Clever} className={styles.logoClever} alt=""/>
                    }
                    <img src={Fit} className={styles.logoFit} alt=""/>
                </div>
            </div>
        </div>
    )
