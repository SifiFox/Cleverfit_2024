import React from 'react';
import {EditFilled, EditTwoTone} from '@ant-design/icons';
import {Button} from 'antd';

import styles from '@/features/calendar/ui/custom-popover/ui/custom-popover.module.scss';

import {
    DrawerTypes,
    setTrainingsState,
    useTrainingsSelector
} from '@/features/calendar/model/slices/trainings-slice.ts';
import {ExerciseType} from '@/features/calendar/model/types/training.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';

type SelectOptionsProps = {
    exercises: ExerciseType[],
    handleClickEdit: () => void
}
const SelectOptions: React.FC<SelectOptionsProps> = (props: SelectOptionsProps) => {
    const {exercises, handleClickEdit} = props
    const handleClick = () => {
        handleClickEdit()
    }
    const filteredExercises = exercises.filter(exercise => exercise !== null)

    return (
        <React.Fragment>
            {
                filteredExercises.map((exercise: ExerciseType, index: number) => (
                    <div key={exercise._id}
                         className={styles.cardAddBody}>
                        <span>{exercise.name ?? ''}</span>
                        <Button
                            type='text'
                            disabled={exercise.isImplementation}
                            onClick={() => handleClick()}
                        >
                            {exercise.isImplementation
                                ? <EditFilled data-test-id={`modal-update-training-edit-button${index}`}/>
                                : <EditTwoTone data-test-id={`modal-update-training-edit-button${index}`}/>
                            }
                        </Button>
                    </div>
                ))
            }
        </React.Fragment>
    )
}

export const CardAddBody: React.FC = () => {
    const {selectedTraining} = useAppSelector(useTrainingsSelector)
    const dispatch = useAppDispatch()
    const handleClickEdit = () => {
        dispatch(setTrainingsState({drawerState: {open: true}, drawerType: DrawerTypes.EDIT}))
    }
    let exercises;

    if (selectedTraining && 'exercises' in selectedTraining) {
        exercises = selectedTraining.exercises
    }

    return selectedTraining && exercises
        ? <SelectOptions exercises={exercises} handleClickEdit={handleClickEdit}/>
        : null
}
