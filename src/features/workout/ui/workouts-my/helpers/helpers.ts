import {Moment} from 'moment';
import moment from 'moment/moment';


export const disabledDate = (current: Moment) => current < moment().endOf('day')

