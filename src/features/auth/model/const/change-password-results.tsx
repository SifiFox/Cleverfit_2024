import {history} from '@redux/configure-store.ts';
import {Button} from 'antd';

import {AppRoutes} from '@/shared/config/route-config/route-config.tsx';

export const resultChangePasswordError = {
    path: '/result/error-change-password',
    data: {
        inited: true,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Что-то пошло не так, попробуйте еще раз',
        extra: <Button
            onClick={() => history.push('/auth/change-password', {from: '/result/error-change-password'})}
            type='primary'
            data-test-id='change-retry-button'
            style={{width: '100%'}}
        >
            Повторить
        </Button>
    }
}
export const resultChangePasswordSuccess = {
    path: '/result/success-change-password',
    data: {
        inited: true,
        status: 'success',
        title: 'Пароль успешно изменен',
        subtitle: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        extra: <Button
            data-test-id='change-entry-button'
            onClick={() => history.push(AppRoutes.AUTH, {from: '/result/success-change-password'})}
            type='primary'
            style={{width: '100%'}}
        >
            Вход
        </Button>
    }
}
