import { languageMetadata } from '../constants/languageMetadata';

import { SupportedLanguage } from '../types';

export default (character: string, language: SupportedLanguage): number => {
    const lower: string = character.toLowerCase();

    return languageMetadata[language].charactersToIndex[lower] ?? -1;
};
