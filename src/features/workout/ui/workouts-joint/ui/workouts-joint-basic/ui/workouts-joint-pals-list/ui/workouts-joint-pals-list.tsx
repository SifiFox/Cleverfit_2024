import React, {useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {List} from 'antd';

import styles from '../../../../workouts-joint.module.scss'

import {Nullable} from '@/features/user/model/slices/user-slice.ts';
import {WorkoutsJointTypes} from '@/features/workout/constants/constants.tsx';
import {PartnerType} from '@/features/workout/model/slices/workout-slice.ts';
import {
    PartnerCard, PartnerCardTypes
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-patners/ui/partner-card/partner-card.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalPalInfo} from '@/widgets/custom-modal/const/modals.tsx';
import {setModalState, useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';


type WorkoutsJointPalsListProps = {
    pals: PartnerType[],
    changeLayout: (arg: WorkoutsJointTypes) => void
}

export const WorkoutsJointPalsList: React.FC<WorkoutsJointPalsListProps> = (props) => {
    const {pals, changeLayout} = props
    const modalState = useAppSelector(useModalStateSelector)
    const [selectedPartner, setSelectedPartner] = useState<Nullable<PartnerType>>(null)
    const dispatch = useAppDispatch()
    const handleClickCard = (data: PartnerType) => {
        setSelectedPartner(data)
        dispatch(setModalState({openModalPalInfo: true}))
    }

    return (
        <React.Fragment>
            {
                (modalState.openModalPalInfo && selectedPartner) &&
                <CustomModal
                    open={true}
                    closable={true}
                    data-test-id='partner-modal'
                    closeIcon={<CloseOutlined
                        data-test-id='modal-error-user-training-button-close'/>}
                    maskStyle={{
                        backgroundColor: 'rgba(121, 156, 212, 0.1)',
                        backdropFilter: 'blur(4px)'
                    }}
                    centered={true}
                >
                    <ModalPalInfo changeLayout={changeLayout} data={selectedPartner}/>
                </CustomModal>
            }

            <h4 className={styles.palCardsTitle}>Мои партнёры по тренировкам</h4>
            {
                pals.length > 0
                    ? <List
                        grid={{
                            gutter: 16,
                        }}
                        dataSource={pals}
                        pagination={{
                            pageSize: 6,
                            size: 'small',
                        }}
                        renderItem={(item, index) => (
                            <List.Item>
                                <PartnerCard
                                    index={index}
                                    searchedValue=""
                                    partner={item}
                                    type={PartnerCardTypes.CLEAR}
                                    onClickCard={handleClickCard}
                                />
                            </List.Item>
                        )}
                    />
                    : <p>У вас пока нет партнёров для совместных тренировок</p>
            }
        </React.Fragment>
    )
}
