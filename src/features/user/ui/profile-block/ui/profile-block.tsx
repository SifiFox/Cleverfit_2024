import React, {ReactNode} from 'react';

import styles from './profile-block.module.scss'

type ProfileBlockProps = {
    title: string,
    children: ReactNode
}

export const ProfileBlock: React.FC<ProfileBlockProps> = ({children, title}) => (
        <div>
            <h5 className={styles.profileBlockTitle}>{title}</h5>
            {children}
        </div>
    )
