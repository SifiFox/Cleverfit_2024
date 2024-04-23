import React, {useEffect, useState} from 'react';
import {CheckCircleFilled, CloseCircleOutlined, StarFilled, StarOutlined} from '@ant-design/icons';
import {history} from '@redux/configure-store.ts';
import {Avatar, Button, Form, Rate, Result} from 'antd';
import {useForm} from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

import styles from './modals.module.scss'

import {catalogsAPI} from '@/features/catalogs/model/catalogs-service.ts';
import {useSendFeedbackMutation} from '@/features/feedbacks/model/services/feedbacks-service.ts';
import {useDeleteInviteMutation} from '@/features/invite/model/invite-service.ts';
import {useUserSelector} from '@/features/user/model/slices/user-slice.ts';
import { WorkoutsJointTypes } from '@/features/workout/constants/constants';
import {PartnerType, updatePalsState} from '@/features/workout/model/slices/workout-slice.ts';
import {
    ButtonTexts
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-patners/ui/partner-card/partner-card.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import userDefault from '@/shared/assets/images/userDefault.png'
import {AppRoutes} from '@/shared/config/route-config/route-config.tsx';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {
    clearModalState,
    setModalState,
    useModalStateSelector
} from '@/widgets/custom-modal/model/modal-slice.ts';

type TModalValues = {
    rating: number | null,
    message: string | null
}

export const ModalError: React.FC = () => {
    const dispatch = useAppDispatch()
    const handleClickClose = () => {
        dispatch(clearModalState())
    }
    const handleClickWrite = () => {
        dispatch(setModalState({openWriteModal: true, openErrorModal: false}))
    }

    return (
        <Result
            status="error"
            title="Данные не сохранились"
            subTitle="Что-то пошло не так, попробуйте еще раз"
            style={{padding: 'var(--xy-xxxxl-yl)'}}
            extra={[
                <Button
                    key='writeBtn'
                    type="primary"
                    data-test-id='write-review-not-saved-modal'
                    onClick={handleClickWrite}
                >
                    Написать отзыв
                </Button>,
                <Button type="default" key='closeBtn' onClick={handleClickClose}>
                    Закрыть
                </Button>
            ]}
        />
    )
}

export const ModalSuccess: React.FC = () => {
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(clearModalState())
    }

    return (
        <Result
            status="success"
            title="Отзыв успешно опубликован"
            extra={[
                <Button
                    key='successBtn'
                    onClick={handleClick}
                    type="primary"
                >
                    Отлично
                </Button>
            ]}
        />
    )
}


