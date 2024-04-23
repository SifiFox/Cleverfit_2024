import React, {useId} from 'react';
import {Moment} from 'moment';

import {TrainingType} from '@/features/calendar/model/types/training.ts';
import {WorkoutsJointTypes} from '@/features/workout/constants/constants.tsx';
import {
    JointMessage
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-basic/ui/workouts-joint-messages/ui/joint-message.tsx';
import {
    Statuses
} from '@/features/workout/ui/workouts-joint/ui/workouts-joint-patners/ui/partner-card/partner-card.tsx';


export type InvitesDataType = {
    createdAt: Moment | string,
    from: Record<string, string>,
    status: Statuses,
    training: TrainingType,
    _id: string
}

type WorkoutsJointMessagesProps = {
    messagesShowAll: boolean,
    messages: InvitesDataType[],
    changeLayout: (arg: WorkoutsJointTypes) => void
}

export const WorkoutsJointMessages: React.FC<WorkoutsJointMessagesProps> = ({messagesShowAll, messages, changeLayout}) => {
    const slicedMessages = messages.slice(-!messagesShowAll)

    return (
        <React.Fragment>
            {
                slicedMessages.map((message, index) => (
                    <JointMessage key={useId()} messageKey={`message${index}`} data={message} changeLayout={changeLayout}/>
                ))
            }
        </React.Fragment>
    )
}
