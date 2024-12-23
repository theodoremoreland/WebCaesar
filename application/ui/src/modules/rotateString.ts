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
// ! Need to fix bug, is not correctly rotating first letter
const rotateCharacter = (
    char: string,
    rot: number,
    language: SupportedLanguage
): string => {
    const characterIndex: number = findCharacterIndex(char, language);
    const characterCount: number = languageMetadata[language].characterCount;

    if (characterIndex === -1) {
        throw new Error(
            `Character ${char} is not a valid character for chosen language.`
        );
    }

    // This expression simulates a modulo operation that works with negative numbers. It is equivalent to (characterIndex + rot) % characterCount in Python.
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description
    const rotatedIndex: number =
        (((characterIndex + rot) % characterCount) + characterCount) %
        characterCount;
    const rotatedCharacter: string =
        languageMetadata[language].indexToCharacters[rotatedIndex][0];

    if (char.toUpperCase() === char) {
        return rotatedCharacter.toUpperCase();
    }

    return rotatedCharacter;
};

export default (
    text: string,
    rot: number,
    originalLanguage: SupportedLanguage,
    rotatedLanguage: SupportedLanguage
): string => {
    let rotated: string = "";

    for (const char of text) {
        // If the character is in the rotated language, rotate it
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

            // if the character is not in the rotated language, but the rotated language has a character at the same index, use the character at the same index in the rotated language
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
