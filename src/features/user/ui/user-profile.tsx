import React, {useEffect, useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {Button, Form, message,UploadFile} from 'antd';
import moment, {Moment} from 'moment';

import styles from './user-profile.module.scss'

import {useUserSelector} from '@/features/user/model/slices/user-slice.ts';
import {
    useUpdateUserDataMutation
} from '@/features/user/model/user-service.ts';
import {ProfileBlock} from '@/features/user/ui/profile-block/ui/profile-block.tsx';
import {ProfileInfo} from '@/features/user/ui/profile-info/ui/profile-info.tsx';
import {ProfilePrivacy} from '@/features/user/ui/profile-privacy/ui/profile-privacy.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalSaveUserDataError} from '@/widgets/custom-modal/const/modals.tsx';
import {setModalState, useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';

type ImgSrcType = {
    file: UploadFile,
    fileList: Array<UploadFile<any>>
}
type FormValuesType = {
    email: string,
    firstName?: string,
    lastName?: string,
    birthday?: Moment | string | null,
    imgSrc?: ImgSrcType,
    password?: string,
    passwordConfirm?: string
}

const removeFalsyValues = <T extends FormValuesType>(obj: T): Partial<T>  =>Object.fromEntries(
        Object.entries(obj)
            .filter(([_, v]) => Boolean(v))
    ) as { [K in keyof T]?: NonNullable<T[K]> }

export const UserProfile: React.FC = () => {
    const [form] = Form.useForm();
    const [initValues, setInitValues] = useState<any>({
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        readyForJointTraining: false,
        sendNotification: false,
        imgSrc: '',
        password: ''
    })
    const {userData} = useAppSelector(useUserSelector)
    const {openModalSaveUserDataError} = useAppSelector(useModalStateSelector)
    const [saveDisable, setSaveDisable] = useState(true)
    const [initFormState, setInitFormState] = useState(null)
    const [updateUserData, {
        data: updatedUserData,
        isLoading: updateUserLoading,
        isError,
        isSuccess
    }] = useUpdateUserDataMutation()

    const dispatch = useAppDispatch()

    useEffect(() => {
        form.resetFields()
        if (initValues) {
            setInitFormState(initValues)
        }
    }, [initValues]);

    useEffect(() => {
        if (userData) {
            setInitValues({
                firstName: userData?.firstName,
                lastName: userData.lastName,
                birthday: userData?.birthday ? moment(userData?.birthday) : '',
                email: userData.email,
                imgSrc: undefined,
                password: undefined,
                readyForJointTraining: false,
                sendNotification: false
            })
        }
    }, [userData]);

    const handleValuesChange = (_values: any, allValues: FormValuesType) => {
        if (JSON.stringify(allValues) !== JSON.stringify(initFormState)) {
            setSaveDisable(false)
        } else {
            setSaveDisable(true)
        }
    }

    const onFinish = (values: FormValuesType) => {
        const filteredValues = removeFalsyValues(values)

        if (filteredValues.imgSrc) {
            filteredValues.imgSrc = filteredValues.imgSrc.fileList[0].response?.url;
        }
        if (filteredValues.birthday && moment.isMoment(filteredValues.birthday)) {
            filteredValues.birthday = filteredValues.birthday.toISOString()
        }
        updateUserData(filteredValues)
    }

    useEffect(() => {
        dispatch(setLoading(updateUserLoading))
        if (isSuccess) {
            message.success(
                {
                    content:
                        <span
                            data-test-id='alert'
                            style={{display: 'flex', justifyContent: 'space-between', width: 395}}>
                            Данные профиля успешно обновлены
                            <Button type="link">
                                <CloseOutlined onClick={() => message.destroy()}
                                                   style={{color: '#262626', marginRight: 0}}/>
                            </Button>
                        </span>,
                    style: {
                        bottom: 72
                    },
                    duration: 0
                })
            setSaveDisable(true)
        }
        if(isError){
            dispatch(setModalState({openModalSaveUserDataError: true}))
        }
    }, [updatedUserData, isError, isSuccess, updateUserLoading]);

    return (
        <div className={styles.userProfileWrapper}>
            <CustomModal open={!!openModalSaveUserDataError} closable={false} footer={null}>
                    <ModalSaveUserDataError />
                </CustomModal>
            <Form form={form} initialValues={initValues} onFinish={onFinish}
                  onValuesChange={handleValuesChange}>
                <ProfileBlock title="Личная информация">
                    <ProfileInfo img={userData.imgSrc} form={form}
                                 disableSave={() => setSaveDisable(true)}
                                 enableSave={() => setSaveDisable(false)}/>
                </ProfileBlock>
                <ProfileBlock title="Приватность и авторизация">
                    <ProfilePrivacy/>
                </ProfileBlock>
                <Button
                    htmlType="submit"
                    data-test-id='profile-submit'
                    disabled={saveDisable}
                    type="primary"
                    className={styles.saveUserDataButton}

                >
                    Сохранить изменения
                </Button>
            </Form>
        </div>
    )
}
