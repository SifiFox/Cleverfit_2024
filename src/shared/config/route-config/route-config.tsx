import {Navigate, RouteProps} from 'react-router-dom';
import {AchievementsPage} from '@pages/achivments-page';
import {AuthPage} from '@pages/auth-page';
import {AuthLayouts} from '@pages/auth-page/const/auth-layouts.ts';
import {CalendarPage} from '@pages/calendar-page';
import {FeedbacksPage} from '@pages/feedbacks-page';
import {MainPage} from '@pages/main-page';
import {NotFoundPage} from '@pages/not-found-page';
import {ProfilePage} from '@pages/profile-page';
import {SettingsPage} from '@pages/settings-page/ui/settings-page.tsx';
import {WorkoutPage} from '@pages/workout-page';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean,
    title?: string,
    withSidebar?: boolean
}

export enum AppRoutes {
    MAIN = 'main',
    DEFAULT = 'default',
    AUTH = 'auth',
    REGISTRATION = 'registration',
    RESULT = 'result',
    NOT_FOUND = 'not_found',
    CONFIRM_EMAIL = 'confirm_email',
    CHANGE_PASSWORD = 'change_password',
    FEEDBACKS = 'feedbacks',
    CALENDAR = 'calendar',
    PROFILE = 'profile',
    SETTINGS = 'settings',
    TRAINING = 'training',
    ACHIEVEMENTS = 'achievements'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.DEFAULT]: '/',
    [AppRoutes.MAIN]: '/main',
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.REGISTRATION]: '/auth/registration',
    [AppRoutes.CONFIRM_EMAIL]: '/auth/confirm-email',
    [AppRoutes.CHANGE_PASSWORD]: '/auth/change-password',
    [AppRoutes.RESULT]: '/result/',
    [AppRoutes.FEEDBACKS]: '/feedbacks',
    [AppRoutes.ACHIEVEMENTS]: '/achievements',
    [AppRoutes.CALENDAR]: '/calendar',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.SETTINGS]: '/settings',
    [AppRoutes.TRAINING]: '/training',
    [AppRoutes.NOT_FOUND]: '*',
};

export type TBreadcrumb = {
    title: string,
    breadcrumbName: string,
    path: string
}

export type PageProps = {
    breadcrumbs: TBreadcrumb[]
}
export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.DEFAULT]: {
        path: RoutePath.default,
        element:
            <Navigate to={RoutePath.main}/>
    },
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element:
            <MainPage
                breadcrumbs={
                    [{
                        title: 'Главная',
                        breadcrumbName: 'Главная',
                        path: RoutePath.main
                    }]
                }/>,
        title: `Приветствуем тебя в\u00A0CleverFit — приложении,
            которое поможет тебе добиться своей мечты!`,
        withSidebar: true,
        authOnly: true
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <AuthPage type={AuthLayouts.AUTH}/>,
    },
    [AppRoutes.REGISTRATION]: {
        path: RoutePath.registration,
        element: <AuthPage type={AuthLayouts.REGISTRATION}/>,
    },
    [AppRoutes.ACHIEVEMENTS]: {
        path: RoutePath.achievements,
        element: <AchievementsPage
            breadcrumbs={
                [
                    {
                        title: 'Главная',
                        breadcrumbName: 'Главная',
                        path: RoutePath.main
                    },
                    {
                        title: 'Достижения',
                        breadcrumbName: 'Достижения',
                        path: RoutePath.achievements
                    }
                ]
            }
        />,
        withSidebar: true,
        authOnly: true
    },
    [AppRoutes.RESULT]: {
        path: `${RoutePath.result}:type`,
        element: <AuthPage type={AuthLayouts.RESULT}/>,
    },
    [AppRoutes.SETTINGS]: {
        path: `${RoutePath.settings}`,
        element: <SettingsPage/>,
        withSidebar: true,
        authOnly: true
    },
    [AppRoutes.TRAINING]: {
        path: `${RoutePath.training}`,
        element: <WorkoutPage
            breadcrumbs={
                [
                    {
                        title: 'Главная',
                        breadcrumbName: 'Главная',
                        path: RoutePath.main
                    },
                    {
                        title: 'Тренировки',
                        breadcrumbName: 'Тренировки',
                        path: RoutePath.training
                    }
                ]
            }
        />,
        withSidebar: true,
        authOnly: true
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}`,
        element: <ProfilePage/>,
        withSidebar: true,
        authOnly: true
    },
    [AppRoutes.FEEDBACKS]: {
        path: `${RoutePath.feedbacks}`,
        element: <FeedbacksPage
            breadcrumbs={[
                {title: 'Главная', breadcrumbName: 'Главная', path: RoutePath.default},
                {
                    title: 'Отзывы пользователей',
                    breadcrumbName: 'Отзывы пользователей',
                    path: RoutePath.feedbacks
                }]}
        />,
        withSidebar: true,
        authOnly: true
    },
    [AppRoutes.CALENDAR]: {
        path: `${RoutePath.calendar}`,
        element: <CalendarPage
            breadcrumbs={
                [
                    {
                        title: 'Главная',
                        breadcrumbName: 'Главная',
                        path: RoutePath.main
                    }
                ]
            }
        />,
        withSidebar: true,
        authOnly: true
    },
    [AppRoutes.CONFIRM_EMAIL]: {
        path: RoutePath.confirm_email,
        element: <AuthPage type={AuthLayouts.CONFIRM}/>,
    },
    [AppRoutes.CHANGE_PASSWORD]: {
        path: RoutePath.change_password,
        element: <AuthPage type={AuthLayouts.CHANGE_PASSWORD}/>,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage/>,
        withSidebar: true,
        authOnly: true
    },
};
