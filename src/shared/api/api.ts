import {RootState} from '@redux/configure-store.ts';

export const baseApiQuery = {
    baseUrl: 'https://marathon-api.clevertec.ru/',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.auth

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
}
