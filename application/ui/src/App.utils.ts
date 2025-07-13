// Third party
import debounce from 'lodash.debounce';

// Types
import { SupportedLanguage } from './types';

export const jokeErrorToastId: string = 'joke-error-toast';

export const getLocalStorageData = (): {
    originalText: string | null;
    rotatedText: string | null;
    rot: string | null;
    originalLanguage: string | null;
    rotatedLanguage: string | null;
} => {
    const originalText: string | null = localStorage.getItem('originalText');
    const rotatedText: string | null = localStorage.getItem('rotatedText');
    const rot: string | null = localStorage.getItem('rot');
    const originalLanguage: string | null =
        localStorage.getItem('originalLanguage');
    const rotatedLanguage: string | null =
        localStorage.getItem('rotatedLanguage');

    return {
        originalText,
        rotatedText,
        rot,
        originalLanguage,
        rotatedLanguage,
    };
};

export const setLocalStorageData = (
    originalText: string,
    rotatedText: string,
    rot: number,
    originalLanguage: SupportedLanguage,
    rotatedLanguage: SupportedLanguage
): void => {
    localStorage.setItem('originalText', originalText);
    localStorage.setItem('rotatedText', rotatedText);
    localStorage.setItem('rot', rot.toString());
    localStorage.setItem('originalLanguage', originalLanguage);
    localStorage.setItem('rotatedLanguage', rotatedLanguage);
};

export const debounceSaveToLocalStorage = debounce(
    (originalText, rotatedText, rot, originalLanguage, rotatedLanguage) => {
        setLocalStorageData(
            originalText,
            rotatedText,
            rot,
            originalLanguage,
            rotatedLanguage
        );
    },
    1_000
);

export const shouldShowIntroModal = (): boolean => {
    const hasClickedDontShowAgain: boolean =
        localStorage.getItem('dontShowIntroModal') === 'true';
    const lastShownDateString: string | null = localStorage.getItem(
        'introModalLastShownDate'
    );

    const lastShownDate = new Date(lastShownDateString || 0);
    const currentDate = new Date();

    // Check if the last shown date is more than 30 days ago
    const daysDifference = Math.floor(
        (currentDate.getTime() - lastShownDate.getTime()) /
            (1000 * 60 * 60 * 24)
    );

    return !hasClickedDontShowAgain && daysDifference > 30;
};
