// React
import { ReactElement, useState, useEffect, ChangeEvent } from "react";

// React Query
import { useMutation, useQuery } from "react-query";

// Custom
import rotateString, {
	SupportedLanguage,
	supportedLanguages,
} from "./modules/rotateString";

// HTTP
import getDadJoke from "./http/getDadJoke";
import decrypt from "./http/decrypt";

// Images
import AttachAddIcon from "./assets/images/attach_file_add.svg?react";
import DownloadIcon from "./assets/images/download.svg?react";
import RotateAutoIcon from "./assets/images/rotate_auto.svg?react";

// Styles
import "./App.css";

const copyToClipboard = async (text: string): Promise<void> => {
	try {
		await navigator.clipboard.writeText(text);

		alert("Copied to clipboard!");
	} catch (err) {
		console.error("Failed to copy: ", err);
	}
};

/**
 * TODO: Can upload text file that will be encrypted and output into text area
 * [x] Can submit for auto detection of encrypted text and decryption
 * TODO: Can rotate text area output degree by degree using a wheel
 * [x] Can download textarea output as text file
 * [x] Initializes with encrypted dad joke, then prompts user to experiment with wheel to decrypt
 */
const App = (): ReactElement => {
	const [rot, setRot] = useState<number>(0);
	const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
		SupportedLanguage.English
	);
	const [originalText, setOriginalText] = useState<string>("");
	const [rotatedText, setRotatedText] = useState<string>("");

	const { data: jokeData } = useQuery("dad-joke", getDadJoke);
	const {
		data: decryptData,
		mutate: decryptMutate,
		isLoading: isDecryptLoading,
	} = useMutation(decrypt);

	const handleRotate = (e: ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault();

		const _rot: number = parseInt(e.currentTarget.value);

		setRot(_rot);
		setRotatedText(
			rotateString(
				originalText ?? "",
				_rot,
				supportedLanguages[selectedLanguage].alphabet
			)
		);
	};

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		e.preventDefault();
		const _originalText: string = e.currentTarget.value;

		setOriginalText(_originalText);
		setRotatedText(
			rotateString(
				_originalText ?? "",
				rot,
				supportedLanguages[selectedLanguage].alphabet
			)
		);
	};

	const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>): void => {
		e.preventDefault();
		const _selectedLanguage: SupportedLanguage = e.currentTarget
			.value as SupportedLanguage;
		let _rot: number = rot;

		if (rot > supportedLanguages[_selectedLanguage].alphabet.length - 1) {
			_rot = supportedLanguages[_selectedLanguage].alphabet.length - 1;
		}

		setSelectedLanguage(_selectedLanguage);
		setRot(_rot);
		setRotatedText(
			rotateString(
				originalText ?? "",
				_rot,
				supportedLanguages[_selectedLanguage].alphabet
			)
		);
	};

	const handleDecrypt = (): void => {
		if (originalText) {
			decryptMutate({ text: originalText });
		}
	};

	useEffect(() => {
		if (jokeData) {
			setOriginalText(jokeData.encrypted_dad_joke);
			setRotatedText(rotateString(jokeData.encrypted_dad_joke, 0));
			setRot(0);
		}
	}, [jokeData]);

	useEffect(() => {
		if (decryptData) {
			setRot(decryptData.rot);
			setRotatedText(decryptData.result);
		}
	}, [decryptData]);

	return (
		<main>
			<div className="content">
				<div className="textarea-container">
					<label htmlFor="original-text">Original text</label>
					<textarea
						id="original-text"
						name="original-text"
						onChange={handleChange}
						value={originalText}
						spellCheck="false"
						disabled={isDecryptLoading}
					/>
					<hr />
					<div className="buttons">
						<button
							id="upload"
							type="button"
							title="Upload text file."
							disabled={isDecryptLoading}
						>
							<AttachAddIcon className="icon" />
							Attach .txt file
						</button>
						<button
							id="decrypt"
							type="button"
							title="Attempt to auto decrypt text."
							onClick={handleDecrypt}
							disabled={isDecryptLoading}
						>
							<RotateAutoIcon className="icon" /> Auto decrypt
						</button>
					</div>
				</div>
				<div className="rot-container">
					<label htmlFor="rot">Rotate by</label>
					<input
						type="number"
						name="rot"
						value={rot}
						autoComplete="off"
						onChange={handleRotate}
						min={0}
						max={
							supportedLanguages[selectedLanguage].alphabet
								.length - 1
						}
						disabled={isDecryptLoading}
					/>
					<label htmlFor="supported-languages">Language</label>
					<select
						id="supported-languages"
						name="supported-languages"
						disabled={isDecryptLoading}
						value={selectedLanguage}
						onChange={handleChangeLanguage}
					>
						{Object.keys(supportedLanguages).map((language) => (
							<option key={language} value={language}>
								{language}
							</option>
						))}
					</select>
				</div>
				<div className="textarea-container">
					<label htmlFor="rotated-text">Rotated text</label>
					<textarea
						id="rotated-text"
						name="rotated-text"
						spellCheck="false"
						readOnly
						value={rotatedText}
						disabled={isDecryptLoading}
						onClick={() => copyToClipboard(rotatedText)}
					/>
					<hr />
					<div className="buttons">
						<a
							href={`data:text/plain;charset=utf-8,${encodeURIComponent(
								rotatedText
							)}`}
							download="decrypted.txt"
						>
							<button
								id="download"
								type="button"
								title="Download rotated text."
							>
								<DownloadIcon className="icon" /> Download
								result
							</button>
						</a>
					</div>
				</div>
			</div>
		</main>
	);
};

export default App;
