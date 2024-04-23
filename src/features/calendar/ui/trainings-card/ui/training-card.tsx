import React, {useEffect, useState} from 'react';
import {Button, Card} from 'antd';

import styles from '@/features/calendar/ui/custom-popover/ui/custom-popover.module.scss';

import {getUnusedTrainings, isDateBefore, isToday} from '@/features/calendar/helpers/helpers.tsx';
import {
    useAddTrainingMutation,
    useEditTrainingMutation
} from '@/features/calendar/model/services/trainings-service.ts';
import {
    DrawerTypes,
    setTrainingsState,
    useTrainingsSelector
} from '@/features/calendar/model/slices/trainings-slice.ts';
import {
    CardTypes,
    TrainingCardProps
} from '@/features/calendar/model/types/training.ts';
import {Badges} from '@/features/calendar/ui/badges/ui/badges.tsx';
import {CardAddBody} from '@/features/calendar/ui/trainings-card/card-add/ui/card-add-body.tsx';
import {CardAddTitle} from '@/features/calendar/ui/trainings-card/card-add/ui/card-add-title.tsx';
import {
    CardBasicTitle
} from '@/features/calendar/ui/trainings-card/card-basic/ui/card-basic-title.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import ImgEmpty from '@/shared/assets/images/empty-image.png';
import {setModalState} from '@/widgets/custom-modal/model/modal-slice.ts';

export const TrainingCard: React.FC<TrainingCardProps> = (props: TrainingCardProps) => {
    const {date, onClose, trainings, trainingsList, showDrawer} = props
    const [cardType, setCardType] = useState('basic')
    const dispatch = useAppDispatch()
    const {
        selectedTraining,
        selectedDate,
        toSaveState,
        drawerType
    } = useAppSelector(useTrainingsSelector)
    const unusedTrainings = getUnusedTrainings(trainingsList, trainings)
    const [addTraining, {
        isLoading: addTrainingLoading,
        isSuccess: addTrainingSuccess,
        isError: addTrainingError
    }] = useAddTrainingMutation()
    const [editTraining, {
        isLoading: editTrainingLoading,
        isSuccess: editTrainingSuccess,
        isError: editTrainingError
    }] = useEditTrainingMutation()

    useEffect(() => {
        if (addTrainingSuccess || editTrainingSuccess) {
            setCardType('basic')
        }
        if (addTrainingError || editTrainingError) {
            dispatch(setModalState({openSaveTrainingErrorModal: true}))
        }
    }, [dispatch, addTrainingSuccess, editTrainingSuccess, addTrainingError, editTrainingError]);

    const handleChangeCardType = (type: CardTypes) => {
        setCardType(type)
    }
    const handleClickBack = () => {
        setCardType('basic')
        dispatch(setTrainingsState({selectedTraining: null}))
    }
    const handleClickAdd = () => {
        setCardType('add')
        dispatch(setTrainingsState({
            drawerType: DrawerTypes.ADD
        }))
    }
    const handleClickAddExercise = () => {
        showDrawer()
        dispatch(setTrainingsState({
            drawerType: DrawerTypes.ADD
        }))
    }
    const handleClickSave = () => {
        if (drawerType === DrawerTypes.ADD) {
            if(selectedTraining?._id){
                const editObjData = {
                    id: selectedTraining?._id,
                    body: toSaveState?.saveData
                }

                editTraining(editObjData)
            }else{
                addTraining(toSaveState?.saveData)
            }
        }
        if (drawerType === DrawerTypes.EDIT) {
            editTraining(toSaveState?.saveData)
        }
    }
    const handleSelect = (value: string) => {
        const selectedTrainingType = trainingsList.find((item) => item.key === value)
        const checkSelectedTraining =
            trainings?.find((item) => item.name === selectedTrainingType?.name)
            ?? trainingsList.find((item) => item.key === value)

        dispatch(setTrainingsState({selectedTraining: checkSelectedTraining}))
    }

    if (cardType === CardTypes.BASIC) {
        return (
            <Card
                data-test-id='modal-create-training'
                title={
                    <CardBasicTitle
                        date={date}
                        onClose={() => onClose()}
                        trainings={!trainings}/>}
            >
                <div className={styles.cardBody}>
                    {
                        trainings
                            ? <Badges
                                cellItems={trainings}
                                editable={true}
                                handleChangeCardType={handleChangeCardType}
                                onSelect={handleSelect}
                            />
                            : <div className={styles.emptyImage}>
                                <img src={ImgEmpty} alt=""/>
                            </div>
                    }

                </div>
                <div className={styles.cardFooter}>
                    <Button
                        type="primary"
                        onClick={handleClickAdd}
                        disabled={!unusedTrainings.length || isToday(selectedDate) || isDateBefore(selectedDate)}
                        block={true}
                    >
                        Создать тренировку
                    </Button>
                </div>
            </Card>
        )
    }
    if (cardType === CardTypes.ADD) {
        return (
            <Card
                data-test-id='modal-create-exercise'
                title={
                    <CardAddTitle
                        date={date}
                        handleClickBack={handleClickBack}
                        trainings={!trainings}
                        onSelect={handleSelect}
                        selectOptions={unusedTrainings}
                    />}
            >
                <div className={styles.cardBody}>
                    <CardAddBody/>
                </div>
                <div className={styles.cardFooter}>
                    <Button
                        type="default"
                        onClick={handleClickAddExercise}
                        disabled={!selectedTraining}
                        block={true}
                    >
                        Добавить упражнения
                    </Button>
                    <Button
                        type="link"
                        onClick={handleClickSave}
                        disabled={!toSaveState?.readyToSave}
                        loading={addTrainingLoading || editTrainingLoading}
                        block={true}
                    >
                        {
                            isDateBefore(selectedDate)
                                ? 'Сохранить изменения' : 'Сохранить'
                        }
                    </Button>
                </div>
            </Card>
        )
    }

    return null
}


