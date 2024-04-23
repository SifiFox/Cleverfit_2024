import React, {useEffect, useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {Button, Checkbox, Col, DatePicker, Form, FormInstance, Row, Select} from 'antd';
import moment, {Moment} from 'moment';

import styles from '@/features/calendar/ui/training-drawer-form/ui/training-drawer.module.scss';

import {reversedFormatDashed} from '@/features/calendar/const/constants.tsx';
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
    useSendInviteMutation
} from '@/features/invite/model/invite-service.ts';
import {periods} from '@/features/workout/constants/constants.tsx';
import {
    getTrainingsListNameByValue, getTrainingsListValueByName,
    removeFalsyValues
} from '@/features/workout/helpers/helpers.ts';
import {
    setAddedTrainingState,
    updatePartnersState,
    useWorkoutSelector
} from '@/features/workout/model/slices/workout-slice.ts';
import {showMessage} from '@/features/workout/ui/workouts-drawer/helpers/helpers.tsx';
import {
    WorkoutsFieldsList
} from '@/features/workout/ui/workouts-drawer/workouts-drawer-form/workouts-fields-list.tsx';
import {disabledDate} from '@/features/workout/ui/workouts-my/helpers/helpers.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalSaveTrainingError} from '@/widgets/custom-modal/const/modals.tsx';
import {setModalState, useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';


enum SubmitTitles {
    SAVE = 'Сохранить',
    SENT_INVITE = 'Отправить приглашение'
}

type WorkoutsTrainingFormProps = {
    form: FormInstance,
    closeDrawer: () => void
}

export const WorkoutsTrainingForm: React.FC<WorkoutsTrainingFormProps> = ({form, closeDrawer}) => {
    const modalState = useAppSelector(useModalStateSelector)
    const [addTraining, {
        data: addTrainingData,
        isLoading: addTrainingLoading,
        isSuccess: addTrainingSuccess,
        isError: addTrainingError,
    }] = useAddTrainingMutation()
    const [sendInvite, {
        data: sendInviteData,
        isLoading: sendInviteLoading,
        isSuccess: sendInviteSuccess,
        isError: sendInviteError
    }] = useSendInviteMutation()
    const [editTraining, {
        isLoading: editTrainingLoading,
        isSuccess: editTrainingSuccess,
        isError: editTrainingError
    }] = useEditTrainingMutation()
    const {
        drawerType,
        trainings,
        trainingsListState,
        selectedTraining
    } = useAppSelector(useTrainingsSelector)

    const {selectedPartner} = useAppSelector(useWorkoutSelector)

    const [submitTitle] = useState(drawerType === DrawerTypes.JOINT ? SubmitTitles.SENT_INVITE : SubmitTitles.SAVE)
    const [saveDisabled, setSaveDisabled] = useState(drawerType !== DrawerTypes.TRAINING_EDIT)
    const [removeAvailable, setRemoveAvailable] = useState(false)
    const initListValues = selectedTraining?.exercises ?? [{
        name: '',
        approaches: 1,
        weight: 0,
        replays: 3
    }]
    const dispatch = useAppDispatch()
    const [isPeriodic, setIsPeriodic] = useState(drawerType === DrawerTypes.TRAINING_EDIT)
    const selectOptions = trainingsListState?.map(item => ({label: item.name, value: item.key}))
    const trainingsDates = trainings?.map(training => moment(training.date).format(reversedFormatDashed))

    useEffect(() => {
        form.resetFields()
    }, [form, selectedTraining]);


    useEffect(() => {
        if (sendInviteData) {
            dispatch(updatePartnersState(sendInviteData))
        }
    }, [sendInviteData, sendInviteLoading, sendInviteSuccess, sendInviteError]);

    useEffect(() => {
        dispatch(setLoading(addTrainingLoading || editTrainingLoading))
        if (addTrainingError || editTrainingError) {
            dispatch(setModalState({openSaveTrainingErrorModal: true}))
        }
        if (addTrainingSuccess && drawerType === DrawerTypes.JOINT) {
            dispatch(setAddedTrainingState(addTrainingData))
            sendInvite({
                to: selectedPartner?.id,
                trainingId: addTrainingData._id
            })
        }
        if (addTrainingSuccess || editTrainingSuccess) {
            closeDrawer()
            showMessage(addTrainingSuccess ? 'Новая тренировка успешно добавлена' : 'Тренировка успешно обновлена')
        }
    }, [addTrainingLoading, addTrainingSuccess, addTrainingError, editTrainingLoading, editTrainingSuccess, editTrainingError]);

    const handleClickSave = () => {
        const name = drawerType === DrawerTypes.TRAINING_EDIT ? form.getFieldValue('select') : getTrainingsListNameByValue(trainingsListState, form.getFieldValue('select'))
        const toSaveData = {
            date: form.getFieldValue('date')?.toISOString(),
            name,
            exercises: form.getFieldValue('exercises'),
        }

        if (drawerType === DrawerTypes.TRAINING_NEW || drawerType === DrawerTypes.JOINT) {
            addTraining(removeFalsyValues({
                ...toSaveData,
                parameters: {
                    period: form.getFieldValue('period')
                }
            }))
        }
        if (drawerType === DrawerTypes.TRAINING_EDIT) {
            editTraining(removeFalsyValues({
                id: selectedTraining?._id,
                body: toSaveData
            }))
        }
    }

    const initialFormValues = drawerType === DrawerTypes.TRAINING_EDIT
        ? {
            select: selectedTraining?.name,
            date: moment(selectedTraining?.date) ?? undefined,
            period: selectedTraining?.parameters?.period,
            periodic: !!selectedTraining?.parameters?.period
        }
        : drawerType === DrawerTypes.JOINT ? {select: getTrainingsListValueByName(trainingsListState, selectedPartner?.trainingType)} : {}

    const dateCellRender = (date: Moment) => {
        if (date) {
            if (trainingsDates?.includes(date.format(reversedFormatDashed))) {
                return <div style={{backgroundColor: '#F0F5FF'}}>{date.date()}</div>;
            }

            return date.date();
        }

            return 'Select date';

    };
    const fieldsChange = () => {
        dispatch(setTrainingsState({
            drawerState: {
                open: true,
                exercises: form.getFieldsValue().exercises
            }
        }))
        setIsPeriodic(form.getFieldValue('periodic'))
        setSaveDisabled(false)

        const isHasItemsToRemove = form.getFieldsValue().exercises.find((item: {
            remove: boolean;
        }) => item?.remove)

        if (isHasItemsToRemove) {
            setRemoveAvailable(true)
        }
    }

    return (
        <div className={styles.formBody}>
            {
                modalState.openSaveTrainingErrorModal &&
                <CustomModal
                    open={true}
                    closable={false}
                    closeIcon={<CloseOutlined
                        data-test-id='modal-error-user-training-button-close'/>}
                    data-test-id='modal-no-review'
                    centered={true}
                    maskStyle={{
                        backgroundColor: 'rgba(121, 156, 212, 0.1)',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <ModalSaveTrainingError buttonAction={closeDrawer}/>
                </CustomModal>
            }
            <Form form={form}
                  className={styles.trainingDrawerForm}
                  name="dynamic_workout_form"
                  onFieldsChange={fieldsChange}
                  initialValues={initialFormValues}
            >
                <Form.Item name="select" data-test-id='modal-create-exercise-select'>
                    <Select
                        placeholder="Выбор типа тренировки"
                        options={selectOptions}
                    />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="date" data-test-id='modal-drawer-right-date-picker'>
                            <DatePicker
                                dateRender={dateCellRender}
                                disabledDate={disabledDate}
                            />
                        </Form.Item>
                        {
                            isPeriodic &&
                            <Form.Item name="period"
                                       data-test-id='modal-drawer-right-select-period'>
                                <Select
                                    placeholder="Периодичность"
                                    options={periods}
                                />
                            </Form.Item>
                        }
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            key="periodic" name="periodic"
                            valuePropName="checked"
                            wrapperCol={{span: 16}}
                            className={styles.drawerFormCheckbox}
                        >
                            <Checkbox
                                style={{whiteSpace: 'nowrap'}}
                                data-test-id='modal-drawer-right-checkbox-period'>
                                С периодичностью
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.List
                    name="exercises"
                    initialValue={initListValues}
                >
                    {(fields, {add}) => (
                        <WorkoutsFieldsList
                            fields={fields}
                            add={add}
                            removeAvailable={removeAvailable}
                            selectedTraining={selectedTraining}
                            form={form}
                        />
                    )}
                </Form.List>

                <div className={styles.submitBtnWrapper}>
                    <Button
                        onClick={handleClickSave}
                        disabled={saveDisabled}
                        type="primary"
                        block={true}
                    >
                        {submitTitle}
                    </Button>
                </div>
            </Form>
        </div>
    )
}
