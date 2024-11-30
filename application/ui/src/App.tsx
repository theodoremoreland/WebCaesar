// React
import { ReactElement, useState, useEffect } from "react";

// Third party
import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";

// Custom
import { SupportedLanguage } from "./modules/rotateString";
import {
    getLocalStorageData,
    jokeErrorToastId,
    debounceSaveToLocalStorage,
} from "./App.controller";

// HTTP
import getDadJoke from "./http/getDadJoke";

// Components
import OriginalTextSection from "./components/OriginalTextSection";
import RotatedTextSection from "./components/RotatedTextSection";
import LettersDraggable from "./components/LettersDraggable";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

/**
 * [x]: Can upload text file that will be encrypted and output into text area
 * [x] Can submit for auto detection of encrypted text and decryption
 * TODO: Can rotate text area output degree by degree using a wheel
 * TODO: Need to validate alphabet / language of imported .txt file
 * [x] Can download textarea output as text file
 * [x] Initializes with encrypted dad joke, then prompts user to experiment with wheel to decrypt
 */
const App = (): ReactElement => {
    const [rot, setRot] = useState<number>(0);
    const [originalLanguage, setOriginalLanguage] = useState<SupportedLanguage>(
        SupportedLanguage.English
    );
    const [rotatedLanguage, setRotatedLanguage] = useState<SupportedLanguage>(
        SupportedLanguage.English
    );
    const [originalText, setOriginalText] = useState<string>("");
    const [rotatedText, setRotatedText] = useState<string>("");

    const {
        data: jokeData,
        error: jokeError,
        isFetching: isFetchingDadJoke,
    } = useQuery("dad-joke", getDadJoke, { retry: false });

    const isLoading: boolean = isFetchingDadJoke; // Here in case we need to add more loading states

    useEffect(() => {
        const {
            originalText,
            rotatedText,
            rot,
            originalLanguage,
            rotatedLanguage,
        } = getLocalStorageData();

        if (
            originalText &&
            rotatedText &&
            rot &&
            originalLanguage &&
            rotatedLanguage
        ) {
            setOriginalText(originalText);
            setRotatedText(rotatedText);
            setRot(parseInt(rot));
            setOriginalLanguage(originalLanguage as SupportedLanguage);
            setRotatedLanguage(rotatedLanguage as SupportedLanguage);
        } else if (jokeData?.encrypted_dad_joke) {
            setOriginalText(jokeData.encrypted_dad_joke);
            setRotatedText(jokeData.encrypted_dad_joke);
        } else if (jokeError) {
            console.error(String(jokeError));
            toast.error(String(jokeError), { toastId: jokeErrorToastId });
        }
    }, [jokeData, jokeError]);

    useEffect(() => {
        if (originalText !== "" && rotatedText !== "") {
            debounceSaveToLocalStorage(
                originalText,
                rotatedText,
                rot,
                originalLanguage,
                rotatedLanguage
            );
        }
    }, [originalText, rotatedText, rot, originalLanguage, rotatedLanguage]);

    return (
        <main>
            <div className="content">
                <OriginalTextSection
                    isOtherLoading={isLoading}
                    originalText={originalText}
                    setOriginalText={setOriginalText}
                    setRotatedText={setRotatedText}
                    rot={rot}
                    setRot={setRot}
                    originalLanguage={originalLanguage}
                    setOriginalLanguage={setOriginalLanguage}
                    rotatedLanguage={rotatedLanguage}
                    setRotatedLanguage={setRotatedLanguage}
                />
                <LettersDraggable
                    originalLanguage={originalLanguage}
                    rotatedLanguage={rotatedLanguage}
                />
                <RotatedTextSection
                    isOtherLoading={isLoading}
                    originalText={originalText}
                    rotatedText={rotatedText}
                    rot={rot}
                    setRot={setRot}
                    originalLanguage={originalLanguage}
                    rotatedLanguage={rotatedLanguage}
                    setRotatedLanguage={setRotatedLanguage}
                    setRotatedText={setRotatedText}
                />
            </div>
            <ToastContainer position="top-center" />
        </main>
    );
};

export default App;
