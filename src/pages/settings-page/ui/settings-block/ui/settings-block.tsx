import React, {ReactNode} from 'react';

import styles from './settings-block.module.scss'


type SettingsBlockProps = {
    children: ReactNode,
    title: string
}
export const SettingsBlock: React.FC<SettingsBlockProps> = ({children, title}) => (
        <div>
            {
                title &&
                <h2 className={styles.settingsBlockTitle}>{title}</h2>
            }
            {children}
        </div>
    )
