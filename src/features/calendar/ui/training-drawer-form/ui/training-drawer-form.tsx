import React, {useEffect, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, InputNumber} from 'antd';

import styles from './training-drawer.module.scss'

import {
    DrawerTypes,
    setTrainingsState,
    useTrainingsSelector
} from '@/features/calendar/model/slices/trainings-slice.ts';
import {TrainingDrawerProps} from '@/features/calendar/model/types/training.ts';
import {useAppDispatch, useAppSelector} from '@/hooks';

export const TrainingDrawerForm: React.FC = (props: TrainingDrawerProps) => {
    const {selectedTraining} = props
    const {drawerState, drawerType} = useAppSelector(useTrainingsSelector)
    const [form] = Form.useForm()
    const [removeAvailable, setRemoveAvailable] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        form.resetFields()
    }, [form, selectedTraining]);

    const initValue = selectedTraining?.exercises?.filter(item => !item?.isImplementation) ?? [{ name: '', approaches: 1, weight: 0, replays: 3 }]
    const fieldsChange = () => {
        dispatch(setTrainingsState({drawerState: {open: true, exercises: form.getFieldsValue().exercises}}))
        const isHasItemsToRemove = form.getFieldsValue().exercises.find((item: { remove: boolean; }) => item?.remove)

        if(isHasItemsToRemove){
            setRemoveAvailable(true)
        }
    }

    const removeItems = () => {
        const itemsAfterRemove = drawerState?.exercises?.filter(item => !item.remove) ?? []

        dispatch(setTrainingsState({
            drawerState: {open: true, exercises: itemsAfterRemove},
            selectedTraining: {name: selectedTraining?.name, _id: selectedTraining?._id, exercises: itemsAfterRemove}
        }))
        form.setFieldsValue({exercises: drawerState?.exercises})
        form.resetFields([itemsAfterRemove])
    }

    return (
        <Form form={form} className={styles.trainingDrawerForm} name="dynamic_workout_form"
              onFieldsChange={fieldsChange}
        >
            <Form.List
                name="exercises"
                initialValue={initValue}
            >
                {(fields, { add }) => (
                    <React.Fragment>
                        {fields.map((field , index) => (
                            <div key={field.key}>
                                <div className={styles.drawerFormGroup}>
                                    <div style={{display: 'flex'}} className={styles.formItemRow}>
                                        <Form.Item name={[field.name, 'name']}>
                                            <Input
                                                placeholder="Упражнение"
                                                data-test-id={`modal-drawer-right-input-exercise${index}`}
                                            />
                                        </Form.Item>
                                        {
                                            drawerType === DrawerTypes.EDIT &&
                                            <Form.Item
                                                key={field.key} name={[field.name, 'remove']}
                                                valuePropName="checked"
                                                wrapperCol={{ offset: 8, span: 16 }}
                                                className={styles.drawerFormCheckbox}
                                            >
                                                <Checkbox data-test-id={`modal-drawer-right-checkbox-exercise${index}`}/>
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
                                    onClick={() => {add()}}>
                                    <PlusOutlined /> Добавить ещё
                                </Button>
                            </Form.Item>
                            {
                                drawerType === DrawerTypes.EDIT &&
                                <Form.Item >
                                    <Button disabled={!removeAvailable} className={styles.btnRemove} type="link" onClick={removeItems}>
                                        — Удалить
                                    </Button>
                                </Form.Item>
                            }
                        </div>
                    </React.Fragment>
                )}
            </Form.List>

        </Form>
    )
}




