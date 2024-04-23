import React, {useEffect, useState} from 'react';
import {CARDS_ACTIONS_ITEMS} from '@pages/main-page/const/cards-action-items.tsx';
import {
    CardDescHeading,
    LegacyCardTitle,
    mainPageTitle
} from '@pages/main-page/const/const.tsx';
import {history} from '@redux/configure-store.ts';
import {Button} from 'antd';
import {Content} from 'antd/es/layout/layout';

import styles from './main-page.module.scss'

import {useLazyGetTrainingsQuery} from '@/features/calendar/model/services/trainings-service.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {AppRoutes, PageProps} from '@/shared/config/route-config/route-config.tsx';
import {CardItem} from '@/shared/ui/card-item';
import {setLoading} from '@/shared/ui/loader/model/loader-slice.ts';
import {CustomModal} from '@/widgets/custom-modal';
import {ModalServerError} from '@/widgets/custom-modal/const/modals.tsx';
import {setModalState, useModalStateSelector} from '@/widgets/custom-modal/model/modal-slice.ts';
import {Footer} from '@/widgets/footer';
import {Header} from '@/widgets/header';

export const MainPage: React.FC<PageProps> = ({breadcrumbs}:PageProps) => {
    const [currLink, setCurrLink] = useState<string>(AppRoutes.MAIN)
    const [fetchTrainings ,{isFetching, data: trainings, isError}] = useLazyGetTrainingsQuery()
    const modalState = useAppSelector(useModalStateSelector)
    const dispatch = useAppDispatch()
    const handleClickButton = (link: string) => {
        setCurrLink(link)
        if(link === AppRoutes.CALENDAR){
            fetchTrainings(false)
        }
        else{
            history.push(link, {state: {from: AppRoutes.MAIN}})
        }
    }

    useEffect(() => {
        dispatch(setLoading(isFetching))
        if(isError){
            dispatch(setModalState({openServerErrorModal: true}))
        }
        if(trainings){
            history.push(currLink, {state: {from: AppRoutes.MAIN}})
        }
    }, [dispatch, isFetching, trainings, isError, currLink]);

    return (
        <React.Fragment>
            {
                modalState.openServerErrorModal &&
                <CustomModal
                    open={true}
                    closable={false}
                    data-test-id='modal-no-review'
                >
                    <ModalServerError />
                </CustomModal>
            }
            <Header breadcrumbs={breadcrumbs} withSettings={true} title={mainPageTitle}/>
            <Content>
                <CardItem
                    className={styles.cardLegacy}
                >
                    <LegacyCardTitle />
                </CardItem>

                <div className={styles.cardsActions}>
                    <CardItem className={styles.cardLegacy}>
                        <h4>
                            <CardDescHeading/>
                        </h4>
                    </CardItem>
                    <div className={styles.cardsActionsList}>
                        {
                            CARDS_ACTIONS_ITEMS.map(item => (
                                <CardItem
                                    className={styles.cardAction}
                                    key={item.key}
                                    title={item.title}
                                    bordered={false}
                                >
                                    <Button
                                        data-test-id={item.testId}
                                        type="link" onClick={() => handleClickButton(item.link)}>
                                        {item.icon}
                                        <span>{item.body}</span>
                                    </Button>
                                </CardItem>
                            ))
                        }
                    </div>
                </div>
                <Footer />
            </Content>
        </React.Fragment>
    );
};
