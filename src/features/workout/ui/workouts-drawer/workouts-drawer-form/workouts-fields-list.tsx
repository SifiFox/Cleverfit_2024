import React from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, FormInstance, Input, InputNumber} from 'antd';

import styles from '@/features/calendar/ui/training-drawer-form/ui/training-drawer.module.scss';

import {
    DrawerTypes,
    useTrainingsSelector
} from '@/features/calendar/model/slices/trainings-slice.ts';
import {TrainingType} from '@/features/calendar/model/types/training.ts';
import {Nullable} from '@/features/user/model/slices/user-slice.ts';
import {removeItems} from '@/features/workout/ui/workouts-drawer/helpers/helpers.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks';


type FieldType = {
    name: any;
    key?: React.Key | null | undefined;
}
export type WorkoutsFieldsListProps = {
    fields: FieldType[],
    add: any,
    removeAvailable: boolean,
    form: FormInstance,
    selectedTraining?: Nullable<TrainingType>
}

export const WorkoutsFieldsList: React.FC<WorkoutsFieldsListProps> = (props) => {
    const {fields, add, removeAvailable, form, selectedTraining} = props
    const {
        drawerType,
        drawerState
    } = useAppSelector(useTrainingsSelector)
    const dispatch = useAppDispatch()

    return <React.Fragment>
        {fields.map((field, index: number) => (
            <div key={field.key}>
                <div className={styles.drawerFormGroup}>
                    <div style={{display: 'flex'}}
                         className={styles.formItemRow}>
                        <Form.Item name={[field.name, 'name']}>
                            <Input
                                placeholder="Упражнение"
                                data-test-id={`modal-drawer-right-input-exercise${index}`}
                            />
                        </Form.Item>
                        {
                            (drawerType === DrawerTypes.TRAINING_EDIT || drawerType === DrawerTypes.JOINT) &&
                            <Form.Item
                                key={field.key} name={[field.name, 'remove']}
                                valuePropName="checked"
                                wrapperCol={{offset: 8, span: 16}}
                                className={styles.drawerFormCheckbox}
                            >
                                <Checkbox
                                    data-test-id={`modal-drawer-right-checkbox-exercise${index}`}/>
                            </Form.Item>
                        }
                    </div>
                    <div className={styles.drawerFormColumns}>
                        <Form.Item
                            name={[field.name, 'approaches']}
                            style={{width: '100%'}}
                            label="Подходы"
                        >
                            <InputNumber
                                data-test-id={`modal-drawer-right-input-approach${index}`}
                                addonBefore="+"
                                min={0}
                            />
                        </Form.Item>
                        <Form.Item
                            name={[field.name, 'weight']}
                            style={{width: '100%'}}
                            label="Вес, кг"
                        >
                            <InputNumber
                                data-test-id={`modal-drawer-right-input-weight${index}`}
                                min={0}
                            />
                        </Form.Item>
                        <span className={styles.colSeparator}>x</span>
                        <Form.Item
                            name={[field.name, 'replays']}
                            style={{width: '100%'}}
                            label="Количество"
                        >
                            <InputNumber
                                data-test-id={`modal-drawer-right-input-quantity${index}`}
                                min={3}
                            />
                        </Form.Item>
                    </div>
                </div>
            </div>
        ))}
        <div className={styles.drawerFormButtons}>
            <Form.Item>
                <Button
                    type="link"
                    onClick={() => {
                        add()
                    }}>
                    <PlusOutlined/> Добавить ещё
                </Button>
            </Form.Item>
            {
                (drawerType === DrawerTypes.TRAINING_EDIT || drawerType === DrawerTypes.JOINT) &&
                <Form.Item>
                    <Button disabled={!removeAvailable}
                            className={styles.btnRemove} type="link"
                            onClick={() => removeItems({form, drawerState, dispatch, selectedTraining})}>
                        — Удалить
                    </Button>
                </Form.Item>
            }
        </div>
    </React.Fragment>
}