type FormValues = {
    rating: number,
    message: string
}
export const ModalWriteFeedback: React.FC = () => {
    const [ratingValue, setRatingValue] = useState<number | undefined>(undefined)
    const [isFormValid, setIsFormValid] = useState(true)
    const dispatch = useAppDispatch()
    const {writeModalValues} = useAppSelector(useModalStateSelector)
    const [sendFeedback, {isLoading, isError, isSuccess}] = useSendFeedbackMutation()
    const [form] = useForm()

    const onFinish = (values: FormValues) => {
        dispatch(setModalState({writeModalValues: values}))
        sendFeedback(values)
    }
    const handleClickSubmit = async () => {
        const values = form.getFieldsValue()

        await form.validateFields(['rating'])
            .then(() => {
                setIsFormValid(true)
                onFinish(values)
            }).catch(() => {
                setIsFormValid(false)
            })
    }

    const onChange = async () => {
        await form.validateFields(['rating'])
            .then(() => {
                setIsFormValid(true)
            }).catch(() => {
                setIsFormValid(false)
            })
    }

    useEffect(() => {
        dispatch(setLoading(isLoading))
    }, [dispatch, isLoading]);

    useEffect(() => {
        if (isError) {
            dispatch(setModalState({openErrorModal: true, openWriteModal: false}))
        }
        if (isSuccess) {
            dispatch(setModalState({openSuccessModal: true, openWriteModal: false}))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);

    return (
        <Form
            form={form}
            onFinish={onFinish}
            initialValues={writeModalValues as TModalValues}
            onChange={onChange}
        >
            <Form.Item
                name="rating"
                rules={[{required: true, message: 'Выберите свою оценку'}]}
            >
                <Rate
                    value={ratingValue}
                    onChange={(value) => setRatingValue(value)}
                    character={
                        // eslint-disable-next-line react/no-unstable-nested-components
                        ({value, index}) =>
                            Number(index) < Number(value)
                                ? <StarFilled/>
                                : <StarOutlined style={{color: '#fadb14'}}/>}
                />
            </Form.Item>
            <Form.Item
                name="message"
            >
                <TextArea rows={4}/>
            </Form.Item>
            <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                    type="primary"
                    data-test-id='new-review-submit-button'
                    disabled={!isFormValid}
                    onClick={() => handleClickSubmit()}
                >
                    Опубликовать
                </Button>
            </Form.Item>
        </Form>
    )
}

export const ModalServerError: React.FC = () => {
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(clearModalState())
        history.push(AppRoutes.MAIN)
    }

    return (
        <Result
            status="500"
            title="Что-то пошло не так"
            subTitle="Произошла ошибка, попробуйте ещё раз."
            extra={[
                <Button
                    onClick={handleClick}
                    key='errorBackBtn'
                    type="primary"
                >
                    Назад
                </Button>
            ]}
        />
    )
}


type ModalTrainingsListErrorProps = {
    clickRepeat: () => void
}
export const ModalTrainingsListError: React.FC<ModalTrainingsListErrorProps> = (props: ModalTrainingsListErrorProps) => {
    const {clickRepeat} = props
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(clearModalState())
        clickRepeat()
    }

    return (
        <div className={styles.modalTrainingsListError}>
            <CloseCircleOutlined
                style={{
                    transform: 'rotate(90deg)',
                    color: 'var(--primary-light-6)',
                    fontSize: 'var(--xl)'
                }}
            />
            <div className={styles.modalTrainingsListErrorContent}>
                <p
                    data-test-id='modal-error-user-training-title'
                    style={{fontSize: 'var(--m)', color: 'var(--title-85)', fontWeight: 500}}>
                    При открытии данных произошла ошибка
                </p>
                <p
                    data-test-id='modal-error-user-training-subtitle'
                    style={{fontSize: 'var(--sm)', color: 'var(--title-85)', maxWidth: 258}}>
                    Попробовать ещё раз.
                </p>
                <Button
                    data-test-id='modal-error-user-training-button'
                    type='primary'
                    style={{width: 'fit-content', alignSelf: 'flex-end'}}
                    onClick={handleClick}
                >
                    Обновить
                </Button>
            </div>
        </div>
    )
}


type ModalJointTrainingsListErrorProps = {
    clickRepeat: () => void
}
export const ModalJointTrainingsListError: React.FC<ModalJointTrainingsListErrorProps> = (props: ModalJointTrainingsListErrorProps) => {
    const {clickRepeat} = props
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(clearModalState())
        clickRepeat()
    }

    return (
        <div className={styles.modalTrainingsListError}>
            <CloseCircleOutlined
                style={{
                    transform: 'rotate(90deg)',
                    color: 'var(--primary-light-6)',
                    fontSize: 'var(--xl)'
                }}
            />
            <div className={styles.modalTrainingsListErrorContent}>
                <p
                    data-test-id='modal-error-user-training-title'
                    style={{fontSize: 'var(--m)', color: 'var(--title-85)', fontWeight: 500}}>
                    При открытии данных произошла ошибка
                </p>
                <p
                    data-test-id='modal-error-user-training-subtitle'
                    style={{fontSize: 'var(--sm)', color: 'var(--title-85)', maxWidth: 258}}>
                    Попробовать ещё раз.
                </p>
                <Button
                    data-test-id='modal-error-user-training-button'
                    type='primary'
                    style={{width: 'fit-content', alignSelf: 'flex-end'}}
                    onClick={handleClick}
                >
                    Обновить
                </Button>
            </div>
        </div>
    )
}


export const ModalSaveTrainingError: React.FC<any> = ({buttonAction}) => {
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(clearModalState())
        buttonAction()
    }

    return (
        <div className={styles.modalSaveTrainingError}>
            <CloseCircleOutlined
                style={{transform: 'rotate(90deg)', color: 'red', fontSize: 'var(--xl)'}}
            />
            <div className={styles.modalSaveTrainingErrorContent}>
                <p
                    data-test-id='modal-error-user-training-title'
                    style={{fontSize: 'var(--m)', color: 'var(--title-85)', maxWidth: 258}}>
                    При сохранении данных произошла ошибка
                </p>
                <p
                    data-test-id='modal-error-user-training-subtitle'
                    style={{fontSize: 'var(--sm)', color: 'var(--secondary-45)', maxWidth: 258}}>
                    Придётся попробовать ещё раз
                </p>
                <Button
                    data-test-id='modal-error-user-training-button'
                    type='primary'
                    style={{width: 'fit-content', alignSelf: 'flex-end'}}
                    onClick={handleClick}
                >
                    Закрыть
                </Button>
            </div>
        </div>
    )
}


