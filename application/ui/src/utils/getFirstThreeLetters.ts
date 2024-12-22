import { languageMetadata } from "../modules/languageMetadata";

import { SupportedLanguage } from "../types";

export default (language: SupportedLanguage): [string, string, string] => {
    const indexToCharacters = languageMetadata[language].indexToCharacters;
    const firstThreeLetters: [string, string, string] = [
        indexToCharacters[0][0],
        indexToCharacters[1][0],
        indexToCharacters[2][0],
    ];

    return firstThreeLetters;
};
