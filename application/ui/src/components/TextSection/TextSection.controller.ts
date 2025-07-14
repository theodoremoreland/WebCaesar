// Third party
import { toast } from 'react-toastify';

// Custom
import findCharacterIndex from '../../utils/findCharacterIndex';

// Types
import { SupportedLanguage, LocalStorageKeys } from '../../types';

export const copyToastId: string = 'copy-toast';
export const decryptSuccessToastId: string = 'decrypt-success-toast';
export const decryptErrorToastId: string = 'decrypt-error-toast';

export const copyToClipboard = async (text: string): Promise<void> => {
    if (text === '') {
        return;
    }

    try {
        await navigator.clipboard.writeText(text);

        toast.info('Copied to clipboard', {
            toastId: copyToastId,
            autoClose: 1_200,
        });
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

export const validateInput = (
    input: string,
    originalLanguage: SupportedLanguage
): void => {
    if (input === '') {
        return;
    }

    const lastCharacter: string = input.slice(-1);

    if (/[a-zA-Z]/.test(lastCharacter) === false) {
        return;
    }

    if (findCharacterIndex(lastCharacter, originalLanguage) === -1) {
        throw new Error(
            `${lastCharacter} is not a valid character in ${originalLanguage}`
        );
    }
};

/**
 * Resets the local storage keys related to the text sections.
 */
export const resetLocalStorage = (): void => {
    localStorage.removeItem(LocalStorageKeys.ORIGINAL_TEXT);
    localStorage.removeItem(LocalStorageKeys.ROTATED_TEXT);
    localStorage.removeItem(LocalStorageKeys.ROT);
    localStorage.removeItem(LocalStorageKeys.ORIGINAL_LANGUAGE);
    localStorage.removeItem(LocalStorageKeys.ROTATED_LANGUAGE);
};
