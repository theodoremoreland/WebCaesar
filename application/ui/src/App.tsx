// React
import { ReactElement, useState, FormEvent, useEffect } from "react";

// React Query
import { useMutation, useQuery } from "react-query";

// hooks
import getDadJoke from "./http/getDadJoke";
import encrypt from "./http/encrypt";

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
	const [text, setText] = useState<string>("");

	const { data: jokeData } = useQuery("dad-joke", getDadJoke);
	const { data: encryptData, mutate } = useMutation(encrypt);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		mutate({ text, rot });
	};

	useEffect(() => {
		if (jokeData) {
			setText(jokeData.encrypted_joke);
		}
	}, [jokeData]);

	useEffect(() => {
		if (encryptData) {
			setText(encryptData.encrypted_text);
		}
	}, [encryptData]);

	return (
		<form method="post" onSubmit={handleSubmit}>
			<label htmlFor="rot">Rotate by:</label>
			<input
				type="number"
				name="rot"
				value={rot}
				onChange={(e) => setRot(parseInt(e.target.value))}
			/>
			<p className="error"></p>
			<textarea
				name="text"
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

export default App;
