import {history} from '@redux/configure-store.ts';
import {Button} from 'antd';

export const resultCheckEmailError = {
    path: '/result/error-check-email',
    data: {
        inited: true,
        status: '500',
        title: 'Что-то пошло не так',
        subtitle: 'Произошла ошибка, попробуйте отправить форму еще раз',
        extra:
            <Button
                onClick={() => history.push('/auth/confirm-email')}
                type='primary'
                data-test-id='check-back-button'
            >
                Назад
            </Button>
    }
}
