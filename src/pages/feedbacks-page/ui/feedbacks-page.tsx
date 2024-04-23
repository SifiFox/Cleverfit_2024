import React, {useEffect, useState} from 'react';
import {FeedbacksFooter} from '@pages/feedbacks-page/ui/feedbacks-footer/ui/feedbacks-footer.tsx';
import {Content} from 'antd/es/layout/layout';

import styles from './feedbacks-page.module.scss'

import {Feedbacks} from '@/features/feedbacks';
import {useLazyGetFeedbacksQuery} from '@/features/feedbacks/model/services/feedbacks-service.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {TBreadcrumb} from '@/shared/config/route-config/route-config.tsx';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {CustomModal} from '@/widgets/custom-modal';
import { ModalServerError} from '@/widgets/custom-modal/const/modals.tsx';
import {setModalState, useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';
import {Header} from '@/widgets/header';

type FeedbackPageProps = {
    breadcrumbs: TBreadcrumb[]
}
export const FeedbacksPage: React.FC<FeedbackPageProps> = (props: FeedbackPageProps) => {
    const modalState = useAppSelector(useModalStateSelector)
    const dispatch = useAppDispatch()
    const [showAll, setShowAll] = useState(false)
    const {breadcrumbs} = props
    const [fetchFeedbacks ,{isFetching, data: comments, isError}] = useLazyGetFeedbacksQuery()

    const handleClickShowAll = () => {
        setShowAll((prev) => !prev)

    }

    useEffect(() => {
        fetchFeedbacks(false)
    }, [fetchFeedbacks]);

    useEffect(() => {
        dispatch(setLoading(isFetching))
        if(isError){
            dispatch(setModalState({openServerErrorModal: true}))
        }
    }, [dispatch, isFetching, comments, isError]);

    return (
        <React.Fragment>
            {
                modalState.openServerErrorModal &&
                <CustomModal
                    open={true}
                    closable={false}
                >
                    <ModalServerError />
                </CustomModal>
            }
            <Header breadcrumbsOnly={true} breadcrumbs={breadcrumbs}/>
            <Content className={styles.feedbacksWrapper}>
                {
                    comments?.length > 0
                        ? <React.Fragment>
                            <Feedbacks feedbacks={comments} showAll={showAll}/>
                            <FeedbacksFooter isShowAll={showAll} onClickShowAll={handleClickShowAll} />
                          </React.Fragment>
                        : <Feedbacks feedbacks={null} showAll={false}/>
                }
            </Content>
        </React.Fragment>
    )
}
