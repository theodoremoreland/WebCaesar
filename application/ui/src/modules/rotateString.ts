// Custom
import { languageMetadata } from "../constants/languageMetadata";

// Types
import { SupportedLanguage } from "../types";

export const findCharacterIndex = (
    character: string,
    language: SupportedLanguage
): number => {
    const lower: string = character.toLowerCase();

    return languageMetadata[language].charactersToIndex[lower] ?? -1;
};

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
            ] !== undefined
        ) {
            rotated += rotateCharacter(char, rot, rotatedLanguage);
        } else if (findCharacterIndex(char, originalLanguage) !== -1) {
            const sourceCharacterIndex: number = findCharacterIndex(
                char,
                originalLanguage
            );

            // if the character is only in the original language, find the character of the same index in the rotated language then rotate the corresponding character
            if (
                languageMetadata[rotatedLanguage].characterCount >
                sourceCharacterIndex
            ) {
                const correspondingCharacterInRotatedLanguage: string =
                    languageMetadata[rotatedLanguage].indexToCharacters[
                        sourceCharacterIndex
                    ][0];

                rotated += rotateCharacter(
                    correspondingCharacterInRotatedLanguage,
                    rot,
                    rotatedLanguage
                );
            } else {
                // Else don't rotate the character
                rotated += char;
            }
        } else {
            rotated += char;
        }
    }

    return rotated;
};
