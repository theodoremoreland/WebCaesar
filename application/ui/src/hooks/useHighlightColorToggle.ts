// React
import { useEffect } from 'react';

// Custom
import togglePrimaryHighlightColor from '../utils/togglePrimaryHighlightColor';

const useHighlightColorToggle = (isRotPositive: boolean): void => {
    useEffect(() => {
        togglePrimaryHighlightColor(isRotPositive);
    }, [isRotPositive]);

    return undefined;
};

export default useHighlightColorToggle;
