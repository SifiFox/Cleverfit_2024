import React, {useEffect, useState} from 'react';

import styles from './feedbacks.module.scss'

import {FeedbacksEmpty} from '@/features/feedbacks/ui/feedbacks-empty.tsx';
import {useAppSelector} from '@/hooks';
import {classNames} from '@/shared/lib/classnames/classnames.ts';
import {CustomComment} from '@/widgets/comment';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalError, ModalSuccess} from '@/widgets/custom-modal/const/modals.tsx';
import {useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';

export type TFeedback = {
    id: string,
    fullName: string | null,
    createdAt: string,
    imageSrc: string | null,
    message: string | null,
    rating: number
}

type FeedbacksProps = {
    showAll: boolean
    feedbacks?: TFeedback[] | null,
}

type FeedbacksListProps = {
    currFeedbacks: TFeedback[],
    showAll: boolean
}

const FeedbacksList = (props: FeedbacksListProps) => {
    const {currFeedbacks, showAll} = props

    if(showAll){
        return currFeedbacks.map((feedback, index) => <CustomComment feedback={feedback} key={index}/>)
    }

      return currFeedbacks.slice(1, 5).map((feedback, index) => <CustomComment feedback={feedback} key={index}/>)

}

export const Feedbacks: React.FC<FeedbacksProps> = (props: FeedbacksProps) => {
    const [currFeedbacks, setCurrFeedbacks] = useState<TFeedback[] | null>(null)
    const {feedbacks, showAll} = props
    const modalState = useAppSelector(useModalStateSelector)

    const sortFeedbacks = (feedbacks: TFeedback[]) => {
        const localFeedbacks = JSON.parse(
            JSON.stringify(feedbacks))
            .sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        setCurrFeedbacks(localFeedbacks)
    }

    useEffect(() => {
        if(feedbacks){
            sortFeedbacks(feedbacks)
        }
    }, [feedbacks]);

    return(
        <div className={classNames(styles.feedbacks, {}, [!currFeedbacks && styles.feedbacksCentred])}>
            {
                modalState.openErrorModal &&
                <CustomModal
                    open={true}

                >
                    <ModalError />
                </CustomModal>
            }
            {
                modalState.openSuccessModal &&
                    <CustomModal
                        open={true}
                        key='modal_success'
                    >
                        <ModalSuccess />
                    </CustomModal>
            }
            {
                currFeedbacks
                    ? <FeedbacksList currFeedbacks={currFeedbacks} showAll={showAll}/>
                    : <FeedbacksEmpty />
            }
        </div>
    )
}