type ModalLoadFileErrorProps = {
    handleClose: () => void
}
export const ModalLoadFileError: React.FC<ModalLoadFileErrorProps> = (props: ModalLoadFileErrorProps) => {
    const {handleClose} = props

    return (
        <div className={styles.modalLoadFileError}>
            <CloseCircleOutlined
                style={{transform: 'rotate(90deg)', color: 'red', fontSize: 'var(--xl)'}}
            />
            <div className={styles.modalLoadFileErrorContent}>
                <p
                    style={{fontSize: 'var(--m)', color: 'var(--title-85)', maxWidth: 258}}>
                    Файл слишком большой
                </p>
                <p
                    style={{fontSize: 'var(--sm)', color: 'var(--secondary-45)', maxWidth: 258}}>
                    Выберите файл размером [......] МБ.
                </p>
                <Button
                    data-test-id='big-file-error-close'
                    type='primary'
                    style={{width: 'fit-content', alignSelf: 'flex-end'}}
                    onClick={handleClose}
                >
                    Закрыть
                </Button>
            </div>
        </div>
    )
}

export const ModalSuccessTariff: React.FC = () => {
    const {userData} = useAppSelector(useUserSelector)

    return (
        <Result
            icon={<CheckCircleFilled style={{color: 'var(--primary-light-6)'}}/>}
            title="Чек для оплаты у вас на почте"
            extra={[
                <React.Fragment>
                    <p style={{marginBottom: 'var(--xl)', color: 'var(--secondary-45)'}}>Мы
                        отправили инструкцию для оплаты вам на e-mail {userData?.email}. После
                        подтверждения оплаты войдите в приложение заново.</p>
                    <p style={{color: 'var(--secondary-45)'}}>Не пришло письмо? Проверьте папку
                        Спам.</p>
                </React.Fragment>
            ]}
        />
    )
}

export const ModalSaveUserDataError: React.FC = () => {
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(clearModalState())
    }

    return (
        <div className={styles.modalSaveUserDataErrorWrapper}>
            <CloseCircleOutlined
                className={styles.close}
            />
            <div className={styles.modalSaveUserDataErrorContent}>
                <p
                    className={styles.title}>
                    При сохранении данных произошла ошибка
                </p>
                <p
                    className={styles.subtitle}>
                    Придётся попробовать ещё раз
                </p>
                <Button
                    data-test-id='big-file-error-close'
                    type='primary'
                    className={styles.modalSaveUserDataErrorButton}
                    onClick={handleClick}
                >
                    Закрыть
                </Button>
            </div>
        </div>
    )
}


type ModalPalInfoProps = {
    data: PartnerType,
    changeLayout: (arg: WorkoutsJointTypes) => void
}

export const ModalPalInfo: React.FC<ModalPalInfoProps> = (props) => {
    const {data, changeLayout} = props
    const [cancelInvite, {isSuccess, isError}] = useDeleteInviteMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearModalState())
            dispatch(catalogsAPI.util?.invalidateTags(['invite']))
            changeLayout(WorkoutsJointTypes.BASIC)
        }
    }, [isSuccess, isError, dispatch, changeLayout]);

    const handleClickCancel = () => {
        dispatch(updatePalsState(data))
        cancelInvite(data.inviteId)
    }

    return (
        <div className={styles.palModalData}>
            <div className={styles.palDataRow}>
                <div className={styles.avatarWrapper}>
                    <Avatar src={data.imageSrc ?? userDefault}/>
                    <p>{data.name}</p>
                </div>
                <div className={styles.trainingsData}>
                    <div className={styles.trainingData}>
                        <span className={styles.trainingDataTitle}>Тип тренировки</span>
                        <span className={styles.trainingDataValue}>{data.trainingType}</span>
                    </div>
                    <div className={styles.trainingData}>
                        <span className={styles.trainingDataTitle}>Средняя нагрузка:</span>
                        <span
                            className={styles.trainingDataValue}>{data.avgWeightInWeek} кг/нед</span>
                    </div>
                </div>
            </div>
            {
                data.status &&
                <div className={styles.palDataRow}>
                    <div className={styles.trainingDataStatus}>
                        <p>
                        <span>
                            {ButtonTexts[data.status].subtitle}
                        </span>
                            {ButtonTexts[data.status].icon ?? null}
                        </p>
                    </div>
                    <div className={styles.trainingDataAction}>
                        <Button type="default" onClick={handleClickCancel}>Отменить
                            тренировку</Button>
                    </div>
                </div>
            }
        </div>
    )
}
