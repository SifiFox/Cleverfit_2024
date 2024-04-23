import {CheckOutlined} from '@ant-design/icons';
import {dateMonthDay} from '@pages/settings-page/ui/tarif-drawer/utils/utils.ts';
import {Button, Card} from 'antd';

import styles from './tarifs-cards.module.scss'

import {useGetTariffListQuery} from '@/features/catalogs/model/catalogs-service.ts';
import {Tariff, useUserSelector} from '@/features/user/model/slices/user-slice.ts';
import {useAppSelector} from '@/hooks';
import tariffFree from '@/shared/assets/images/tariff__free.jpg';
import tariffPro from '@/shared/assets/images/tariff__pro.jpg';
import {classNames} from '@/shared/lib/classnames/classnames.ts';


const tariffFreeName = 'free'
const tariffProName = 'Pro'

const TariffsList = (props: { onClickDetails: () => void, tariffs: Tariff[] }) => {
    const {userData} = useAppSelector(useUserSelector)
    const {tariffs, onClickDetails} = props

    return tariffs.map(tariff => (
        <Card
            data-test-id={tariff.name === tariffProName ? 'pro-tariff-card' : null}
            key={tariff.name}
            className={styles.tarifCard}
            title={
                <div className={styles.tarifCardTitle}>
                    <span><b>{tariff.name}</b> tarif</span>
                    <Button type='link' onClick={onClickDetails}>Подробнее</Button>
                </div>
            }
        >
            <div className={classNames(styles.tarifCardImage, {[styles.tarifImagePale]: tariff.name === tariffProName && !userData.tariff})}>
                <img src={tariff.name === tariffFreeName ? tariffFree : tariffPro} alt=""/>
            </div>
            <div className={styles.tarifCardFooter}>
                {
                    tariff.name === tariffFreeName
                        ? <p>активен <CheckOutlined/></p>
                        : userData.tariff
                            ? <div>
                                <p>активен</p>
                                <p>до {dateMonthDay(userData.tariff.expired)}</p>
                            </div>
                            : <Button data-test-id='activate-tariff-btn' type="primary"
                                      onClick={onClickDetails}>Активировать</Button>
                }
            </div>
        </Card>
    ))
}


export const TarifsCards = (props: { onClickDetails: () => void }) => {
    const {onClickDetails} = props
    const {data} = useGetTariffListQuery(false)
    const tariffsArray = [{_id: 'tarif-default', name: tariffFreeName, periods: null}]

    return (
        <div className={styles.tarifsCardsWrapper}>
            {data &&
                <TariffsList tariffs={tariffsArray.concat(data).filter(Boolean)}
                             onClickDetails={onClickDetails}/>}
        </div>
    )
}
