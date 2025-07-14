import { useEffect } from 'react';
import { debounceSaveToLocalStorage } from '../App.utils';
import { SupportedLanguage } from '../types';

export const useLocalStorageSave = ({
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

export default useLocalStorageSave;
