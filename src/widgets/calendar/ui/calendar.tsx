import React, {MouseEvent, useEffect, useState} from 'react';
import {push} from 'redux-first-history';
import {CloseOutlined} from '@ant-design/icons';
import {Calendar} from 'antd';
import moment, {Moment} from 'moment'

import styles from './calendar.module.scss'

import {reversedFormatDashed
} from '@/features/calendar/const/constants.tsx';
import {filterTrainingsByDate, formattedDate} from '@/features/calendar/helpers/helpers.tsx';
import {
    setTrainingsState, useTrainingsSelector,
} from '@/features/calendar/model/slices/trainings-slice.ts';
import {CalendarProps} from '@/features/calendar/model/types/training.ts';
import {Badges} from '@/features/calendar/ui/badges/ui/badges.tsx';
import {CustomPopover} from '@/features/calendar/ui/custom-popover/ui/custom-popover.tsx';
import {useLazyGetTrainingListQuery} from '@/features/catalogs/model/catalogs-service.ts';
import {useAppDispatch, useAppSelector, useWindowWidth} from '@/hooks';
import {AppRoutes} from '@/shared/config/route-config/route-config.tsx';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {attachPortal} from '@/shared/ui/portal/attach-portal.tsx';
import {
    Portal,
} from '@/shared/ui/portal/portal.tsx';
import {momentRu} from '@/widgets/calendar/const/moment-config.ts';
import {CustomModal} from '@/widgets/custom-modal';
import {
    ModalSaveTrainingError,
    ModalTrainingsListError
} from '@/widgets/custom-modal/const/modals.tsx';
import {
    clearModalState,
    setModalState,
    useModalStateSelector
} from '@/widgets/custom-modal/model/modal-slice.ts';

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

export const CustomCalendar = (props: CalendarProps) => {
    const {trainings} = props
    const modalState = useAppSelector(useModalStateSelector)
    const {selectedDate} = useAppSelector(useTrainingsSelector)
    const windowWidth = useWindowWidth()

    const isDesktop = windowWidth > 750;
    const [fetchTrainingList, {
        isFetching,
        data: trainingsList,
        isError
    }] = useLazyGetTrainingListQuery()
    const dispatch = useAppDispatch()
    const [parentCell, setParentCell] = useState<undefined | null | HTMLElement>(undefined)

    useEffect(() => {
        fetchTrainingList(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trainings]);

    useEffect(() => {
        dispatch(setLoading(isFetching))
        if (isError) {
            dispatch(setModalState({openCatalogModal: true}))
        }
        if (trainingsList) {
            dispatch(setTrainingsState({trainingsListState: trainingsList}))
        }
    }, [dispatch, isFetching, trainingsList, isError]);

    useEffect(() => {
        dispatch(setTrainingsState({selectedDate: String(moment()), selectedTraining: null}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSelectCell = (date: Moment) => {
        const formatDate = moment(date).format(reversedFormatDashed)

        if (isDesktop || moment(selectedDate)?.month() === date.month()) {
            dispatch(setModalState({openTrainingsBasicModal: true}))
            setParentCell(attachPortal({date: formatDate}));
        }
        dispatch(setTrainingsState({selectedDate: date, selectedTraining: null}))
    };

    const dateCellRender = (date: Moment) => {
        const cellItems = trainings ? filterTrainingsByDate(formattedDate(date), trainings) : null
        const handleClickCell = (e: MouseEvent) => {
            if (isDesktop) {
                e.stopPropagation()
                onSelectCell(date)
            }
            if (!isDesktop) {
                onSelectCell(date)
            }
        }

        if (trainingsList) {
            return <div
                role='presentation'
                onClick={(e: MouseEvent) => handleClickCell(e)}
                className={styles.cellWrapper}
            >
                {isDesktop
                    ? <Badges cellItems={cellItems}/>
                    : cellItems && <div className={styles.mobileCell}/>}
            </div>
        }

        return null
    };

    const handleCloseModal = () => {
        setParentCell(undefined)
    };

    return (
        <React.Fragment>
            {
                trainingsList &&
                parentCell &&
                modalState.openTrainingsBasicModal &&
                <Portal container={parentCell}>
                    <CustomPopover
                        onClose={handleCloseModal}
                        trainings={trainings}
                        trainingsList={trainingsList}
                    />
                </Portal>
            }
            {
                modalState.openCatalogModal &&
                <CustomModal
                    open={true}
                    closable={true}
                    closeIcon={<CloseOutlined
                        data-test-id='modal-error-user-training-button-close'/>}
                    data-test-id='modal-no-review'
                    style={{maxWidth: 416}}
                    centered={true}
                    className={styles.trainingModal}
                    maskStyle={{
                        backgroundColor: 'rgba(121, 156, 212, 0.1)',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <ModalTrainingsListError clickRepeat={() => fetchTrainingList(true)}/>
                </CustomModal>
            }
            {
                modalState.openSaveTrainingErrorModal &&
                <CustomModal
                    open={true}
                    closable={false}
                    closeIcon={<CloseOutlined
                        data-test-id='modal-error-user-training-button-close'/>}
                    data-test-id='modal-no-review'
                    style={{maxWidth: 416}}
                    className={styles.trainingModal}
                    centered={true}
                    maskStyle={{
                        backgroundColor: 'rgba(121, 156, 212, 0.1)',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <ModalSaveTrainingError buttonAction={() => dispatch(push(AppRoutes.CALENDAR))}/>
                </CustomModal>
            }
            <div className={styles.calendarWrapper}>
                <Calendar
                    locale={momentRu}
                    fullscreen={isDesktop}
                    dateCellRender={dateCellRender}
                    onPanelChange={() => dispatch(clearModalState())}
                />
            </div>
        </React.Fragment>
    )
}
