import {TrainingType} from '@/features/calendar/model/types/training.ts';
import {periods} from '@/features/workout/constants/constants.tsx';

export const getPeriodTitle = (item: TrainingType) => periods.find(period => period.value === item?.parameters?.period)?.label
export const removeFalsyValues = <T>(obj: T): Partial<T>  =>Object.fromEntries(
        Object.entries(obj)
            .filter(([_, v]) => Boolean(v))
    ) as { [K in keyof T]?: NonNullable<T[K]> }

export const getTrainingsListNameByValue = (trainingsList, value) => trainingsList?.find(item => item.key === value).name
export const getTrainingsListValueByName = (trainingsList, name) => trainingsList?.find(item => item.name === name).key
export const getFavouriteTrainingType = (trainings, trainingsList) => {
    const result: Record<string, number> = {};

    trainings.forEach((obj) => {
        if (obj.exercises && obj.exercises.length > 0) {
            obj.exercises.forEach((exercise) => result[obj.name] = exercise.replays * exercise.weight * exercise.approaches);
        }
    });
    const [maxKey] = Object.entries(result).sort((a, b) => b[1] - a[1])[0];

    return trainingsList.find(item => item.name === maxKey)
}

export const sortPartners = (items) => {
    if(items?.length > 0){
        const priority = {
            accepted: 0,
            pending: 1,
            null: 2,
            rejected: 3,
        };

        return [...items].sort((a,b) => {
            const statusA = a.status || 'null';
            const statusB = b.status || 'null';
            const [firstNameA, lastNameA = ''] = (a.name || '').toLowerCase().split(' ');
            const [firstNameB, lastNameB = ''] = (b.name || '').toLowerCase().split(' ');

            if (statusA !== statusB) {
                return priority[statusA] - priority[statusB];
            }
            if (a.name === '' || b.name === '') {
                return priority[statusA];
            }
            const result = firstNameA.charCodeAt(0) - firstNameB.charCodeAt(0);

            return result ? firstNameA.localeCompare(firstNameB) : lastNameA.localeCompare(lastNameB);
        })
    }

    return []
}
