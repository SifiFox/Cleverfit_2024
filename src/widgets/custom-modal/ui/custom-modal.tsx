import React, {CSSProperties, ReactNode} from 'react';
import {Modal} from 'antd';

import {useAppDispatch} from '@/hooks';
import {clearModalState} from '@/widgets/custom-modal/model/modal-slice.ts';

type CustomModalProps = {
    children: ReactNode,
    open: boolean,
    closeIcon?: ReactNode,
    footer?: boolean | null,
    closable?: boolean,
    title?: string,
    other?: unknown,
    centered?: boolean,
    className?: string,
    maskStyle?: CSSProperties,
    style?: CSSProperties

}

export const CustomModal: React.FC<CustomModalProps> = (props: CustomModalProps) => {
    const dispatch = useAppDispatch()
    const {
        children,
        open,
        title,
        closable = false,
        footer = null,
        closeIcon,
        ...other

    } = props
    const closeModal = () => {
        dispatch(clearModalState())
    }

    return (
        <Modal
            open={open}
            footer={footer}
            closable={closable}
            onCancel={closeModal}
            title={title}
            closeIcon={closeIcon}
            {...other}
        >
            {children}
        </Modal>
    )
}
