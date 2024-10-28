const ALPHABET_EN: string = "abcdefghijklmnopqrstuvwxyz";
/**
 * ? Note from Chat GPT:
 * The Spanish alphabet is similar to the English alphabet but includes one additional letter: "ñ". Here is the traditional Spanish alphabet in order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, ñ, o, p, q, r, s, t, u, v, w, x, y, z
 * Historically, "ch" and "ll" were also considered separate letters in the Spanish alphabet, but in 2010, the Royal Spanish Academy officially removed them as distinct letters, aligning the Spanish alphabet more closely with the standard Latin alphabet plus the "ñ".
 */
const ALPHABET_ES: string = "abcdefghijklmnñopqrstuvwxyz";
/**
 * TODO address the following note from Chat GPT:
 * The French alphabet has the exact same letters and order as the English alphabet:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * While the alphabet is the same, French uses additional accents and special characters in writing, like é, è, ê, ë and ç (cédille), but these are not considered separate letters in the French alphabet.
 */
const ALPHABET_FR: string = "abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ";
/**
 * TODO address the following note from Chat GPT:
 * The Portuguese alphabet has the same 26 letters as the English alphabet. Here is the Portuguese alphabet in order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * However, Portuguese also uses various diacritical marks (like accents) on vowels and the ç (c-cedilla), but these do not add extra letters to the alphabet.
 */
const ALPHABET_PT: string = "abcdefghijklmnopqrstuvwxyzàáâãçéêíóôõú";
/**
 * TODO address the following note from Chat GPT:
 * The German alphabet has the same 26 letters as the English alphabet. Here it is in order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * In addition to these letters, German has a few special characters:
 * The Umlauted vowels: ä, ö, ü (variants of a, o, and u with umlauts)
 * The Eszett (ß), also called the "sharp S," which is used in place of a double "s" in certain cases
 * However, ä, ö, ü, and ß are not considered separate letters of the alphabet but variations of the existing letters.
 */
const ALPHABET_DE: string = "abcdefghijklmnopqrstuvwxyzäöüß";
const ALPHABET_IT: string = "abcdefghijklmnopqrstuvwxyzàèéìíîòóùú";
const ALPHABET_RU: string = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const ALPHABET_EU: string = "abcdefghijklmnopqrstuvwxyzñ";
const ALPHABET_LV: string = "aābcčdeēfgģhiījkķlļmnņoprsštuūvzž";
const ALPHABET_NL: string = "abcdefghijklmnopqrstuvwxyz";
export enum SupportedLanguage {
	English = "English",
	Spanish = "Spanish",
	French = "French",
	Portuguese = "Portuguese",
	German = "German",
	Italian = "Italian",
	Russian = "Russian",
	Basque = "Basque",
	Latvian = "Latvian",
	Dutch = "Dutch",
}
export const supportedLanguages: {
	[K in SupportedLanguage]: {
		alphabet: string;
		code: string;
	};
} = {
	English: { alphabet: ALPHABET_EN, code: "en" },
	Spanish: { alphabet: ALPHABET_ES, code: "es" },
	French: { alphabet: ALPHABET_FR, code: "fr" },
	Portuguese: { alphabet: ALPHABET_PT, code: "pt" },
	German: { alphabet: ALPHABET_DE, code: "de" },
	Italian: { alphabet: ALPHABET_IT, code: "it" },
	Russian: { alphabet: ALPHABET_RU, code: "ru" },
	Basque: { alphabet: ALPHABET_EU, code: "eu" },
	Latvian: { alphabet: ALPHABET_LV, code: "lv" },
	Dutch: { alphabet: ALPHABET_NL, code: "nl" },
};

const findAlphabetPosition = (character: string, alphabet: string): number => {
	const lower: string = character.toLowerCase();

	return alphabet.indexOf(lower);
};

const rotateCharacter = (
	char: string,
	rot: number,
	alphabet: string
): string => {
	const alphabetPosition: number = findAlphabetPosition(char, alphabet);

	if (alphabetPosition === -1) {
		throw new Error(
			`Character ${char} is not a valid character for chosen language.`
		);
	}

	const rotatedIndex: number = (alphabetPosition + rot) % alphabet.length;

	if (char.toUpperCase() === char) {
		return alphabet[rotatedIndex].toUpperCase();
	}

	return alphabet[rotatedIndex];
};

export default (
	text: string,
	rot: number,
	alphabet: string = ALPHABET_EN
): string => {
	let rotated: string = "";

	for (const char of text) {
		if (alphabet.includes(char.toLowerCase())) {
			rotated = rotated + rotateCharacter(char, rot, alphabet);
		} else {
			rotated = rotated + char;
		}
	}

	return rotated;
};
