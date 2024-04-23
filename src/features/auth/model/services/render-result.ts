import {history, store} from '@redux/configure-store.ts';

import {setResult} from '@/widgets/result/model/slices/result-slice.ts';

export const renderResult = (result: { path: string; data: unknown; }) => {
    store.dispatch(setResult(result.data))
    history.push(result.path)
}
