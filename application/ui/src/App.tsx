// React
import { ReactElement, useState, useEffect, ChangeEvent } from "react";

// React Query
import { useMutation, useQuery } from "react-query";

// Toastify
import { ToastContainer, toast } from "react-toastify";

// Custom
import rotateString, {
	SupportedLanguage,
	supportedLanguages,
} from "./modules/rotateString";
import {
	copyToClipboard,
	getLocalStorageData,
	decryptErrorToastId,
	decryptSuccessToastId,
	jokeErrorToastId,
	debounceSaveToLocalStorage,
	getFirstThreeLetters,
} from "./App.controller";

// HTTP
import getDadJoke from "./http/getDadJoke";
import decrypt from "./http/decrypt";

// Images
import UploadIcon from "./assets/images/upload_file.svg?react";
import DownloadIcon from "./assets/images/download.svg?react";
import RotateAutoIcon from "./assets/images/rotate_auto.svg?react";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

/**
 * [x]: Can upload text file that will be encrypted and output into text area
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
	const [isRotPopoverOpen, setIsRotPopoverOpen] = useState<boolean>(false);
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] =
		useState<boolean>(false);

	const { data: jokeData, error: jokeError } = useQuery(
		"dad-joke",
		getDadJoke,
		{ retry: false }
	);
	const {
		data: decryptData,
		mutate: decryptMutate,
		isLoading: isDecryptLoading,
		error: decryptError,
	} = useMutation(decrypt, { retry: false });

	const handleRotate = (e: ChangeEvent<HTMLInputElement>): void => {
		e.preventDefault();

		const _rot: number = parseInt(e.currentTarget.value);

		setRot(_rot);
		setRotatedText(rotateString(originalText ?? "", _rot, selectedLanguage));
	};

	const handleChangeOriginalText = (
		e: ChangeEvent<HTMLTextAreaElement>
	): void => {
		e.preventDefault();
		const _originalText: string = e.currentTarget.value;

		setOriginalText(_originalText);
		setRotatedText(rotateString(_originalText ?? "", rot, selectedLanguage));
	};

	const handleChangeLanguage = (language: SupportedLanguage): void => {
		const alphabetLength: number = supportedLanguages[language].characterCount;
		const isRotGreaterThanOrEqualToAlphabetLength: boolean =
			rot >= alphabetLength;
		const _rot: number = isRotGreaterThanOrEqualToAlphabetLength
			? alphabetLength - 1
			: rot;

		setRot(_rot);
		setSelectedLanguage(language);
		setRotatedText(rotateString(originalText ?? "", _rot, language));
		setIsLanguageDropdownOpen(false);
	};

	const handleDecrypt = (): void => {
		if (originalText) {
			decryptMutate({ text: originalText });
		}
	};

	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
		const file: File | undefined = e.target.files?.[0];

		if (file) {
			const reader: FileReader = new FileReader();

			reader.onload = (e: ProgressEvent<FileReader>) => {
				const text: string | ArrayBuffer | null | undefined = e.target?.result;

				if (typeof text !== "string") {
					return;
				}

				setOriginalText(text);
				setRotatedText(rotateString(text ?? "", rot, selectedLanguage));
			};

			reader.readAsText(file);
		}
	};

	useEffect(() => {
		const { originalText, rotatedText, rot, selectedLanguage } =
			getLocalStorageData();

		if (originalText && rotatedText && rot && selectedLanguage) {
			setOriginalText(originalText);
			setRotatedText(rotatedText);
			setRot(parseInt(rot));
			setSelectedLanguage(selectedLanguage as SupportedLanguage);
		} else if (jokeData) {
			setOriginalText(jokeData.encrypted_dad_joke);
			setRotatedText(rotateString(jokeData.encrypted_dad_joke, 0));
			setRot(0);
		} else if (jokeError) {
			console.error(String(jokeError));
			toast.error(String(jokeError), { toastId: jokeErrorToastId });
		}
	}, [jokeData, jokeError]);

	useEffect(() => {
		if (decryptData) {
			setRot(decryptData.rot);
			setRotatedText(decryptData.result);

			toast.success(
				`Detected ${decryptData.language} with ${Math.ceil(
					decryptData.percentage
				)}% confidence.`,
				{
					toastId: decryptSuccessToastId,
				}
			);
		} else if (decryptError) {
			console.error(String(decryptError));
			toast.error(String(decryptError), {
				toastId: decryptErrorToastId,
			});
		}
	}, [decryptData, decryptError]);

	useEffect(() => {
		if (originalText !== "" && rotatedText !== "") {
			debounceSaveToLocalStorage(
				originalText,
				rotatedText,
				rot,
				selectedLanguage
			);
		}
	}, [originalText, rotatedText, rot, selectedLanguage]);

	return (
		<main>
			<div className="content">
				<section id="original-textarea-section" className="textarea-section">
					<label htmlFor="original-text">Original text</label>
					<div className="textarea-container">
						<textarea
							id="original-text"
							name="original-text"
							placeholder="Enter text here..."
							onChange={handleChangeOriginalText}
							value={originalText}
							spellCheck="false"
							disabled={isDecryptLoading}
							maxLength={30_000}
						/>
						<div className="pills">
							<button
								type="button"
								title={
									originalText === "" ? "No text to clear" : "Clear text area"
								}
								className="pill"
								onClick={() => {
									setOriginalText("");
									setRotatedText("");
									setRot(0);
									setSelectedLanguage(SupportedLanguage.English);

									localStorage.clear();
								}}
								disabled={originalText === "" || isDecryptLoading}
							>
								Clear
							</button>
						</div>
					</div>
					<hr />
					<div className="buttons">
						<button
							id="upload"
							type="button"
							title="Upload text file."
							disabled={isDecryptLoading}
						>
							<UploadIcon className="icon" />
							<span>Upload text file</span>
							<input
								className="hidden"
								title="Upload .txt file"
								type="file"
								accept=".txt"
								onChange={handleFileUpload}
							/>
						</button>
						<button
							id="decrypt"
							type="button"
							title={
								originalText === "" || isDecryptLoading
									? "No text to rotate"
									: "Attempt to automatically decrypt text"
							}
							onClick={handleDecrypt}
							disabled={originalText === "" || isDecryptLoading}
						>
							<RotateAutoIcon className="icon" />
							<span>Auto rotate</span>
						</button>
					</div>
				</section>
				<div className="rot-wheel-container"></div>
				<section id="rotated-textarea-section" className="textarea-section">
					<label htmlFor="rotated-text">Rotated text</label>
					<div className="textarea-container">
						<textarea
							id="rotated-text"
							name="rotated-text"
							placeholder="Rotated text will appear here..."
							spellCheck="false"
							title={rotatedText === "" ? undefined : "Click to copy"}
							readOnly
							value={rotatedText}
							disabled={isDecryptLoading}
							onClick={() => copyToClipboard(rotatedText)}
						/>
						<div className="pills">
							<div className="pill-wrapper">
								<button
									title={
										originalText === "" || isDecryptLoading
											? "No text to rotate"
											: "Rotate text by a certain degree"
									}
									type="button"
									className={`pill ${isRotPopoverOpen ? "open" : ""}`}
									onClick={() => {
										setIsRotPopoverOpen(!isRotPopoverOpen);
										setIsLanguageDropdownOpen(false);
									}}
									disabled={originalText === "" || isDecryptLoading}
								>
									rot{rot}
								</button>
								{isRotPopoverOpen && (
									<input
										title="Rotate text by a certain degree"
										type="number"
										className="popover"
										name="rot"
										value={rot}
										autoComplete="off"
										onChange={handleRotate}
										min={0}
										max={
											supportedLanguages[selectedLanguage].characterCount - 1
										}
										disabled={originalText === "" || isDecryptLoading}
									/>
								)}
							</div>
							<div className="pill-wrapper">
								<button
									title={
										originalText === "" || isDecryptLoading
											? "Must write text before changing language"
											: "Change language"
									}
									type="button"
									className={`pill ${isLanguageDropdownOpen ? "open" : ""}`}
									onClick={() => {
										setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
										setIsRotPopoverOpen(false);
									}}
									disabled={originalText === "" || isDecryptLoading}
								>
									{getFirstThreeLetters(selectedLanguage)} ({selectedLanguage})
								</button>
								{isLanguageDropdownOpen && (
									<ul className="pill-list">
										{Object.keys(supportedLanguages).map((language) => (
											<li
												key={language}
												onClick={() =>
													handleChangeLanguage(language as SupportedLanguage)
												}
											>
												{language}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					</div>
					<hr />
					<div className="buttons">
						<a
							href={`data:text/plain;charset=utf-8,${encodeURIComponent(
								rotatedText
							)}`}
							download="rotated_text.txt"
						>
							<button
								id="download"
								type="button"
								title={
									rotatedText === "" || isDecryptLoading
										? "No text to download"
										: "Download rotated text"
								}
								disabled={rotatedText === "" || isDecryptLoading}
							>
								<DownloadIcon className="icon" /> <span>Download result</span>
							</button>
						</a>
					</div>
				</section>
			</div>
			<ToastContainer />
		</main>
	);
};

export default App;
