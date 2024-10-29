// Third party
import { toast } from "react-toastify";
import { debounce } from "lodash";

// Custom
import { SupportedLanguage } from "./modules/rotateString";

export const copyToastId: string = "copy-toast";
export const decryptSuccessToastId: string = "decrypt-success-toast";
export const decryptErrorToastId: string = "decrypt-error-toast";
export const jokeErrorToastId: string = "joke-error-toast";

export const getLocalStorageData = (): {
	originalText: string | null;
	rotatedText: string | null;
	rot: string | null;
	selectedLanguage: string | null;
} => {
	const originalText: string | null = localStorage.getItem("originalText");
	const rotatedText: string | null = localStorage.getItem("rotatedText");
	const rot: string | null = localStorage.getItem("rot");
	const selectedLanguage: string | null =
		localStorage.getItem("selectedLanguage");

	return {
		originalText,
		rotatedText,
		rot,
		selectedLanguage,
	};
};

export const setLocalStorageData = (
	originalText: string,
	rotatedText: string,
	rot: number,
	selectedLanguage: SupportedLanguage
): void => {
	localStorage.setItem("originalText", originalText);
	localStorage.setItem("rotatedText", rotatedText);
	localStorage.setItem("rot", rot.toString());
	localStorage.setItem("selectedLanguage", selectedLanguage);
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
	(originalText, rotatedText, rot, selectedLanguage) => {
		setLocalStorageData(originalText, rotatedText, rot, selectedLanguage);
	},
	3_500
);
