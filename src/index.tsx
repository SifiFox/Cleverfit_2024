import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {HistoryRouter} from 'redux-first-history/rr6'
import {history,store} from '@redux/configure-store.ts';

import 'antd/dist/antd.css'
import '@/app/styles/reset.scss'
import '@/app/styles/variables/global.scss'
import '@/app/styles/index.scss'

import App from '@/app/app.tsx';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <App/>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
