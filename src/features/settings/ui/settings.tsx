import React, { useState} from 'react';
import {FeedbacksFooter} from '@pages/feedbacks-page/ui/feedbacks-footer/ui/feedbacks-footer.tsx';
import {SettingsBlock} from '@pages/settings-page/ui/settings-block/ui/settings-block.tsx';
import {SettingsControls} from '@pages/settings-page/ui/settings-controls/ui/settings-controls.tsx';
import {TariffDrawer} from '@pages/settings-page/ui/tarif-drawer/ui/tariff-drawer.tsx';
import {TarifsCards} from '@pages/settings-page/ui/tarifs-cards/ui/tarifs-cards.tsx';
import {history} from '@redux/configure-store.ts';

import styles from './settings.module.scss'

import {useAppSelector} from '@/hooks';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalError, ModalSuccess} from '@/widgets/custom-modal/const/modals.tsx';
import {useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';

export const Settings: React.FC<{title:string}> = ({title}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const modalState = useAppSelector(useModalStateSelector)
    const openDrawer = () => {
        setIsDrawerOpen(true)
    }
    const closeDrawer = () => {
        setIsDrawerOpen(false)
    }
    const handleClickDetails = () => {
        openDrawer()
    }

    return (
        <div className={styles.settingsWrapper}>
            {
                modalState.openSuccessModal &&
                <CustomModal
                    open={true}
                    key='modal_success'
                >
                    <ModalSuccess />
                </CustomModal>
            }
            {
                modalState.openErrorModal &&
                <CustomModal
                    open={true}

                >
                    <ModalError />
                </CustomModal>
            }
            <TariffDrawer open={isDrawerOpen} onClose={closeDrawer}/>
            <SettingsBlock title={title}>
                <TarifsCards onClickDetails={handleClickDetails}/>
            </SettingsBlock>
            <SettingsBlock>
                <SettingsControls/>
            </SettingsBlock>
            <SettingsBlock>
                <FeedbacksFooter isShowAll={false} showAllTitle="Смотреть все отзывы" onClickShowAll={() => history.push('/feedbacks')}/>
            </SettingsBlock>
        </div>
    )
}
