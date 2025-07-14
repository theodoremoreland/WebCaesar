import { LocalStorageKeys } from '../../../types';

export const saveDontShowAgain = (): void => {
    try {
        localStorage.setItem(LocalStorageKeys.DONT_SHOW_INTRO, 'true');
        localStorage.setItem(
            LocalStorageKeys.INTRO_MODAL_LAST_SHOWN_DATE,
            new Date().toISOString()
        );
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};
