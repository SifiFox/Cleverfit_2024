import React from 'react';
import Lottie from 'lottie-react';

import loaderAnimation from '../const/loader.json'

import styles from './loader.module.scss'

import {classNames} from '@/shared/lib/classnames/classnames.ts';

type LoaderProps = {
    visible: boolean
}

export const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
    const {visible} = props

    return (
        <div data-test-id='loader' className={classNames(styles.loaderWrapper, {[styles.loaderHidden]: !visible}, [])}>
           <Lottie style={{transform: 'unset'}} className={styles.loaderSubject} animationData={loaderAnimation}/>
        </div>
    )
}
