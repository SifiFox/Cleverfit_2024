import React, {useEffect} from 'react';
import {Content} from 'antd/es/layout/layout';

import styles from './calendar-page.module.scss'

import { useLazyGetTrainingsQuery} from '@/features/calendar/model/services/trainings-service.ts';
import {setTrainingsState} from '@/features/calendar/model/slices/trainings-slice.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {PageProps} from '@/shared/config/route-config/route-config.tsx';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {CustomCalendar} from '@/widgets/calendar';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalServerError} from '@/widgets/custom-modal/const/modals.tsx';
import {setModalState, useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';
import {Header} from '@/widgets/header';

export const CalendarPage: React.FC<PageProps>  = ({breadcrumbs}:PageProps) => {
    const modalState = useAppSelector(useModalStateSelector)
    const [fetchTrainings ,{isFetching, data: trainings, isError}] = useLazyGetTrainingsQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchTrainings(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(setLoading(isFetching))
        if(isError){
            dispatch(setModalState({openServerErrorModal: true}))
        }
        if(trainings){
            dispatch(setTrainingsState({trainings}))
        }
    }, [dispatch, isFetching, trainings, isError]);


    return (
        <React.Fragment>
            {
                modalState.openServerErrorModal &&
                <CustomModal
                    open={true}
                    closable={false}
                    data-test-id='modal-no-review'
                >
                    <ModalServerError />
                </CustomModal>
            }
            {
                trainings && (
                    <React.Fragment>
                        <Header breadcrumbs={breadcrumbs} withSettings={true}/>
                        <Content className={styles.calendarContent}>
                            <CustomCalendar trainings={trainings} />
                        </Content>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    );
};
