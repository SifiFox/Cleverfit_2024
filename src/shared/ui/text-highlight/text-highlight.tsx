import React, {useId} from 'react';

import styles from './text-highlight.module.scss'

export const TextHighlight = ({base, target}) => {
    const regexp = new RegExp(target, 'ig');
    const matchValue = base.match(regexp);

    if (target && matchValue) {
        return base.split(regexp).map((unmatched, index, array) => index < array.length - 1
                ? <React.Fragment key={useId()}>{unmatched}
                    <span className={styles.highlight}>{matchValue.shift()}</span>
                </React.Fragment>
                : unmatched);
    }

        return <span>{base}</span>

}
