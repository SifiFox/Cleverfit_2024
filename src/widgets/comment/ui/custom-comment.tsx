import React from 'react';
import {StarFilled, StarOutlined} from '@ant-design/icons';
import {Avatar, Comment, Rate, Tooltip} from 'antd';

import styles from './custom-comment.module.scss'

import {TFeedback} from '@/features/feedbacks/ui/feedbacks.tsx';

export type FeedbackProps = {
   feedback: TFeedback
}

export const CustomComment: React.FC<FeedbackProps> = ({feedback}: FeedbackProps) => {
    const prettyDate = new Date(feedback.createdAt).toLocaleDateString('ru-RU')

    return <Comment
        className={styles.comment}
        avatar={<div className={styles.avatarWrapper}> <Avatar src={feedback.imageSrc}/> <span>{feedback.fullName ?? 'Имя автора'}</span> </div>}
        datetime={
            <Tooltip className={styles.rateDateRow}>
                <Rate
                    value={feedback.rating}
                    character={
                    // eslint-disable-next-line react/no-unstable-nested-components
                        ({index}) =>
                            Number(index) < feedback.rating
                                ? <StarFilled/>
                                : <StarOutlined style={{color: '#fadb14'}}/>}
                    disabled={true}
                />
                <span>{prettyDate}</span>
            </Tooltip>
        }
        content={feedback.message}
    />
}
