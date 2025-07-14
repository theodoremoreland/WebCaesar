// Third party
import debounce from 'lodash.debounce';

// Types
import { SupportedLanguage, LocalStorageKeys } from './types';

export const jokeErrorToastId: string = 'joke-error-toast';

export const getLocalStorageData = (): {
    originalText: string | null;
    rotatedText: string | null;
    rot: string | null;
    originalLanguage: string | null;
    rotatedLanguage: string | null;
} => {
    const originalText: string | null = localStorage.getItem(
        LocalStorageKeys.ORIGINAL_TEXT
    );
    const rotatedText: string | null = localStorage.getItem(
        LocalStorageKeys.ROTATED_TEXT
    );
    const rot: string | null = localStorage.getItem(LocalStorageKeys.ROT);
    const originalLanguage: string | null = localStorage.getItem(
        LocalStorageKeys.ORIGINAL_LANGUAGE
    );
    const rotatedLanguage: string | null = localStorage.getItem(
        LocalStorageKeys.ROTATED_LANGUAGE
    );

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
    localStorage.setItem(LocalStorageKeys.ORIGINAL_TEXT, originalText);
    localStorage.setItem(LocalStorageKeys.ROTATED_TEXT, rotatedText);
    localStorage.setItem(LocalStorageKeys.ROT, rot.toString());
    localStorage.setItem(LocalStorageKeys.ORIGINAL_LANGUAGE, originalLanguage);
    localStorage.setItem(LocalStorageKeys.ROTATED_LANGUAGE, rotatedLanguage);
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
        localStorage.getItem(LocalStorageKeys.DONT_SHOW_INTRO) === 'true';
    const lastShownDateString: string | null = localStorage.getItem(
        LocalStorageKeys.INTRO_MODAL_LAST_SHOWN_DATE
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
