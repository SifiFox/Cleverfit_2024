import {ReactNode} from 'react';
import { Navigate } from 'react-router-dom';

import {useAuthSelector} from '@/features/auth/model/slices/auth-slice.ts';
import {useAppSelector} from '@/hooks';

export function RequireAuth({ children }: {children: ReactNode}) {
    const {auth} = useAppSelector(useAuthSelector)

    return auth
        ? children
        : <Navigate to="/auth" />
}
