// Third party
import { toast } from "react-toastify";
import { debounce } from "lodash";

// Custom
import { SupportedLanguage, supportedLanguages } from "./modules/rotateString";

export const copyToastId: string = "copy-toast";
export const decryptSuccessToastId: string = "decrypt-success-toast";
export const decryptErrorToastId: string = "decrypt-error-toast";
export const jokeErrorToastId: string = "joke-error-toast";

export const getLocalStorageData = (): {
	originalText: string | null;
	rotatedText: string | null;
	rot: string | null;
	originalLanguage: string | null;
	rotatedLanguage: string | null;
} => {
	const originalText: string | null = localStorage.getItem("originalText");
	const rotatedText: string | null = localStorage.getItem("rotatedText");
	const rot: string | null = localStorage.getItem("rot");
	const originalLanguage: string | null =
		localStorage.getItem("originalLanguage");
	const rotatedLanguage: string | null =
		localStorage.getItem("rotatedLanguage");

	return {
		originalText,
		rotatedText,
		rot,
		originalLanguage,
		rotatedLanguage,
	};
};

export const setLocalStorageData = (
	originalText: string,
	rotatedText: string,
	rot: number,
	originalLanguage: SupportedLanguage,
	rotatedLanguage: SupportedLanguage
): void => {
	localStorage.setItem("originalText", originalText);
	localStorage.setItem("rotatedText", rotatedText);
	localStorage.setItem("rot", rot.toString());
	localStorage.setItem("originalLanguage", originalLanguage);
	localStorage.setItem("rotatedLanguage", rotatedLanguage);
};

export const copyToClipboard = async (text: string): Promise<void> => {
	if (text === "") {
		return;
	}

	try {
		await navigator.clipboard.writeText(text);

		toast.info("Copied to clipboard", {
			toastId: copyToastId,
			autoClose: 1_200,
		});
	} catch (err) {
		console.error("Failed to copy: ", err);
	}
};

export const debounceSaveToLocalStorage = debounce(
	(originalText, rotatedText, rot, originalLanguage, rotatedLanguage) => {
		setLocalStorageData(
			originalText,
			rotatedText,
			rot,
			originalLanguage,
			rotatedLanguage
		);
	},
	2_500
);

export const getFirstThreeLetters = (
	language: SupportedLanguage
): [string, string, string] => {
	const indexToCharacters = supportedLanguages[language].indexToCharacters;
	const firstThreeLetters: [string, string, string] = [
		indexToCharacters[0][0],
		indexToCharacters[1][0],
		indexToCharacters[2][0],
	];

	return firstThreeLetters;
};
