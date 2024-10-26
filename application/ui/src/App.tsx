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

const copyToastId: string = "copy-toast";
const decryptSuccessToastId: string = "decrypt-success-toast";
const decryptErrorToastId: string = "decrypt-error-toast";
const jokeErrorToastId: string = "joke-error-toast";

const copyToClipboard = async (text: string): Promise<void> => {
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
		setRotatedText(
			rotateString(
				originalText ?? "",
				_rot,
				supportedLanguages[selectedLanguage].alphabet
			)
		);
	};

	const handleChangeOriginalText = (
		e: ChangeEvent<HTMLTextAreaElement>
	): void => {
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

	// const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>): void => {
	// 	e.preventDefault();

	// 	const _selectedLanguage: SupportedLanguage = e.currentTarget
	// 		.value as SupportedLanguage;
	// 	let _rot: number = rot;

	// 	if (rot > supportedLanguages[_selectedLanguage].alphabet.length - 1) {
	// 		_rot = supportedLanguages[_selectedLanguage].alphabet.length - 1;
	// 	}

	// 	setSelectedLanguage(_selectedLanguage);
	// 	setRot(_rot);
	// 	setRotatedText(
	// 		rotateString(
	// 			originalText ?? "",
	// 			_rot,
	// 			supportedLanguages[_selectedLanguage].alphabet
	// 		)
	// 	);
	// };

	const handleDecrypt = (): void => {
		if (originalText) {
			decryptMutate({ text: originalText });
		}
	};

	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = e.target.files?.[0];

		if (file) {
			const reader: FileReader = new FileReader();

			reader.onload = (e: ProgressEvent<FileReader>) => {
				const text: string | ArrayBuffer | null | undefined =
					e.target?.result;

				if (typeof text !== "string") {
					return;
				}

				setOriginalText(text);
				setRotatedText(
					rotateString(
						text ?? "",
						rot,
						supportedLanguages[selectedLanguage].alphabet
					)
				);
			};

			reader.readAsText(file);
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

			toast.success(
				`Detected ${decryptData.language} with ${Math.ceil(
					decryptData.percentage
				)}% confidence.`,
				{
					toastId: decryptSuccessToastId,
				}
			);
		}
	}, [decryptData]);

	useEffect(() => {
		if (jokeError) {
			console.error(String(jokeError));
			toast.error(String(jokeError), { toastId: jokeErrorToastId });
		}

		if (decryptError) {
			console.error(String(decryptError));
			toast.error(String(decryptError), { toastId: decryptErrorToastId });
		}
	}, [jokeError, decryptError]);

	return (
		<main>
			<div className="content">
				<section
					id="original-textarea-section"
					className="textarea-section"
				>
					<label htmlFor="original-text">Original text</label>
					<div className="textarea-container">
						<textarea
							id="original-text"
							name="original-text"
							onChange={handleChangeOriginalText}
							value={originalText}
							spellCheck="false"
							disabled={isDecryptLoading}
							maxLength={30_000}
						/>
						<div className="pills"></div>
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
								title="Upload text file."
								type="file"
								accept=".txt"
								onChange={handleFileUpload}
							/>
						</button>
						<button
							id="decrypt"
							type="button"
							title="Attempt to automatically decrypt text."
							onClick={handleDecrypt}
							disabled={isDecryptLoading}
						>
							<RotateAutoIcon className="icon" />
							<span>Auto rotate</span>
						</button>
					</div>
				</section>
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
				</div>
				<section
					id="rotated-textarea-section"
					className="textarea-section"
				>
					<label htmlFor="rotated-text">Rotated text</label>
					<div className="textarea-container">
						<textarea
							id="rotated-text"
							name="rotated-text"
							spellCheck="false"
							title="Click to copy"
							readOnly
							value={rotatedText}
							disabled={isDecryptLoading}
							onClick={() => copyToClipboard(rotatedText)}
						/>
						<div className="pills">
							<div className="pill-wrapper">
								<button
									type="button"
									className="pill rot"
									onClick={() => {
										setIsRotPopoverOpen(!isRotPopoverOpen);
										setIsLanguageDropdownOpen(false);
									}}
									disabled={isDecryptLoading}
								>
									rot{rot}
								</button>
								{isRotPopoverOpen && (
									<input
										type="number"
										className="popover"
										name="rot"
										value={rot}
										autoComplete="off"
										onChange={handleRotate}
										min={0}
										max={
											supportedLanguages[selectedLanguage]
												.alphabet.length - 1
										}
										disabled={isDecryptLoading}
									/>
								)}
							</div>
							<div className="pill-wrapper">
								<button
									type="button"
									className="pill selected-language"
									onClick={() => {
										setIsLanguageDropdownOpen(
											!isLanguageDropdownOpen
										);
										setIsRotPopoverOpen(false);
									}}
								>
									{selectedLanguage}
								</button>
								{isLanguageDropdownOpen && (
									<ul className="pill-list">
										{Object.keys(supportedLanguages).map(
											(language) => (
												<li
													key={language}
													onClick={() => {
														setSelectedLanguage(
															language as SupportedLanguage
														);
														setRotatedText(
															rotateString(
																originalText ??
																	"",
																rot,
																supportedLanguages[
																	language as SupportedLanguage
																].alphabet
															)
														);
														setIsLanguageDropdownOpen(
															false
														);
													}}
												>
													{language}
												</li>
											)
										)}
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
								title="Download rotated text."
								disabled={isDecryptLoading}
							>
								<DownloadIcon className="icon" />{" "}
								<span>Download result</span>
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
