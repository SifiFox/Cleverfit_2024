import React, {useEffect} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {history} from '@redux/configure-store.ts';
import {Content} from 'antd/es/layout/layout';

import styles from './achievements-page.module.scss';

import {Achievements} from '@/features/achievements/ui/achievements.tsx';
import {useLazyGetTrainingsQuery} from '@/features/calendar/model/services/trainings-service.ts';
import {setTrainingsState} from '@/features/calendar/model/slices/trainings-slice.ts';
import {useLazyGetTrainingListQuery} from '@/features/catalogs/model/catalogs-service.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {PageProps} from '@/shared/config/route-config/route-config.tsx';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalServerError, ModalTrainingsListError} from '@/widgets/custom-modal/const/modals.tsx';
import {setModalState, useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';
import {Header} from '@/widgets/header';

export const AchievementsPage: React.FC<PageProps> = ({breadcrumbs}) => {
    const modalState = useAppSelector(useModalStateSelector)
    const [fetchTrainings ,{isFetching, data: trainings, isError}] = useLazyGetTrainingsQuery()
    const [fetchTrainingsList ,{isFetching: isTrainingsListFetching, data: trainingsList, isError: trainingsListError}] = useLazyGetTrainingListQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchTrainings(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if(trainings && !trainingsList){
            fetchTrainingsList(false)
        }
        if(trainingsList){
            dispatch(setTrainingsState({trainingsListState: trainingsList}))
        }
    }, [trainings, trainingsList, dispatch, fetchTrainingsList]);

    useEffect(() => {
        dispatch(setLoading(isFetching || isTrainingsListFetching))
        if(isError){
            dispatch(setModalState({openServerErrorModal: true}))
            history.push('/main')
        }
        if(trainings){
            dispatch(setTrainingsState({trainings}))
        }
        if(trainingsListError){
            dispatch(setModalState({openCatalogModal: true}))
        }
    }, [dispatch, isFetching, trainings, isError, trainingsListError, isTrainingsListFetching]);

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
                modalState.openCatalogModal &&
                <CustomModal
                    open={true}
                    closable={true}
                    data-test-id='modal-no-review'
                    closeIcon={<CloseOutlined
                        data-test-id='modal-error-user-training-button-close'/>}
                    maskStyle={{
                        backgroundColor: 'rgba(121, 156, 212, 0.1)',
                        backdropFilter: 'blur(4px)'
                    }}
                    style={{maxWidth: 416}}
                    centered={true}
                >
                    <ModalTrainingsListError clickRepeat={() => fetchTrainingsList(false)} />
                </CustomModal>
            }
            {
                trainings && (
                    <React.Fragment>
                        <Header breadcrumbs={breadcrumbs} withSettings={true}/>
                        <Content className={styles.trainingContent}>
                            <Achievements />
                        </Content>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}
