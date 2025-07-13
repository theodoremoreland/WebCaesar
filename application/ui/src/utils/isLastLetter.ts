import { CharactersToIndex } from '../types';

export default (
    charactersToIndex: CharactersToIndex,
    characterCount: number,
    character: string
): boolean => {
    return charactersToIndex[character] === characterCount - 1;
};
