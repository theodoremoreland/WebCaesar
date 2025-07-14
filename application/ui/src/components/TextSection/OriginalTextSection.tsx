// React
import { ReactElement, ChangeEvent, useEffect, useState } from 'react';

// Third party
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

// Custom
import decrypt from '../../http/decrypt';
import { languageMetadata } from '../../constants/languageMetadata';
import rotateString from '../../modules/rotateString';
import {
    decryptErrorToastId,
    decryptSuccessToastId,
} from './TextSection.controller';

// Components
import Loading from '../Modal/Loading/Loading';

// Utils
import { getFirstThreeLetters } from '../../utils';

// Types
import { SupportedLanguage } from '../../types';

// Images
import UploadIcon from '../../assets/images/upload_file.svg?react';
import RotateAutoIcon from '../../assets/images/rotate_auto.svg?react';
import LanguageIcon from '../../assets/images/language.svg?react';
import DeleteIcon from '../../assets/images/delete.svg?react';

// Styles
import './TextSection.css';

interface Props {
    /**
     * Describes anything loading external to this component.
     */
    isOtherLoading: boolean;
    originalText: string;
    setOriginalText: (text: string) => void;
    setRotatedText: (text: string) => void;
    rot: number;
    setRot: (rot: number) => void;
    originalLanguage: SupportedLanguage;
    setOriginalLanguage: (language: SupportedLanguage) => void;
    rotatedLanguage: SupportedLanguage;
    setRotatedLanguage: (language: SupportedLanguage) => void;
    setIsRotPositive: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAutoRotating: React.Dispatch<React.SetStateAction<boolean>>;
}

const OriginalTextSection = ({
    isOtherLoading,
    originalText,
    setOriginalText,
    setRotatedText,
    rot,
    setRot,
    originalLanguage,
    setOriginalLanguage,
    rotatedLanguage,
    setRotatedLanguage,
    setIsRotPositive,
    setIsAutoRotating,
}: Props): ReactElement => {
    const [isOriginalLanguageDropdownOpen, setIsOriginalLanguageDropdownOpen] =
        useState<boolean>(false);

    const {
        data: decryptData,
        mutate: decryptMutate,
        isLoading: isDecryptLoading,
        error: decryptError,
    } = useMutation(decrypt, { retry: false });

    const isLoading: boolean = isOtherLoading || isDecryptLoading;

    const handleChangeOriginalText = (
        e: ChangeEvent<HTMLTextAreaElement>
    ): void => {
        e.preventDefault();
        const _originalText: string = e.currentTarget.value;

        setOriginalText(_originalText);
        setRotatedText(
            rotateString(
                _originalText ?? '',
                rot,
                originalLanguage,
                rotatedLanguage
            )
        );
    };

    const handleChangeOriginalLanguage = (
        language: SupportedLanguage
    ): void => {
        setOriginalLanguage(language);
        setOriginalText(
            rotateString(originalText ?? '', 0, originalLanguage, language)
        );
        setIsOriginalLanguageDropdownOpen(false);
    };

    const handleDecrypt = (): void => {
        if (originalText) {
            setIsRotPositive(true);
            decryptMutate({ text: originalText });
        }
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
        const file: File | undefined = e.target.files?.[0];

        if (file) {
            const reader: FileReader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                const text: string | ArrayBuffer | null | undefined =
                    e.target?.result;

                if (typeof text !== 'string') {
                    return;
                }

                setOriginalText(text);
                setRotatedText(
                    rotateString(
                        text ?? '',
                        rot,
                        originalLanguage,
                        rotatedLanguage
                    )
                );
            };

            reader.readAsText(file);
        }
    };

    useEffect(() => {
        if (decryptData) {
            setRot(decryptData.rot);
            setRotatedText(decryptData.result);
            setRotatedLanguage(decryptData.language as SupportedLanguage);
            setIsAutoRotating(true);

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
    }, [
        decryptData,
        decryptError,
        setRot,
        setRotatedText,
        setRotatedLanguage,
        setIsAutoRotating,
    ]);

    return (
        <section id="original-textarea-section" className="textarea-section">
            {isOriginalLanguageDropdownOpen && (
                <div
                    className="clickaway"
                    onClick={() => setIsOriginalLanguageDropdownOpen(false)}
                ></div>
            )}
            <label htmlFor="original-text">Original text</label>
            <div className="textarea-container">
                <textarea
                    id="original-text"
                    name="original-text"
                    placeholder="Enter text here..."
                    onChange={handleChangeOriginalText}
                    value={originalText}
                    spellCheck="false"
                    disabled={isLoading}
                    maxLength={30_000}
                />
                <div className="pills">
                    <div className="pill-wrapper">
                        <button
                            type="button"
                            title={
                                originalText === '' || isLoading
                                    ? 'Must write text before changing alphabet'
                                    : 'Change alphabet used'
                            }
                            className={`pill inverse ${
                                isOriginalLanguageDropdownOpen ? 'open' : ''
                            }`}
                            onClick={() => {
                                setIsOriginalLanguageDropdownOpen(
                                    !isOriginalLanguageDropdownOpen
                                );
                            }}
                            disabled={originalText === '' || isLoading}
                        >
                            <LanguageIcon className="icon" />
                            <span className="text">
                                {getFirstThreeLetters(originalLanguage)} (
                                {originalLanguage})
                            </span>
                        </button>
                        {isOriginalLanguageDropdownOpen && (
                            <ul className="pill-list">
                                {Object.keys(languageMetadata).map(
                                    (language) => (
                                        <li
                                            key={language}
                                            onClick={() =>
                                                handleChangeOriginalLanguage(
                                                    language as SupportedLanguage
                                                )
                                            }
                                        >
                                            {language}
                                        </li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                    <button
                        type="button"
                        title={
                            originalText === ''
                                ? 'No text to clear'
                                : 'Clear text area'
                        }
                        className="pill inverse"
                        onClick={() => {
                            setOriginalText('');
                            setRotatedText('');
                            setRot(0);
                            setOriginalLanguage(SupportedLanguage.English);
                            setRotatedLanguage(SupportedLanguage.English);

                            localStorage.clear();
                        }}
                        disabled={originalText === '' || isLoading}
                    >
                        <DeleteIcon className="icon" />
                        <span className="text">Clear</span>
                    </button>
                </div>
            </div>
            <hr />
            {isDecryptLoading && <Loading text="Decrypting..." />}
            <div className="buttons">
                <button
                    id="decrypt"
                    type="button"
                    title={
                        originalText === '' || isLoading
                            ? 'No text to decrypt'
                            : 'Attempt to automatically decrypt text'
                    }
                    aria-label='"Decrypt text"'
                    onClick={handleDecrypt}
                    disabled={originalText === '' || isLoading}
                >
                    <RotateAutoIcon className="icon" />
                    <span className="text">Decrypt</span>
                </button>
                <button
                    id="upload"
                    type="button"
                    title="Upload text file."
                    disabled={isLoading}
                >
                    <UploadIcon className="icon" />
                    <span className="text">Upload text file</span>
                    <input
                        className="hidden"
                        title="Upload .txt file"
                        type="file"
                        accept=".txt"
                        onChange={handleFileUpload}
                    />
                </button>
            </div>
        </section>
    );
};

export default OriginalTextSection;
