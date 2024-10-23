const ALPHABET_EN: string = "abcdefghijklmnopqrstuvwxyz";
const ALPHABET_ES: string = "abcdefghijklmnñopqrstuvwxyz";
const ALPHABET_FR: string = "abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ";
const ALPHABET_PT: string = "abcdefghijklmnopqrstuvwxyzàáâãçéêíóôõú";
const ALPHABET_DE: string = "abcdefghijklmnopqrstuvwxyzäöüß";
const ALPHABET_IT: string = "abcdefghijklmnopqrstuvwxyzàèéìíîòóùú";
const ALPHABET_RU: string = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const ALPHABET_AR: string = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
const ALPHABET_EU: string = "abcdefghijklmnopqrstuvwxyzñ";
const ALPHABET_LV: string = "aābcčdeēfgģhiījkķlļmnņoprsštuūvzž";
const ALPHABET_NL: string = "abcdefghijklmnopqrstuvwxyz";
export const supportedLanguages: {
	[language: string]: {
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
	Arabic: { alphabet: ALPHABET_AR, code: "ar" },
	Basque: { alphabet: ALPHABET_EU, code: "eu" },
	Latvian: { alphabet: ALPHABET_LV, code: "lv" },
	Dutch: { alphabet: ALPHABET_NL, code: "nl" },
};
const alphabetSet: Set<string> = new Set(
	ALPHABET_EN +
		ALPHABET_ES +
		ALPHABET_FR +
		ALPHABET_PT +
		ALPHABET_DE +
		ALPHABET_IT +
		ALPHABET_RU +
		ALPHABET_AR +
		ALPHABET_EU +
		ALPHABET_LV +
		ALPHABET_NL
);
const combinedAlphabet: string = Array.from(alphabetSet).join("");

const isAlpha = (char: string) =>
	new RegExp(`[${combinedAlphabet + combinedAlphabet.toUpperCase()}]`).test(
		char
	);

const alphabetPosition = (character: string, alphabet: string): number => {
	const lower: string = character.toLowerCase();

	return alphabet.indexOf(lower);
};

const rotateCharacter = (
	char: string,
	rot: number,
	alphabet: string
): string => {
	const rotatedIndex: number =
		(alphabetPosition(char, alphabet) + rot) % alphabet.length;

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
		if (isAlpha(char)) {
			rotated = rotated + rotateCharacter(char, rot, alphabet);
		} else {
			rotated = rotated + char;
		}
	}

	return rotated;
};
