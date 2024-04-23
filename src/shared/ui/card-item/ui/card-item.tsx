import React, {memo, ReactNode} from 'react';
import {Card, CardProps} from 'antd';

import {classNames} from '@/shared/lib/classnames/classnames.ts';

interface CardItemProps extends CardProps{
    children: ReactNode,
    className?: string
}

export const CardItem: React.FC<CardItemProps> = memo((props: CardItemProps) => {
    const {
        children,
        className,
        ...other
    } = props;

    return(
        <Card className={classNames('', {}, [className])} {...other}>
            {children}
        </Card>
    )
})
