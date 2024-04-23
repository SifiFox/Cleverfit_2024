import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Result} from 'antd';

import {useAppSelector} from '@/hooks';
import {useResultDataSelector} from '@/widgets/result/model/slices/result-slice.ts';

export const ResultForm: React.FC = () => {
    const {
        inited,
        status,
        title,
        subtitle,
        extra
    } = useAppSelector(useResultDataSelector)
    const navigate = useNavigate()
    const location = useLocation()

    if(inited){
        return (
            <Result
                status={status}
                title={title}
                subTitle={subtitle}
                extra={extra}
            />
        )
    }
        navigate('/auth', { state: { from: location } })

        return null
    

}
