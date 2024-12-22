// Custom
import { languageMetadata } from "./languageMetadata";

// Types
import { SupportedLanguage } from "../types";

export const findCharacterIndex = (
    character: string,
    language: SupportedLanguage
): number => {
    const lower: string = character.toLowerCase();

    return languageMetadata[language].charactersToIndex[lower] ?? -1;
};

// TODO support mapping between languages
const rotateCharacter = (
    char: string,
    rot: number,
    language: SupportedLanguage
): string => {
    const characterIndex: number = findCharacterIndex(char, language);

    if (characterIndex === -1) {
        throw new Error(
            `Character ${char} is not a valid character for chosen language.`
        );
    }

    const rotatedIndex: number =
        (characterIndex + rot) % languageMetadata[language].characterCount;
    const rotatedCharacter: string =
        languageMetadata[language].indexToCharacters[rotatedIndex][0];

    if (char.toUpperCase() === char) {
        return rotatedCharacter.toUpperCase();
    }

    return rotatedCharacter;
};

// TODO rewrite to optionally throw if character is not in target language
export default (
    text: string,
    rot: number,
    originalLanguage: SupportedLanguage,
    rotatedLanguage: SupportedLanguage
): string => {
    let rotated: string = "";

    for (const char of text) {
        // If the character is in the target language, rotate it
        if (
            languageMetadata[rotatedLanguage].charactersToIndex[
                char.toLowerCase()
            ]
        ) {
            rotated += rotateCharacter(char, rot, rotatedLanguage);
        } else if (findCharacterIndex(char, originalLanguage) !== -1) {
            const sourceCharacterIndex: number = findCharacterIndex(
                char,
                originalLanguage
            );

            // if the character is not in the target language, but the target language has a character at the same index, use the character at the same index in the target language
            if (
                languageMetadata[rotatedLanguage].characterCount >
                sourceCharacterIndex
            ) {
                rotated +=
                    languageMetadata[rotatedLanguage].indexToCharacters[
                        sourceCharacterIndex
                    ][0];
            } else {
                rotated += char;
            }
        } else {
            rotated += char;
        }
    }

    return rotated;
};
