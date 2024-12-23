// Third party
import { debounce } from "lodash";

// Types
import { SupportedLanguage } from "./types";

export const jokeErrorToastId: string = "joke-error-toast";

export const getLocalStorageData = (): {
    originalText: string | null;
    rotatedText: string | null;
    rot: string | null;
    originalLanguage: string | null;
    rotatedLanguage: string | null;
} => {
    const originalText: string | null = localStorage.getItem("originalText");
    const rotatedText: string | null = localStorage.getItem("rotatedText");
    const rot: string | null = localStorage.getItem("rot");
    const originalLanguage: string | null =
        localStorage.getItem("originalLanguage");
    const rotatedLanguage: string | null =
        localStorage.getItem("rotatedLanguage");

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
    localStorage.setItem("originalText", originalText);
    localStorage.setItem("rotatedText", rotatedText);
    localStorage.setItem("rot", rot.toString());
    localStorage.setItem("originalLanguage", originalLanguage);
    localStorage.setItem("rotatedLanguage", rotatedLanguage);
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
    2_500
);
