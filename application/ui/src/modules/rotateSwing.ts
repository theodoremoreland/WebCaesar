const ALPHABET: string = "abcdefghijklmnopqrstuvwxyz";
const isAlpha = (char: string) => /[A-z]/.test(char);

const alphabetPosition = (character: string): number => {
    const lower = character.toLowerCase();

    return ALPHABET.indexOf(lower);
}


const rotateCharacter = (char: string, rot: number): string => {
    const rotatedIndex: number = (alphabetPosition(char) + rot) % 26;

    if (char.toUpperCase() === char) {
        return ALPHABET[rotatedIndex].toUpperCase();
    } 
    
    return ALPHABET[rotatedIndex];
}


export default (text: string, rot: number): string => {
    let rotated: string = "";

    for (const char of text) {
        if (isAlpha(char)) {
            rotated = rotated + rotateCharacter(char, rot);
        } else {
            rotated = rotated + char;
        }
    }

    return rotated
}