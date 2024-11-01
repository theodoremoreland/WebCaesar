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

export interface IndexToCharacters {
	[key: number]: string[];
}

export interface CharactersToIndex {
	[key: string]: number;
}

const deriveCharactersToIndex = (indexToCharacters: IndexToCharacters) => {
	const charactersToIndex: CharactersToIndex = {};

	for (const [index, characters] of Object.entries(indexToCharacters)) {
		for (const character of characters) {
			charactersToIndex[character] = parseInt(index);
		}
	}

	return charactersToIndex;
};

const INDEX_TO_CHARACTERS_EN: IndexToCharacters = {
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
	18: ["s"],
	19: ["t"],
	20: ["u"],
	21: ["v"],
	22: ["w"],
	23: ["x"],
	24: ["y"],
	25: ["z"],
};
const CHARACTERS_TO_INDEX_EN: CharactersToIndex = deriveCharactersToIndex(
	INDEX_TO_CHARACTERS_EN
);

/**
 * The Spanish alphabet is similar to the English alphabet but includes one additional letter: "ñ". Here is the traditional Spanish alphabet in order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, ñ, o, p, q, r, s, t, u, v, w, x, y, z
 * Historically, "ch" and "ll" were also considered separate letters in the Spanish alphabet, but in 2010, the Royal Spanish Academy officially removed them as distinct letters, aligning the Spanish alphabet more closely with the standard Latin alphabet plus the "ñ".
 */
const INDEX_TO_CHARACTERS_ES: IndexToCharacters = {
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
	14: ["ñ"],
	15: ["o"],
	16: ["p"],
	17: ["q"],
	18: ["r"],
	19: ["s"],
	20: ["t"],
	21: ["u"],
	22: ["v"],
	23: ["w"],
	24: ["x"],
	25: ["y"],
	26: ["z"],
};
const CHARACTERS_TO_INDEX_ES: CharactersToIndex = deriveCharactersToIndex(
	INDEX_TO_CHARACTERS_ES
);
/**
 *
 * The French alphabet has the exact same letters and order as the English alphabet:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * While the alphabet is the same, French uses additional accents and special characters in writing, like é, è, ê, ë and ç (cédille), but these are not considered separate letters in the French alphabet.
 */
