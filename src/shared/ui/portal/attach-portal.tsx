import {Moment} from 'moment/moment';

type AttachPortalProps = {
    date: Moment | string;
};

export const attachPortal = ({date}: AttachPortalProps) => document.querySelector<HTMLElement>(`[title*="${date}"]`);
