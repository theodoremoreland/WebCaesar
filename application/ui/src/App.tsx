// React
import { ReactElement, useState, useEffect, ChangeEvent } from "react";

// React Query
import { useMutation, useQuery } from "react-query";

// Custom
import rotateString from "./modules/rotateString";

// HTTP
import getDadJoke from "./http/getDadJoke";
import decrypt from "./http/decrypt";

// Styles
import "./App.css";

/**
 * Can upload text file that will be encrypted and output into text area
 * Can submit for auto detection of encrypted text and decryption
 * Can rotate text area output degree by degree using a wheel
 * Can download textarea output as text file
 * Initializes with encrypted dad joke, then prompts user to experiment with wheel to decrypt
 */
const App = (): ReactElement => {
	const [rot, setRot] = useState<number>(0);
	const [originalText, setOriginalText] = useState<string>("");
	const [rotatedText, setRotatedText] = useState<string>("");

	const { data: jokeData } = useQuery("dad-joke", getDadJoke);
	const {
		data: decryptData,
		mutate: decryptMutate,
		// isLoading: isDecryptLoading,
	} = useMutation(decrypt);

	const handleRotate = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const _rot: number = parseInt(e.currentTarget.value);

		setRot(_rot);
		setRotatedText(rotateString(originalText ?? "", _rot));
	};

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();

		setOriginalText(e.currentTarget.value);
		setRotatedText("");
	};

	const handleDecrypt = () => {
		if (originalText) {
			decryptMutate({ text: originalText });
		}
	};

	useEffect(() => {
		if (jokeData) {
			setOriginalText(jokeData.encrypted_dad_joke);
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
			<div className="buttons">
				<button id="decrypt" type="button" onClick={handleDecrypt}>
					Decrypt
				</button>
			</div>
			<div className="content">
				<textarea
					name="original_text"
					onChange={handleChange}
					value={originalText}
				/>
				<div className="rot-container">
					<label htmlFor="rot">Rotate by</label>
					<input
						type="number"
						name="rot"
						value={rot}
						onChange={handleRotate}
					/>
				</div>
				<textarea name="rotated_text" readOnly value={rotatedText} />
			</div>
		</main>
	);
};

export default App;
