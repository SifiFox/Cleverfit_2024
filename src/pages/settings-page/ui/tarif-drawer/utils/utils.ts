import moment from 'moment/moment';

export const dateMonthDay = (data: moment.MomentInput) => moment(data).format('DD.MM')
