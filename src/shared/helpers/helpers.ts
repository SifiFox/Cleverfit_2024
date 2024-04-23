import {TrainingType} from '@/features/calendar/model/types/training.ts';

export const instanceOfTrainingType = (object: any): object is TrainingType => {
    if(object){
        return 'member' in object
    }
}
