import React from 'react';

export function useWindowWidth() {
    const [windowWidth, setWindowWidth] = React.useState(0);

    React.useLayoutEffect(() => {
        const handler = () => {
            setWindowWidth(window.innerWidth);
        };

        handler();
        window.addEventListener('resize', handler);

        return () => {
            window.removeEventListener('resize', handler);
        };
    }, []);

    return windowWidth;
}
