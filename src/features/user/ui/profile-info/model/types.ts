import {FormInstance} from 'antd';
import {Moment} from 'moment/moment';

export type ProfileInfoProps = {
    disableSave: () => void
    enableSave: () => void
    name?: string,
    surname?: string,
    date?: Moment | string,
    img?: string,
    form?: FormInstance,
}
