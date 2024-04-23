import React, {useEffect, useState} from 'react';
import {CloseOutlined, DownOutlined, UpOutlined} from '@ant-design/icons';
import {Button} from 'antd';

import styles from '../../workouts-joint.module.scss'

import {useTrainingsSelector} from '@/features/calendar/model/slices/trainings-slice.ts';
import {
    useGetTrainingPalsQuery,
    useLazyGetUserJointTrainingListQuery
} from '@/features/catalogs/model/catalogs-service.ts';
import {useGetInvitesQuery} from '@/features/invite/model/invite-service.ts';
import { WorkoutsJointTypes } from '@/features/workout/constants/constants';
import {getFavouriteTrainingType} from '@/features/workout/helpers/helpers.ts';
import {
    setPalsState,
    setPartnerState,
    useWorkoutSelector
} from '@/features/workout/model/slices/workout-slice.ts';
import {
    WorkoutsJointMessages
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-basic/ui/workouts-joint-messages/ui/workouts-joint-messages.tsx';
import {
    WorkoutsJointPalsList
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-basic/ui/workouts-joint-pals-list/ui/workouts-joint-pals-list.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {CustomModal} from '@/widgets/custom-modal';
import {
    ModalJointTrainingsListError
} from '@/widgets/custom-modal/const/modals.tsx';
import {setModalState, useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';


const showAllDesc = 'Показать все сообщения'
const hideAllDesc = 'Скрыть все сообщения'

export type WorkoutsJointBasicProps = {
    changeLayout: (arg: WorkoutsJointTypes) => void,
    clear: boolean
}
export const WorkoutsJointBasic: React.FC<WorkoutsJointBasicProps> = ({changeLayout, clear}) => {
    const [getJointTrainingList, {
        data,
        isLoading,
        isError,
        isSuccess
    }] = useLazyGetUserJointTrainingListQuery()

    const {
        data: trainingPalsData,
        isError: trainingPalsError
    } = useGetTrainingPalsQuery(false)

    const {data: invitesData} = useGetInvitesQuery(false)
    const modalState = useAppSelector(useModalStateSelector)
    const {pals} = useAppSelector(useWorkoutSelector)
    const {trainings, trainingsListState} = useAppSelector(useTrainingsSelector)
    const [messagesShowAll, setMessagesShowAll] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(trainingPalsData){
            dispatch(setPalsState(trainingPalsData))
        }
    }, [trainingPalsData]);

    useEffect(() => {
        dispatch(setLoading(isLoading))
        if (isError || trainingPalsError) {
            dispatch(setModalState({openJointTrainingModal: true}))
        }
        if (isSuccess) {
            changeLayout(WorkoutsJointTypes.PARTNERS)
            dispatch(setPartnerState(data))
        }
    }, [data, isLoading, isError, trainingPalsError, isSuccess]);
    const handleClickRandom = () => {
        getJointTrainingList(false)
    }
    const handleClickJointTrainingByType = () => {
        const favouriteTraining = getFavouriteTrainingType(trainings, trainingsListState)

        getJointTrainingList({trainingType: favouriteTraining.key})
    }

    const showAllMessages = () => {
        setMessagesShowAll(prevState => !prevState)
    }

    return (
        <React.Fragment>
            {
                modalState.openJointTrainingModal &&
                <CustomModal
                    open={true}
                    closable={true}
                    closeIcon={<CloseOutlined
                        data-test-id='modal-error-user-training-button-close'/>}
                    data-test-id='modal-no-review'
                    style={{maxWidth: 416}}
                    centered={true}
                    maskStyle={{
                        backgroundColor: 'rgba(121, 156, 212, 0.1)',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <ModalJointTrainingsListError clickRepeat={() => handleClickRandom()}/>
                </CustomModal>
            }

            <div className={styles.workoutsJointWrapper}>
                {
                    (invitesData?.length > 0 && !clear) &&
                    <div className={styles.workoutsJointBlock}>
                        <div className={styles.workoutsMessages}>
                            <div><p>Новое сообщение
                                ({invitesData.length})</p></div>
                            <div className={styles.messagesBody}>
                                <WorkoutsJointMessages
                                    messagesShowAll={messagesShowAll}
                                    messages={invitesData}
                                    changeLayout={changeLayout}
                                />
                            </div>
                            <div>
                                <Button type="link" onClick={showAllMessages}>
                                    {messagesShowAll
                                        ? <React.Fragment><UpOutlined/>{hideAllDesc}</React.Fragment>
                                        : <React.Fragment><DownOutlined/>{showAllDesc}</React.Fragment>}
                                </Button>
                            </div>
                        </div>
                    </div>
                }

                {
                    !clear &&
                    <div className={styles.workoutsJointBlock}>
                        <div className={styles.workoutsHead}>
                            <div className={styles.workoutsTitle}>
                                <h2>Хочешь тренироваться с тем, кто разделяет твои цели и
                                    темп? <br/> Можешь найти друга для совместных тренировок среди
                                    других пользователей.
                                </h2>
                                <p>Можешь воспользоваться случайным выбором или выбрать друга с
                                    похожим на твой уровень и вид тренировки, и мы найдем тебе
                                    идеального спортивного друга.
                                </p>
                            </div>

                            <div className={styles.workoutsJointButtons}>
                                <Button type="link" block={true} onClick={handleClickRandom}>
                                    Случайный выбор
                                </Button>
                                <Button type="text" block={true}
                                        onClick={handleClickJointTrainingByType}>
                                    Выбор друга по моим тренировкам
                                </Button>
                            </div>
                        </div>
                    </div>
                }

                <div className={styles.myParthners}>
                    {
                        pals && <WorkoutsJointPalsList changeLayout={changeLayout} pals={pals} />
                    }

                </div>
            </div>
        </React.Fragment>

    )
}
