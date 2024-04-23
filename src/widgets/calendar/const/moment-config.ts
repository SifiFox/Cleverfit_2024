import ruRu from 'antd/es/calendar/locale/ru_RU';

export const momentRu = {
    ...ruRu,
    lang: {
        ...ruRu.lang,
        ...{
            shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            shortMonths: [
                'Янв',
                'Фев',
                'Мар',
                'Апр',
                'Май',
                'Июн',
                'Июл',
                'Авг',
                'Сен',
                'Окт',
                'Ноя',
                'Дек',
            ]
        },
    },
}
