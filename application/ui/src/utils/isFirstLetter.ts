import { CharactersToIndex } from "../types";

export default (
    charactersToIndex: CharactersToIndex,
    character: string
): boolean => {
    return charactersToIndex[character] === 0;
};
