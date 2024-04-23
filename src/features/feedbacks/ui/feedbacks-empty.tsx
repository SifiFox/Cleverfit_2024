import React from 'react';
import {Button, Typography} from 'antd';

import styles from './feedbacks.module.scss'

import {useAppDispatch, useAppSelector} from '@/hooks';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalWriteFeedback} from '@/widgets/custom-modal/const/modals.tsx';
import {setModalState, useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';

export const FeedbacksEmpty: React.FC = () => {
    const dispatch = useAppDispatch()
    const {openWriteModal} = useAppSelector(useModalStateSelector)
    const handleClickWriteFeedback = () => {
        dispatch(setModalState({openWriteModal: true}))
    }

    return (
        <div className={styles.feedbacksEmpty}>
            {
                openWriteModal &&
                    <CustomModal open={true} title="Ваш отзыв" closable={true} footer={null}>
                        <ModalWriteFeedback />
                    </CustomModal>
            }
            <div className={styles.typographyBlock}>
                <Typography.Title
                    level={3}
                    style={{color: '#061178'}}
                >
                    Оставьте свой отзыв первым
                </Typography.Title>
                <Typography.Text
                    style={{color: '#8C8C8C'}}
                >
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                    Поделитесь своим мнением и опытом с другими пользователями, и помогите им сделать правильный выбор.
                </Typography.Text>
            </div>

            <Button
                type="primary"
                data-test-id='write-review'
                onClick={handleClickWriteFeedback}
            >
                Написать отзыв
            </Button>
        </div>
    )
}
