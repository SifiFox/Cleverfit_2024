import {history} from '@redux/configure-store.ts';
import {Button} from 'antd';

import {RoutePath} from '@/shared/config/route-config/route-config.tsx';

export const resultSuccess = {
    path: '/result/success',
    data: {
        inited: true,
        status: 'success',
        title: 'Регистрация успешна',
        subtitle: 'Регистрация прошла успешно. Зайдите в приложение, используя свой e-mail и пароль',
        extra: <Button
            onClick={() => history.push(RoutePath.auth)}
            type='primary'
            data-test-id='registration-enter-button'
            block={true}
        >
            Войти
        </Button>
    }
}
export const resultErrorUserExist = {
    path: '/result/error-user-exist',
    data: {
        inited: true,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail',
        extra: <Button
            onClick={() => history.push('/auth/registration')}
            type='primary'
            data-test-id='registration-back-button'
            block={true}
        >
            Назад к регистрации
        </Button>
    }
}


export const resultError = {
    path: '/result/error',
    data: {
        inited: true,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте еще раз.',
        extra: <Button
            data-test-id='registration-retry-button'
            onClick={() => history.push('/auth/registration')}
            type='primary'
            block={true}
        >
            Повторить
        </Button>
    }
}

export const resultBadConnection = {
    path: '/result/error-check-email',
    data: {
        inited: true,
        status: '500',
        title: 'Что-то пошло не так',
        subtitle: 'Произошла ошибка, попробуйте отправить форму еще раз.',
        extra: <Button
            data-test-id='registration-retry-button'
            onClick={() => history.back()}
            type='primary'
            block={true}
        >
            Назад
        </Button>
    }
}
