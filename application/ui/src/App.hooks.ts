// React
import { useEffect } from 'react';

// Custom
import { debounceSaveToLocalStorage } from './App.utils';
import { SupportedLanguage } from './types';
import togglePrimaryHighlightColor from './utils/togglePrimaryHighlightColor';

export const useSaveToLocalStorage = ({
    originalText,
    rotatedText,
    rot,
    originalLanguage,
    rotatedLanguage,
}: {
    originalText: string;
    rotatedText: string;
    rot: number;
    originalLanguage: SupportedLanguage;
    rotatedLanguage: SupportedLanguage;
}): void => {
    useEffect(() => {
        debounceSaveToLocalStorage(
            originalText,
            rotatedText,
            rot,
            originalLanguage,
            rotatedLanguage
        );
    }, [originalText, rotatedText, rot, originalLanguage, rotatedLanguage]);

    return undefined;
};

export const useTogglePrimaryHighlightColor = (
    isRotPositive: boolean
): void => {
    useEffect(() => {
        togglePrimaryHighlightColor(isRotPositive);
    }, [isRotPositive]);

    return undefined;
};
