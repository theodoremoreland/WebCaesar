// React
import { ReactElement, useState } from "react";

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
	const [text, setText] = useState("");

	return (
		<>
			<form method="post">
				<label htmlFor="rot">Rotate by:</label>
				<input type="text" name="rot" value="0" />
				<p className="error"></p>
				<textarea name="text" onChange={(e) => setText(e.target.value)}>
					{text}
				</textarea>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default App;
