import React, { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {Layout} from 'antd';

import { RequireAuth } from './require-auth.tsx';

import { AppRoutesProps, routeConfig } from '@/shared/config/route-config/route-config.tsx';
import {Sidebar} from '@/widgets/sidebar/ui/sidebar.tsx';

export default function AppRouter() {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = route.withSidebar
            ? (<React.Fragment><Sidebar/><Layout>{route.element}</Layout></React.Fragment>)
            : (<Layout>{route.element}</Layout>);

        return (
            <Route
                key={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
                path={route.path}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
}
