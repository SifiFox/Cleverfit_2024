import React, {CSSProperties} from 'react';
import { StepForwardOutlined} from '@ant-design/icons';
import { Drawer, Typography} from 'antd';
import moment from 'moment';

import styles from './custom-popover.module.scss'

import { reversedFormatDashed} from '@/features/calendar/const/constants.tsx';
import {
    filterTrainingsByDate,
    formattedDate,
    isDateBefore, isEqualExercises,
    isToday
} from '@/features/calendar/helpers/helpers.tsx';
import {
    DrawerTypes,
    setTrainingsState,
    useTrainingsSelector
} from '@/features/calendar/model/slices/trainings-slice.ts';
import {CustomPopoverProps,
    ExerciseType,
} from '@/features/calendar/model/types/training.ts';
import {
    DrawerHeader
} from '@/features/calendar/ui/custom-popover/ui/drawer-header/ui/drawer-header.tsx';
import {
    TrainingDrawerForm
} from '@/features/calendar/ui/training-drawer-form/ui/training-drawer-form.tsx';
import {TrainingCard} from '@/features/calendar/ui/trainings-card/ui/training-card.tsx';
import {useAppDispatch, useAppSelector, useWindowWidth} from '@/hooks';

export const CustomPopover: React.FC<CustomPopoverProps> = (props: CustomPopoverProps) => {
    const {onClose, trainings, trainingsList} = props
    const {
        selectedTraining,
        drawerState,
        trainingsListState,
        selectedDate,
        drawerType
    } = useAppSelector(useTrainingsSelector)
    const dispatch = useAppDispatch()

    const currTrainings = filterTrainingsByDate(formattedDate(selectedDate), trainings)

    let exercises: ExerciseType[] | undefined;

    if (selectedTraining && 'exercises' in selectedTraining) {
        exercises = selectedTraining.exercises
    }

    const showDrawer = () => {
        dispatch(setTrainingsState({
            drawerState: {open: true, exercises: exercises ?? null},
            toSaveState: {
                readyToSave: false
            }
        }))
    };
    const onCloseDrawer = () => {
        const toState =
            drawerState?.exercises
                ? {exercises: drawerState.exercises.filter(exercise => exercise !== null)}
                : selectedTraining
        const isEqual = isEqualExercises(exercises, drawerState?.exercises)

        if (!isEqual && drawerState?.exercises) {
            if (drawerType === DrawerTypes.ADD) {
                dispatch(setTrainingsState({
                    drawerState: {open: false},
                    selectedTraining: {
                        ...selectedTraining,
                        name: selectedTraining?.name,
                        exercises: drawerState.exercises
                    },
                    toSaveState: {
                        readyToSave: true,
                        saveData: {
                            ...selectedTraining,
                            name: selectedTraining?.name,
                            exercises: toState?.exercises,
                            date: selectedDate,
                        }
                    }
                }))
            }
            if (drawerType === DrawerTypes.EDIT) {
                dispatch(setTrainingsState({
                    drawerState: {open: false},
                    selectedTraining: {
                        name: selectedTraining?.name,
                        exercises: drawerState.exercises
                    },
                    toSaveState: {
                        readyToSave: true,
                        saveData: {
                            id: selectedTraining?._id,
                            body: {
                                name: selectedTraining?.name,
                                exercises: toState?.exercises,
                                date: selectedDate,
                                isImplementation: isDateBefore(selectedDate) || isToday(selectedDate)
                            }

                        }
                    }
                }))
            }
        } else {
            dispatch(setTrainingsState({
                drawerState: {open: false},
                toSaveState: {
                    readyToSave: false
                }
            }))
        }
    };
    const windowWidth = useWindowWidth()
    const isDesktop = windowWidth > 750
    const calendarCard = document.querySelectorAll(`[title*="${moment(selectedDate).format(reversedFormatDashed)}"]`);
    const calendarCardCords = calendarCard[0]?.getBoundingClientRect()

    const getOffsetStyles = (): CSSProperties => {
        if (!isDesktop) {
            return {
                top: calendarCardCords.top + 50,
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'fixed'
            }
        }
        if (moment(selectedDate).day() === 0) {
            return {
                transform: 'unset',
                left: 'unset',
                right: 0
            }
        }
        if (moment(selectedDate).day() === 1) {
            return {
                transform: 'unset',
                left: 0
            }
        }

        return {
            position: 'absolute'
        }
    }

    return (
        <div
            style={getOffsetStyles()}
            className={styles.popoverWrapper}>
            <Drawer
                data-test-id='modal-drawer-right'
                open={drawerState?.open}
                onClose={onCloseDrawer}
                title={<DrawerHeader
                    type={drawerType ?? DrawerTypes.ADD}
                    onClose={onCloseDrawer}
                    selectedTraining={selectedTraining}
                    trainingsList={trainingsListState}
                    selectedDate={selectedDate}

                />}
                closable={false}
                closeIcon={<StepForwardOutlined/>}
            >
                <div>
                    <Typography.Text type='secondary'>
                        <TrainingDrawerForm
                            selectedTraining={selectedTraining}
                        />
                    </Typography.Text>
                </div>
            </Drawer>

            <TrainingCard
                date={selectedDate}
                onClose={onClose}
                trainings={currTrainings}
                trainingsList={trainingsList}
                showDrawer={() => showDrawer()}
            />
        </div>
    )
}


