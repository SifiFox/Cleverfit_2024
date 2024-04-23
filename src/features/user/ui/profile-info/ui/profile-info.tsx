import React, {useEffect, useState} from 'react';
import {CalendarTwoTone, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {Button, DatePicker, Form, Input, Upload, UploadFile,UploadProps} from 'antd';

import styles from './profile-info.module.scss'

import {useAuthSelector} from '@/features/auth/model/slices/auth-slice.ts';
import {ProfileInfoProps} from '@/features/user/ui/profile-info/model/types.ts';
import {useAppSelector, useWindowWidth} from '@/hooks';
import {isDesktopWidth} from '@/shared/const/constants.tsx';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalLoadFileError} from '@/widgets/custom-modal/const/modals.tsx';


const UploadButton: React.FC<{ isDesktop: boolean }> = ({isDesktop} ) => (
        isDesktop
            ? <div>
                <PlusOutlined/>
                <div style={{marginTop: 'var(--xxs)'}}>Загрузить фото профиля</div>
            </div>
            : <div style={{display: 'flex', gap: 'var(--m)', alignItems: 'center'}}>
                <p>Загрузить фото профиля:</p>
                <Button type="default" style={{width: 147}} ><UploadOutlined /> Загрузить</Button>
            </div>
    )

export const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
    const {img, disableSave, enableSave} = props;
    const [previewImage, setPreviewImage] = useState(false);
    const [hasError, setHasError] = useState(false)
    const {auth} = useAppSelector(useAuthSelector)
    const windowWidth = useWindowWidth()
    const isDesktop = isDesktopWidth(windowWidth)
    const defaultImage = img
    const initialFile = {
        uid: '1',
        name: 'image.png',
        url: defaultImage,
    };
    const [fileList, setFileList] = useState<UploadFile[]>(defaultImage ? [initialFile] : []);

    useEffect(() => {
        if (img) {
            setFileList([initialFile])
            setPreviewImage(true)
        }
    }, [img]);

    const handleOnChange = (props: { file: UploadFile<any>; fileList: Array<UploadFile<any>> }) => {
        const {file, fileList: changedFileList} = props

        setFileList(changedFileList)
        const newFile = changedFileList[0];

        if (newFile?.response) {
            setFileList([{
                ...initialFile,
                name: newFile.response.name,
                url: `https://training-api.clevertec.ru${newFile.response.url}`
            }])
        }
        if (file.status === 'removed' || file.status === 'uploading') {
            setPreviewImage(false)
            disableSave()
        }
        if (newFile) {
            setPreviewImage(true)
            if (newFile.status === 'error') {
                setHasError(true)
                disableSave()
                setFileList([{...initialFile, url: '', name: newFile.name, status: 'error'}])
            } else {
                enableSave()
            }
        }
    }


    const uploadProps: UploadProps = {
        action: 'https://marathon-api.clevertec.ru/upload-image',
        headers: {authorization: `Bearer ${auth}`},
        multiple: true,
        maxCount: 1,
        fileList,
        accept: 'image/*',
        listType: isDesktop ? 'picture-card' : 'picture',
        showUploadList: fileList && true,
        progress: {strokeWidth: 4, showInfo: false, size: 'default'},
        onChange: ({file, fileList}) => handleOnChange({file, fileList}),
        onRemove() {
            setPreviewImage(false)
            setFileList([])
            disableSave()
        }
    };

    return (
        <React.Fragment>
            {
                hasError &&
                <CustomModal
                    open={true}
                    closable={false}
                    data-test-id='modal-no-review'
                >
                    <ModalLoadFileError handleClose={() => setHasError(false)}/>
                </CustomModal>
            }
            <div className={styles.profileInfoWrapper}>
                <Form.Item name='imgSrc' data-test-id='profile-avatar'>
                    <Upload
                        {...uploadProps}
                    >
                        {!previewImage && <UploadButton isDesktop={isDesktop}/>}
                    </Upload>
                </Form.Item>
                <div className={styles.profileInfoInputs}>
                    <Form.Item name="firstName">
                        <Input placeholder='Имя' data-test-id='profile-name'/>
                    </Form.Item>
                    <Form.Item name="lastName">
                        <Input placeholder='Фамилия' data-test-id='profile-surname'/>
                    </Form.Item>
                    <Form.Item name="birthday">
                        <DatePicker
                            format='DD.MM.YYYY'
                            placeholder='Дата рождения'
                            suffixIcon={<CalendarTwoTone
                                twoToneColor={['var(--disabled-25)', 'var(--disabled-25)']}/>}
                            data-test-id='profile-birthday'
                            style={{width: '100%'}}
                        />
                    </Form.Item>
                </div>
            </div>
        </React.Fragment>
    )
}
