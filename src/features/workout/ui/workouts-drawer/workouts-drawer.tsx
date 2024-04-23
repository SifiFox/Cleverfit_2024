import {StepForwardOutlined} from '@ant-design/icons';
import {Drawer} from 'antd';
import {useForm} from 'antd/es/form/Form';

import styles from '@/features/calendar/ui/training-drawer-form/ui/training-drawer.module.scss';

import {
    DrawerTypes, setTrainingsState,
    useTrainingsSelector
} from '@/features/calendar/model/slices/trainings-slice.ts';
import {
    DrawerHeader
} from '@/features/calendar/ui/custom-popover/ui/drawer-header/ui/drawer-header.tsx';
import {useWorkoutSelector} from '@/features/workout/model/slices/workout-slice.ts';
import {
    WorkoutsTrainingForm
} from '@/features/workout/ui/workouts-drawer/workouts-drawer-form/workouts-training-form.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';


export const WorkoutsDrawer = () => {
    const {
        selectedTraining,
        drawerState,
        trainingsListState,
        selectedDate,
        drawerType
    } = useAppSelector(useTrainingsSelector)
    const {selectedPartner} = useAppSelector(useWorkoutSelector)

    const dispatch = useAppDispatch()
    const [form] = useForm()
    const onCloseDrawer = () => {
        dispatch(setTrainingsState({
            drawerState: {open: false},
            selectedTraining: null
        }))
    }

    return (
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
                selectedPartner={selectedPartner}
                withoutBadge={true}
            />}
            closable={false}
            destroyOnClose={true}
            closeIcon={<StepForwardOutlined/>}
        >
            <div className={styles.formBodyWrapper}>
                <WorkoutsTrainingForm closeDrawer={onCloseDrawer} form={form}/>
            </div>

        </Drawer>
    )
}
