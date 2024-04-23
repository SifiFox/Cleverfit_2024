import React, {useEffect, useState} from 'react';
import {CheckCircleOutlined, CloseOutlined} from '@ant-design/icons';
import {Periods} from '@pages/settings-page/ui/tarif-drawer/ui/periods/ui/periods.tsx';
import {
    TariffsInfoBlock
} from '@pages/settings-page/ui/tarif-drawer/ui/tariffs-info-block/ui/tariffs-info-block.tsx';
import {dateMonthDay} from '@pages/settings-page/ui/tarif-drawer/utils/utils.ts';
import {Button, Drawer, Form} from 'antd';
import {useForm} from 'antd/es/form/Form';

import {tariffsInfo} from '../constants/constants.ts'

import styles from './tarif-drawer.module.scss'

import {logout} from '@/features/auth/model/slices/auth-slice.ts';
import {useGetTariffListQuery} from '@/features/catalogs/model/catalogs-service.ts';
import {clearUserState, useUserSelector} from '@/features/user/model/slices/user-slice.ts';
import {
    useUpdateUserTariffMutation
} from '@/features/user/model/user-service.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalSuccessTariff} from '@/widgets/custom-modal/const/modals.tsx';
import {clearModalState} from '@/widgets/custom-modal/model/modal-slice.ts';


type TariffDrawerProps = {
    open: boolean,
    onClose: () => void
}
export const TariffDrawer: React.FC<TariffDrawerProps> = (props: TariffDrawerProps) => {
    const [updateTariff, {
        isLoading: updateTariffLoading,
        isError: updateTariffError,
        isSuccess: updateTariffSuccess
    }] = useUpdateUserTariffMutation()
    const {open, onClose} = props
    const {userData} = useAppSelector(useUserSelector)

    const {data: tariffs} = useGetTariffListQuery(null)
    const [isPayDisabled, setIsPayDisabled] = useState(true)
    const [tariffPro, setTariffPro] = useState(undefined)
    const [form] = useForm()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (tariffs) {
            setTariffPro(tariffs[0])
        }
    }, [tariffs]);

    const onFieldsChange = () => {
        setIsPayDisabled(false)
    }

    const handleClickPayment = () => {
        const {days} = form.getFieldsValue(['days'])
        const data = {
            tariffId: tariffs[0]._id,
            days: Number(days)
        }

        updateTariff(data)
    }
    const handleCloseModal = () => {
        dispatch(clearModalState())
        dispatch(logout())
        dispatch(clearUserState())
    }

    useEffect(() => {
        dispatch(setLoading(updateTariffLoading))
        if (updateTariffSuccess) {
            onClose()
        }
    }, [updateTariffSuccess, updateTariffLoading, updateTariffError]);

    return (
        <React.Fragment>
            {
                updateTariffSuccess &&
                <CustomModal
                    open={true}
                    closable={true}
                    closeIcon={<CloseOutlined
                        data-test-id='modal-error-user-training-button-close'
                        onClick={handleCloseModal}/>}
                    data-test-id='tariff-modal-success'
                    centered={true}
                    className={styles.tariffSuccessModal}
                    maskStyle={{
                        backgroundColor: 'rgba(121, 156, 212, 0.1)',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <ModalSuccessTariff/>
                </CustomModal>
            }
            <Drawer destroyOnClose={true} open={open} title="Сравнить тарифы" onClose={onClose}
                    className={styles.tarifDrawer} data-test-id='tariff-sider'>
                <div className={styles.tarifDrawerBlocks}>
                    {
                        userData?.tariff &&
                        <div className={styles.tarifExplain}>
                            Ваш PRO tarif активен
                            до {dateMonthDay(userData.tariff.expired)}
                        </div>
                    }

                    <div className={styles.tarifBlock}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 'var(--sm)',
                            fontSize: 'var(--sm)'
                        }}>
                            <span
                            style={{
                                width: 56,
                                textAlign: 'center',
                                padding: 'var(--es) var(--xxs)',
                                background: 'var(--gray-5)',
                                color: 'var(--title-85)'
                            }}>
                                FREE
                            </span>
                            <span
                                style={{
                                    width: 56,
                                    textAlign: 'center',
                                    padding: 'var(--es) var(--xxs)',
                                    background: 'var(--primary-light-1)',
                                    color: 'var(--primary-light-7)',
                                    gap: 'var(--es)',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    PRO
                                {
                                    userData?.tariff &&
                                    <CheckCircleOutlined style={{fontSize: 'var(--sm)', color: '#52C41A'}}/>
                                }
                            </span>
                        </div>
                        <div>
                            <TariffsInfoBlock tariffsInfo={tariffsInfo}/>
                        </div>
                    </div>
                    {
                        !userData?.tariff &&
                        <div className={styles.tarifBlock} data-test-id='tariff-cost'>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                fontWeight: 600
                            }}>
                                <p>Стоимость тарифа</p>
                            </div>
                            <Form form={form} onFieldsChange={onFieldsChange}>
                                <Form.Item name="days">
                                    <div >
                                        {
                                            tariffPro &&
                                            <Periods tariff={tariffPro}/>
                                        }
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    }
                </div>
                {
                    !userData?.tariff &&
                    <div className={styles.tariffDrawerFooter}>
                        <Button type="primary" data-test-id='tariff-submit'
                                disabled={isPayDisabled} onClick={handleClickPayment} block={true}>Выбрать
                            и оплатить</Button>
                    </div>
                }
            </Drawer>
        </React.Fragment>
    )
}