const INDEX_TO_CHARACTERS_FR: IndexToCharacters = {
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
const CHARACTERS_TO_INDEX_FR: CharactersToIndex = deriveCharactersToIndex(
	INDEX_TO_CHARACTERS_FR
);
/**
 * The Portuguese alphabet has the same 26 letters as the English alphabet. Here is the Portuguese alphabet in order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * However, Portuguese also uses various diacritical marks (like accents) on vowels and the ç (c-cedilla), but these do not add extra letters to the alphabet.
 */
const INDEX_TO_CHARACTERS_PT: IndexToCharacters = {
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
const CHARACTERS_TO_INDEX_PT: CharactersToIndex = deriveCharactersToIndex(
	INDEX_TO_CHARACTERS_PT
);
/**
 * The German alphabet has the same 26 letters as the English alphabet. Here it is in order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * In addition to these letters, German has a few special characters:
 * The Umlauted vowels: ä, ö, ü (variants of a, o, and u with umlauts)
 * The Eszett (ß), also called the "sharp S," which is used in place of a double "s" in certain cases
 * However, ä, ö, ü, and ß are not considered separate letters of the alphabet but variations of the existing letters.
 */
const INDEX_TO_CHARACTERS_DE: IndexToCharacters = {
	0: ["a", "ä"],
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
	14: ["o", "ö"],
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
const CHARACTERS_TO_INDEX_DE: CharactersToIndex = deriveCharactersToIndex(
	INDEX_TO_CHARACTERS_DE
);
/**
 * The Italian alphabet traditionally has only 21 letters:
 * a, b, c, d, e, f, g, h, i, l, m, n, o, p, q, r, s, t, u, v, z
 * The letters j, k, w, x, and y are generally excluded from the traditional Italian alphabet because they are not native to Italian words. However, these letters do appear in borrowed foreign words, names, and scientific terms, so they are recognized and used in modern Italian when needed.
 */
const INDEX_TO_CHARACTERS_IT: IndexToCharacters = {
	0: ["a"],
	1: ["b"],
	2: ["c"],
	3: ["d"],
	4: ["e", "è", "é"],
	5: ["f"],
	6: ["g"],
	7: ["h"],
	8: ["i", "ì", "í", "î"],
	9: ["l"],
	10: ["m"],
	11: ["n"],
	12: ["o", "ò", "ó"],
	13: ["p"],
	14: ["q"],
	15: ["r"],
	16: ["s"],
	17: ["t"],
	18: ["u", "ù", "ú"],
	19: ["v"],
	20: ["z"],
};
const CHARACTERS_TO_INDEX_IT: CharactersToIndex = deriveCharactersToIndex(
	INDEX_TO_CHARACTERS_IT
);
/**
 * The Russian alphabet uses the Cyrillic script, which has 33 letters. Here is the Russian alphabet in order:
 * А, Б, В, Г, Д, Е, Ё, Ж, З, И, Й, К, Л, М, Н, О, П, Р, С, Т, У, Ф, Х, Ц, Ч, Ш, Щ, Ъ, Ы, Ь, Э, Ю, Я
 * Some letters may look similar to those in the Latin alphabet, but they often represent different sounds. For example, "В" sounds like the English "V" and "Н" sounds like the English "N".
 */
const INDEX_TO_CHARACTERS_RU: IndexToCharacters = {
	0: ["а"],
	1: ["б"],
	2: ["в"],
	3: ["г"],
	4: ["д"],
	5: ["е", "ё"],
	6: ["ж"],
	7: ["з"],
	8: ["и"],
	9: ["й"],
	10: ["к"],
	11: ["л"],
	12: ["м"],
	13: ["н"],
	14: ["о"],
	15: ["п"],
	16: ["р"],
	17: ["с"],
	18: ["т"],
	19: ["у"],
	20: ["ф"],
	21: ["х"],
	22: ["ц"],
	23: ["ч"],
	24: ["ш"],
	25: ["щ"],
	26: ["ъ"],
	27: ["ы"],
	28: ["ь"],
	29: ["э"],
	30: ["ю"],
	31: ["я"],
};
const CHARACTERS_TO_INDEX_RU: CharactersToIndex = deriveCharactersToIndex(
	INDEX_TO_CHARACTERS_RU
);
/**
 * The Basque alphabet uses the same 26 letters as the English alphabet, in the same order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, ñ, o, p, q, r, s, t, u, v, w, x, y, z
 * While "ñ" is not a separate letter in most Latin alphabets, it is commonly included in Basque. Additionally, Basque has some unique pronunciation rules and uses combinations like "tx," "ts," and "tz" to represent sounds that are distinct in Basque phonetics.
 */
const INDEX_TO_CHARACTERS_EU: IndexToCharacters = {
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
	13: ["n", "ñ"],
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
const CHARACTERS_TO_INDEX_EU: CharactersToIndex = deriveCharactersToIndex(
	INDEX_TO_CHARACTERS_EU
);
/**
 * The Latvian alphabet has 33 letters and is based on the Latin alphabet with some additional letters that include diacritical marks. Here is the Latvian alphabet in order:
 * a, ā, b, c, č, d, e, ē, f, g, ģ, h, i, ī, j, k, ķ, l, ļ, m, n, ņ, o, p, r, s, š, t, u, ū, v, z, ž
 * Notably, the letters q, w, x, and y from the English alphabet are not used in standard Latvian and appear only in foreign words or names.
 */
const INDEX_TO_CHARACTERS_LV: IndexToCharacters = {
	0: ["a"],
	1: ["ā"],
	2: ["b"],
	3: ["c", "č"],
	4: ["d"],
	5: ["e"],
	6: ["ē"],
	7: ["f"],
	8: ["g"],
	9: ["ģ"],
	10: ["h"],
	11: ["i"],
	12: ["ī"],
	13: ["j"],
	14: ["k"],
	15: ["ķ"],
	16: ["l"],
	17: ["ļ"],
	18: ["m"],
	19: ["n"],
	20: ["ņ"],
	21: ["o"],
	22: ["p"],
	23: ["r"],
	24: ["s"],
	25: ["š"],
	26: ["t"],
	27: ["u"],
	28: ["ū"],
	29: ["v"],
	30: ["z"],
	31: ["ž"],
};
const CHARACTERS_TO_INDEX_LV: CharactersToIndex = deriveCharactersToIndex(
	INDEX_TO_CHARACTERS_LV
);
/**
 * The Dutch alphabet has the same 26 letters as the English alphabet, in the same order:
 * a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
 * Dutch also uses digraphs (combinations of two letters) such as "ij" and "oe" to represent specific sounds, but these are not considered separate letters in the alphabet.
 */
const INDEX_TO_CHARACTERS_NL: IndexToCharacters = {
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
	18: ["s"],
	19: ["t"],
	20: ["u"],
	21: ["v"],
	22: ["w"],
	23: ["x"],
	24: ["y"],
	25: ["z"],
};
const CHARACTERS_TO_INDEX_NL: CharactersToIndex = deriveCharactersToIndex(
	INDEX_TO_CHARACTERS_NL
);

export const supportedLanguages: {
	[K in SupportedLanguage]: {
		characterCount: number;
		charactersToIndex: CharactersToIndex;
		indexToCharacters: IndexToCharacters;
		code: string;
	};
} = {
	English: {
		characterCount: Object.keys(INDEX_TO_CHARACTERS_EN).length,
		charactersToIndex: CHARACTERS_TO_INDEX_EN,
		indexToCharacters: INDEX_TO_CHARACTERS_EN,
		code: "en",
	},
	Spanish: {
		characterCount: Object.keys(INDEX_TO_CHARACTERS_ES).length,
		charactersToIndex: CHARACTERS_TO_INDEX_ES,
		indexToCharacters: INDEX_TO_CHARACTERS_ES,
		code: "es",
	},
	French: {
		characterCount: Object.keys(INDEX_TO_CHARACTERS_FR).length,
		charactersToIndex: CHARACTERS_TO_INDEX_FR,
		indexToCharacters: INDEX_TO_CHARACTERS_FR,
		code: "fr",
	},
	Portuguese: {
		characterCount: Object.keys(INDEX_TO_CHARACTERS_PT).length,
		charactersToIndex: CHARACTERS_TO_INDEX_PT,
		indexToCharacters: INDEX_TO_CHARACTERS_PT,
		code: "pt",
	},
	German: {
		characterCount: Object.keys(INDEX_TO_CHARACTERS_DE).length,
		charactersToIndex: CHARACTERS_TO_INDEX_DE,
		indexToCharacters: INDEX_TO_CHARACTERS_DE,
		code: "de",
	},
	Italian: {
		characterCount: Object.keys(INDEX_TO_CHARACTERS_IT).length,
		charactersToIndex: CHARACTERS_TO_INDEX_IT,
		indexToCharacters: INDEX_TO_CHARACTERS_IT,
		code: "it",
	},
	Russian: {
		characterCount: Object.keys(INDEX_TO_CHARACTERS_RU).length,
		charactersToIndex: CHARACTERS_TO_INDEX_RU,
		indexToCharacters: INDEX_TO_CHARACTERS_RU,
		code: "ru",
	},
	Basque: {
		characterCount: Object.keys(INDEX_TO_CHARACTERS_EU).length,
		charactersToIndex: CHARACTERS_TO_INDEX_EU,
		indexToCharacters: INDEX_TO_CHARACTERS_EU,
		code: "eu",
	},
	Latvian: {
		characterCount: Object.keys(INDEX_TO_CHARACTERS_LV).length,
		charactersToIndex: CHARACTERS_TO_INDEX_LV,
		indexToCharacters: INDEX_TO_CHARACTERS_LV,
		code: "lv",
	},
	Dutch: {
		characterCount: Object.keys(INDEX_TO_CHARACTERS_NL).length,
		charactersToIndex: CHARACTERS_TO_INDEX_NL,
		indexToCharacters: INDEX_TO_CHARACTERS_NL,
		code: "nl",
	},
};

const findCharacterIndex = (
	character: string,
	language: SupportedLanguage
): number => {
	const lower: string = character.toLowerCase();

	return supportedLanguages[language].charactersToIndex[lower] ?? -1;
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
		(characterIndex + rot) % supportedLanguages[language].characterCount;
	const rotatedCharacter: string =
		supportedLanguages[language].indexToCharacters[rotatedIndex][0];

	if (char.toUpperCase() === char) {
		return rotatedCharacter.toUpperCase();
	}

	return rotatedCharacter;
};

export default (
	text: string,
	rot: number,
	sourceLanguage: SupportedLanguage = SupportedLanguage.English,
	targetLanguage: SupportedLanguage = SupportedLanguage.English
): string => {
	let rotated: string = "";

	for (const char of text) {
		// If the character is in the target language, rotate it
		if (
			supportedLanguages[targetLanguage].charactersToIndex[char.toLowerCase()]
		) {
			rotated = rotated + rotateCharacter(char, rot, targetLanguage);
		} else if (findCharacterIndex(char, sourceLanguage) === -1) {
			const sourceCharacterIndex: number = findCharacterIndex(
				char,
				sourceLanguage
			);

			// if the character is not in the target language, but the target language has a character at the same index, use the character at the same index in the target language
			if (
				supportedLanguages[targetLanguage].characterCount > sourceCharacterIndex
			) {
				rotated +=
					supportedLanguages[targetLanguage].indexToCharacters[
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
