export type TariffInfo = {
    title: string,
    free: boolean,
    pro: boolean
}

export const tariffsInfo = [
    {
        title: 'Статистика за месяц',
        free: true,
        pro: true
    },
    {
        title: 'Статистика за всё время',
        free: false,
        pro: true
    },
    {
        title: 'Совместные тренировки',
        free: true,
        pro: true
    },
    {
        title: 'Участие в марафонах',
        free: false,
        pro: true
    },
    {
        title: 'Приложение iOS',
        free: false,
        pro: true
    },
    {
        title: 'Приложение Android',
        free: false,
        pro: true
    },
    {
        title: 'Индивидуальный Chat GPT',
        free: false,
        pro: true
    },
]
