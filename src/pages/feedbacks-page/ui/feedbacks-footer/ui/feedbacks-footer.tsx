import React from 'react';
import {Button} from 'antd';

import styles from './feedbacks-footer.module.scss'

import {useAppDispatch, useAppSelector} from '@/hooks';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalWriteFeedback} from '@/widgets/custom-modal/const/modals.tsx';
import {setModalState, useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';

type FeedbacksFooterProps = {
    isShowAll: boolean,
    onClickShowAll: () => void,
    showAllTitle?: string
}

const showAll = 'Развернуть все отзывы'
const hideAll = 'Свернуть все отзывы'

export const FeedbacksFooter: React.FC<FeedbacksFooterProps> = ({isShowAll, onClickShowAll, showAllTitle}: FeedbacksFooterProps) => {
    const modalState = useAppSelector(useModalStateSelector)
    const dispatch = useAppDispatch()
    const handleClickWriteFeedback = () => {
        dispatch(setModalState({openWriteModal: true}))
    }

    return(
        <div className={styles.feedbacksFooter}>
            {
                modalState.openWriteModal &&
                <CustomModal
                    open={true}
                    closable={true}
                    footer={null}
                    title='Ваш отзыв'
                    key='write'
                    data-test-id='tariff-modal-success'
                >
                        <ModalWriteFeedback />
                </CustomModal>
            }
            <Button
                data-test-id='write-review'
                type="primary"
                onClick={handleClickWriteFeedback}
            >
                Написать отзыв
            </Button>

            <Button
                type="link"
                onClick={onClickShowAll}
                data-test-id='all-reviews-button'
            >
                {isShowAll ? hideAll : showAllTitle ?? showAll}
            </Button>
        </div>
    )
}
