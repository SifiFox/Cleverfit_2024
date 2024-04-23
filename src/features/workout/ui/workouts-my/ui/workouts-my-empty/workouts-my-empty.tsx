import React from 'react';
import {Button, Col, Row, Space, Typography} from 'antd';

import styles from '../../../workout.module.scss'

export const WorkoutsMyEmpty: React.FC<{handleClick: () => void}> = ({handleClick}) => (
        <div className={styles.workoutsEmptyWrapper}>
            <Col>
                <Row justify="center">
                    <Space direction="vertical">
                        <Typography.Title>У вас ещё нет созданных тренировок</Typography.Title>
                    </Space>
                </Row>
                <Row justify="center">
                    <Space>
                        <Button onClick={handleClick} style={{height: 40}} type="primary">Создать тренировку</Button>
                    </Space>
                </Row>
            </Col>
        </div>
    )
