import React, {ReactNode} from 'react';
import {Button, Divider} from 'antd';

type CustomButtonProps = {
    title: string,
    icon?: ReactNode,
    textAlign?: 'left' | 'center' | 'right',
    collapsed?: boolean,
    divider?: boolean
}
export const CustomButton: React.FC<CustomButtonProps> = (props:CustomButtonProps) => {
    const {
        title,
        icon,
        textAlign = 'center',
        collapsed,
        divider = false
    } = props

    return(
        <React.Fragment>
            {
                divider &&
                <Divider style={{
                    marginBottom: 0
                }} />
            }
            <Button type="text" block={true} style={{
                textAlign,
                display: 'flex',
                alignItems: 'center',
                height: 40
            }}>
                {icon && icon}
                {
                    !collapsed &&
                    <span className="button-title">
                        {title}
                    </span>
                }
            </Button>
        </React.Fragment>
    )
}
