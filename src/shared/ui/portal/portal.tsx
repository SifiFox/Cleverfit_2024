import {FC, PropsWithChildren} from 'react';
import {createPortal} from 'react-dom';


export const Portal: FC<PropsWithChildren & { container?: Element | DocumentFragment }>
    = ({
           children,
           container = document.body
       }) => createPortal(children, container);




