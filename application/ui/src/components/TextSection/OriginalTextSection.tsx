// React
import { ReactElement, ChangeEvent, useEffect, useState } from "react";

// Third party
import { useMutation } from "react-query";
import { toast } from "react-toastify";

// Custom
import decrypt from "../../http/decrypt";
import rotateString, { supportedLanguages } from "../../modules/rotateString";
import {
    decryptErrorToastId,
    decryptSuccessToastId,
    getFirstThreeLetters,
} from "../../App.controller";

// Types
import { SupportedLanguage } from "../../types";

// Images
import UploadIcon from "../../assets/images/upload_file.svg?react";
import RotateAutoIcon from "../../assets/images/rotate_auto.svg?react";

// Styles
import "./TextSection.css";

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
                _originalText ?? "",
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
            rotateString(originalText ?? "", 0, originalLanguage, language)
        );
        setIsOriginalLanguageDropdownOpen(false);
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
    }, [decryptData, decryptError, setRot, setRotatedText]);

    return (
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
                    disabled={isLoading}
                    maxLength={30_000}
                />
                <div className="pills">
                    <div className="pill-wrapper">
                        <button
                            type="button"
                            title={
                                originalText === "" || isLoading
                                    ? "Must write text before changing alphabet"
                                    : "Change alphabet used"
                            }
                            className={`pill ${
                                isOriginalLanguageDropdownOpen ? "open" : ""
                            }`}
                            onClick={() => {
                                setIsOriginalLanguageDropdownOpen(
                                    !isOriginalLanguageDropdownOpen
                                );
                            }}
                            disabled={originalText === "" || isLoading}
                        >
                            {getFirstThreeLetters(originalLanguage)} (
                            {originalLanguage})
                        </button>
                        {isOriginalLanguageDropdownOpen && (
                            <ul className="pill-list">
                                {Object.keys(supportedLanguages).map(
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
                            originalText === ""
                                ? "No text to clear"
                                : "Clear text area"
                        }
                        className="pill"
                        onClick={() => {
                            setOriginalText("");
                            setRotatedText("");
                            setRot(0);
                            setOriginalLanguage(SupportedLanguage.English);
                            setRotatedLanguage(SupportedLanguage.English);

                            localStorage.clear();
                        }}
                        disabled={originalText === "" || isLoading}
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
                    disabled={isLoading}
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
                        originalText === "" || isLoading
                            ? "No text to rotate"
                            : "Attempt to automatically decrypt text"
                    }
                    onClick={handleDecrypt}
                    disabled={originalText === "" || isLoading}
                >
                    <RotateAutoIcon className="icon" />
                    <span>Auto rotate</span>
                </button>
            </div>
        </section>
    );
};

export default OriginalTextSection;
