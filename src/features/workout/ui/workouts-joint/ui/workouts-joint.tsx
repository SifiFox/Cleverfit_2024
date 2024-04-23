import React, {useState} from 'react';

import { WorkoutsJointTypes } from '@/features/workout/constants/constants';
import {
    WorkoutsJointBasic
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-basic/ui/workouts-joint-basic.tsx';
import {
    WorkoutsJointPartners
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-patners/ui/workouts-joint-partners.tsx';

export const WorkoutsJoint: React.FC = () => {
    const [layout, setLayout] = useState(WorkoutsJointTypes.BASIC)

    const handleChangeLayout = (state: WorkoutsJointTypes) => {
        setLayout(state)
    }

    return layout === WorkoutsJointTypes.PARTNERS 
        ? <WorkoutsJointPartners changeLayout={handleChangeLayout}/>
        : <WorkoutsJointBasic
            changeLayout={handleChangeLayout}
            clear={layout === WorkoutsJointTypes.CLEAR}
        />
}
