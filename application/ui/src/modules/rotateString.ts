interface AlphabetPosition {
	[key: number]: string[];
}

const ALPHABET_EN: string = "abcdefghijklmnopqrstuvwxyz";
/**
 * ? Note from Chat GPT:
 * The Spanish alphabet is similar to the English alphabet but includes one additional letter: "ñ". Here is the traditional Spanish alphabet in order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, ñ, o, p, q, r, s, t, u, v, w, x, y, z
 * Historically, "ch" and "ll" were also considered separate letters in the Spanish alphabet, but in 2010, the Royal Spanish Academy officially removed them as distinct letters, aligning the Spanish alphabet more closely with the standard Latin alphabet plus the "ñ".
 */
const ALPHABET_ES: string = "abcdefghijklmnñopqrstuvwxyz";
const ALPHABET_FR: string = "abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ";
/**
 *
 * The French alphabet has the exact same letters and order as the English alphabet:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * While the alphabet is the same, French uses additional accents and special characters in writing, like é, è, ê, ë and ç (cédille), but these are not considered separate letters in the French alphabet.
 */
const ALPHABET_POSITIONS_FR: AlphabetPosition = {
	0: ["a", "à", "â"],
	1: ["b"],
	2: ["c", "ç"],
	3: ["d"],
	4: ["e", "é", "è", "ê", "ë"],
	5: ["f"],
	6: ["g"],
	7: ["h"],
	8: ["i", "î", "ï"],
	9: ["j"],
	10: ["k"],
	11: ["l"],
	12: ["m"],
	13: ["n"],
	14: ["o"],
	15: ["p"],
	16: ["q"],
	17: ["r"],
	18: ["s"],
	19: ["t"],
	20: ["u", "ù", "û", "ü"],
	21: ["v"],
	22: ["w"],
	23: ["x"],
	24: ["y", "ÿ"],
	25: ["z"],
};
const ALPHABET_PT: string = "abcdefghijklmnopqrstuvwxyzàáâãçéêíóôõú";
/**
 * The Portuguese alphabet has the same 26 letters as the English alphabet. Here is the Portuguese alphabet in order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * However, Portuguese also uses various diacritical marks (like accents) on vowels and the ç (c-cedilla), but these do not add extra letters to the alphabet.
 */
const ALPHABET_POSITIONS_PT: AlphabetPosition = {
	0: ["a", "à", "á", "â", "ã"],
	1: ["b"],
	2: ["c", "ç"],
	3: ["d"],
	4: ["e"],
	5: ["f"],
	6: ["g"],
	7: ["h"],
	8: ["i"],
	9: ["j"],
	10: ["k"],
	11: ["l"],
	12: ["m"],
	13: ["n"],
	14: ["o"],
	15: ["p"],
	16: ["q"],
	17: ["r"],
	18: ["s"],
	19: ["t"],
	20: ["u"],
	21: ["v"],
	22: ["w"],
	23: ["x"],
	24: ["y"],
	25: ["z"],
};

const ALPHABET_DE: string = "abcdefghijklmnopqrstuvwxyzäöüß";
/**
 * The German alphabet has the same 26 letters as the English alphabet. Here it is in order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * In addition to these letters, German has a few special characters:
 * The Umlauted vowels: ä, ö, ü (variants of a, o, and u with umlauts)
 * The Eszett (ß), also called the "sharp S," which is used in place of a double "s" in certain cases
 * However, ä, ö, ü, and ß are not considered separate letters of the alphabet but variations of the existing letters.
 */
const ALPHABET_POSITIONS_DE: AlphabetPosition = {
	0: ["a"],
	1: ["b"],
	2: ["c"],
	3: ["d"],
	4: ["e"],
	5: ["f"],
	6: ["g"],
	7: ["h"],
	8: ["i"],
	9: ["j"],
	10: ["k"],
	11: ["l"],
	12: ["m"],
	13: ["n"],
	14: ["o"],
	15: ["p"],
	16: ["q"],
	17: ["r"],
	18: ["s", "ß"],
	19: ["t"],
	20: ["u", "ü"],
	21: ["v"],
	22: ["w"],
	23: ["x"],
	24: ["y"],
	25: ["z"],
};
/**
 * TODO address the following note from Chat GPT:
 * The Italian alphabet traditionally has only 21 letters:
 * a, b, c, d, e, f, g, h, i, l, m, n, o, p, q, r, s, t, u, v, z
 * The letters j, k, w, x, and y are generally excluded from the traditional Italian alphabet because they are not native to Italian words. However, these letters do appear in borrowed foreign words, names, and scientific terms, so they are recognized and used in modern Italian when needed.
 */
const ALPHABET_IT: string = "abcdefghijklmnopqrstuvwxyzàèéìíîòóùú";
/**
 * TODO address the following note from Chat GPT:
 * The Russian alphabet uses the Cyrillic script, which has 33 letters. Here is the Russian alphabet in order:
 * А, Б, В, Г, Д, Е, Ё, Ж, З, И, Й, К, Л, М, Н, О, П, Р, С, Т, У, Ф, Х, Ц, Ч, Ш, Щ, Ъ, Ы, Ь, Э, Ю, Я
 * Some letters may look similar to those in the Latin alphabet, but they often represent different sounds. For example, "В" sounds like the English "V" and "Н" sounds like the English "N".
 */
const ALPHABET_RU: string = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
/**
 * TODO address the following note from Chat GPT:
 * The Basque alphabet uses the same 26 letters as the English alphabet, in the same order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, ñ, o, p, q, r, s, t, u, v, w, x, y, z
 * While "ñ" is not a separate letter in most Latin alphabets, it is commonly included in Basque. Additionally, Basque has some unique pronunciation rules and uses combinations like "tx," "ts," and "tz" to represent sounds that are distinct in Basque phonetics.
 */
const ALPHABET_EU: string = "abcdefghijklmnopqrstuvwxyzñ";
/**
 * TODO address the following note from Chat GPT:
 * The Latvian alphabet has 33 letters and is based on the Latin alphabet with some additional letters that include diacritical marks. Here is the Latvian alphabet in order:
 * a, ā, b, c, č, d, e, ē, f, g, ģ, h, i, ī, j, k, ķ, l, ļ, m, n, ņ, o, p, r, s, š, t, u, ū, v, z, ž
 * Notably, the letters q, w, x, and y from the English alphabet are not used in standard Latvian and appear only in foreign words or names.
 */
const ALPHABET_LV: string = "aābcčdeēfgģhiījkķlļmnņoprsštuūvzž";
/**
 * TODO address the following note from Chat GPT:
 * The Dutch alphabet has the same 26 letters as the English alphabet, in the same order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * Dutch also uses digraphs (combinations of two letters) such as "ij" and "oe" to represent specific sounds, but these are not considered separate letters in the alphabet.
 */
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
