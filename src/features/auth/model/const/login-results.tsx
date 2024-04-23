import {history} from '@redux/configure-store.ts';
import {Button} from 'antd';

import {AppRoutes, RoutePath} from '@/shared/config/route-config/route-config.tsx';

export const resultLoginError = {
    path: '/result/error-login',
    data: {
        inited: true,
        status: 'warning',
        title: 'Вход не выполнен',
        subtitle: 'Что-то пошло не так. Попробуйте еще раз.',
        extra: <Button
            onClick={() => history.push(RoutePath.auth, {from: '/result/error-login'})}
            type='primary'
            data-test-id='login-retry-button'
            block={true}
        >
            Повторить
        </Button>
    }
}
export const resultCheckEmailError = {
    path: '/result/error-check-email',
    data: {
        inited: true,
        status: '500',
        title: 'Что-то пошло не так',
        subtitle: 'Произошла ошибка, попробуйте отправить форму еще раз.',
        extra: <Button
            onClick={() => history.push(RoutePath.auth, {from: '/result/error-check-email'})}
            type='primary'
            data-test-id='check-back-button'
        >
            Назад
        </Button>
    }
}

export const resultErrorCheckEmailNoExist = {
    path: '/result/error-check-email-no-exist',
    data: {
        inited: true,
        status: 'error',
        title: 'Такой e-mail не зарегистрирован',
        subtitle: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
        extra: <Button
            data-test-id='check-retry-button'
            onClick={() => history.push(RoutePath.auth, {from: '/result/error-check-email-no-exist'})}
            type='primary'
            block={true}
        >
            Попробовать снова
        </Button>
    }
}
