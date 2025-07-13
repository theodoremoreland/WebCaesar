// React
import { ReactElement, useState, useEffect, useCallback } from 'react';

// Third party
import { useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';

// Custom
import rotateString from './modules/rotateString';
import togglePrimaryHighlightColor from './utils/togglePrimaryHighlightColor';
import { SupportedLanguage } from './types';
import {
    getLocalStorageData,
    jokeErrorToastId,
    debounceSaveToLocalStorage,
} from './App.controller';

// HTTP
import getDadJoke from './http/getDadJoke';

// Components
import OriginalTextSection from './components/TextSection/OriginalTextSection';
import RotatedTextSection from './components/TextSection/RotatedTextSection';
import LettersDraggable from './components/LettersDraggable/LettersDraggable';

// Styles
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = (): ReactElement => {
    const [rot, setRot] = useState<number>(0);
    const [isRotPositive, setIsRotPositive] = useState<boolean>(true);
    const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
    const [originalLanguage, setOriginalLanguage] = useState<SupportedLanguage>(
        SupportedLanguage.English
    );
    const [rotatedLanguage, setRotatedLanguage] = useState<SupportedLanguage>(
        SupportedLanguage.English
    );
    const [originalText, setOriginalText] = useState<string>('');
    const [rotatedText, setRotatedText] = useState<string>('');

    const {
        data: jokeData,
        error: jokeError,
        isFetching: isFetchingDadJoke,
    } = useQuery('dad-joke', getDadJoke, { retry: false });

    const isLoading: boolean = isFetchingDadJoke; // Here in case we need to add more loading states

    const handleRotate = useCallback((): void => {
        setRotatedText(
            rotateString(
                originalText ?? '',
                rot,
                originalLanguage,
                rotatedLanguage
            )
        );
    }, [originalText, rot, originalLanguage, rotatedLanguage]);

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
            const savedRot: number = parseInt(rot);

            if (isNaN(savedRot)) {
                console.error('Invalid rot value in local storage');
                toast.error('Invalid rot value in local storage', {
                    toastId: jokeErrorToastId,
                });

                return;
            }

            setOriginalText(originalText);
            setRotatedText(rotatedText);
            setRot(savedRot);
            setOriginalLanguage(originalLanguage as SupportedLanguage);
            setRotatedLanguage(rotatedLanguage as SupportedLanguage);

            if (savedRot < 0) {
                setIsRotPositive(false);
            }

            if (savedRot !== 0) {
                setIsAutoRotating(true);
            }
        } else if (jokeData?.encrypted_dad_joke) {
            setOriginalText(jokeData.encrypted_dad_joke);
            setRotatedText(jokeData.encrypted_dad_joke);
        } else if (jokeError) {
            console.error(String(jokeError));
            toast.error(String(jokeError), { toastId: jokeErrorToastId });
        }
    }, [jokeData, jokeError]);

    useEffect(() => {
        debounceSaveToLocalStorage(
            originalText,
            rotatedText,
            rot,
            originalLanguage,
            rotatedLanguage
        );
    }, [originalText, rotatedText, rot, originalLanguage, rotatedLanguage]);

    useEffect(() => {
        togglePrimaryHighlightColor(isRotPositive);
    }, [isRotPositive]);

    useEffect(() => {
        handleRotate();
    }, [handleRotate]);

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
                    setIsRotPositive={setIsRotPositive}
                    setIsAutoRotating={setIsAutoRotating}
                />
                <LettersDraggable
                    rot={rot}
                    setRot={setRot}
                    originalLanguage={originalLanguage}
                    rotatedLanguage={rotatedLanguage}
                    isRotPositive={isRotPositive}
                    setIsRotPositive={setIsRotPositive}
                    isAutoRotating={isAutoRotating}
                    setIsAutoRotating={setIsAutoRotating}
                />
                <RotatedTextSection
                    isOtherLoading={isLoading}
                    originalText={originalText}
                    rotatedText={rotatedText}
                    rot={rot}
                    setRot={setRot}
                    rotatedLanguage={rotatedLanguage}
                    setRotatedLanguage={setRotatedLanguage}
                />
            </div>
            <ToastContainer position="top-center" />
        </main>
    );
};

export default App;
