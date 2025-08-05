// React
import { ReactElement, useState, useEffect, useCallback } from 'react';

// Third party
import { useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';

// Custom
import rotateString from './modules/rotateString';
import { SupportedLanguage } from './types';
import {
    getLocalStorageData,
    jokeErrorToastId,
    shouldShowIntroModal,
} from './App.utils';
import useLocalStorageSave from './hooks/useLocalStorageSave';
import useHighlightColorToggle from './hooks/useHighlightColorToggle';
import useToggleFavicon from './hooks/useToggleFavicon';

// HTTP
import getDadJoke from './http/getDadJoke';

// Components
import Intro from './components/Modal/Intro/Intro';
import Loading from './components/Modal/Loading/Loading';
import OriginalTextSection from './components/TextSection/OriginalTextSection';
import RotatedTextSection from './components/TextSection/RotatedTextSection';
import LettersDraggable from './components/LettersDraggable/LettersDraggable';

// Styles
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = (): ReactElement => {
    const [isIntroModalOpen, setIsIntroModalOpen] = useState<boolean>(true);

    // App data states
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

    const isLoading: boolean = isFetchingDadJoke || isAutoRotating; // Here in case we need to add more loading states

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

    // Custom hooks
    useLocalStorageSave({
        originalText,
        rotatedText,
        rot,
        originalLanguage,
        rotatedLanguage,
    });
    useHighlightColorToggle(isRotPositive);
    useToggleFavicon(isRotPositive);

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
        handleRotate();
    }, [handleRotate]);

    return (
        <main>
            {isLoading && <Loading text="Loading" />}
            {shouldShowIntroModal() && isIntroModalOpen && !isLoading && (
                <Intro
                    handleClose={() => {
                        setIsIntroModalOpen(false);
                    }}
                />
            )}
            <div
                id="app-content"
                className={isRotPositive ? 'rot-positive' : 'rot-negative'}
            >
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
