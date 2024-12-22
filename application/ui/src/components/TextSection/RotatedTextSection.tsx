// React
import { ReactElement, useState, ChangeEvent, useRef, useEffect } from "react";

// Custom
import rotateString, {
    SupportedLanguage,
    supportedLanguages,
} from "../../modules/rotateString";
import { getFirstThreeLetters, copyToClipboard } from "../../App.controller";

// Images
import DownloadIcon from "../../assets/images/download.svg?react";

// Styles
import "./TextSection.css";

interface Props {
    /**
     * Describes anything loading external to this component.
     */
    isOtherLoading: boolean;
    originalText: string;
    rotatedText: string;
    rot: number;
    setRot: (rot: number) => void;
    originalLanguage: SupportedLanguage;
    rotatedLanguage: SupportedLanguage;
    setRotatedLanguage: (language: SupportedLanguage) => void;
    setRotatedText: (text: string) => void;
}

const RotatedTextSection = ({
    isOtherLoading,
    originalText,
    rotatedText,
    rot,
    setRot,
    originalLanguage,
    rotatedLanguage,
    setRotatedLanguage,
    setRotatedText,
}: Props): ReactElement => {
    const [isRotatedLanguageDropdownOpen, setIsRotatedLanguageDropdownOpen] =
        useState<boolean>(false);
    const [isRotPopoverOpen, setIsRotPopoverOpen] = useState<boolean>(false);

    const rotInputRef = useRef<HTMLInputElement | null>(null);

    const isLoading: boolean = isOtherLoading; // Here in case we need to add more loading states

    const handleChangeRotatedLanguage = (language: SupportedLanguage): void => {
        const alphabetLength: number =
            supportedLanguages[language].characterCount;
        const isRotGreaterThanOrEqualToAlphabetLength: boolean =
            rot >= alphabetLength;
        const _rot: number = isRotGreaterThanOrEqualToAlphabetLength
            ? alphabetLength - 1
            : rot;

        setRot(_rot);
        setRotatedLanguage(language);
        setRotatedText(
            rotateString(originalText ?? "", _rot, originalLanguage, language)
        );
        setIsRotatedLanguageDropdownOpen(false);
    };

    const handleRotate = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();

        const _rot: number = parseInt(e.currentTarget.value);

        setRot(_rot);
        setRotatedText(
            rotateString(
                originalText ?? "",
                _rot,
                originalLanguage,
                rotatedLanguage
            )
        );
    };

    useEffect(() => {
        if (isRotPopoverOpen && rotInputRef.current) {
            rotInputRef.current.focus();
        }
    }, [isRotPopoverOpen]);

    return (
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
                    disabled={isLoading}
                    onClick={() => copyToClipboard(rotatedText)}
                />
                <div className="pills">
                    <div className="pill-wrapper">
                        <button
                            title={
                                originalText === "" || isLoading
                                    ? "Must write text before changing alphabet"
                                    : "Change alphabet used"
                            }
                            type="button"
                            className={`pill ${
                                isRotatedLanguageDropdownOpen ? "open" : ""
                            }`}
                            onClick={() => {
                                setIsRotatedLanguageDropdownOpen(
                                    !isRotatedLanguageDropdownOpen
                                );
                                setIsRotPopoverOpen(false);
                            }}
                            disabled={originalText === "" || isLoading}
                        >
                            {getFirstThreeLetters(rotatedLanguage)} (
                            {rotatedLanguage})
                        </button>
                        {isRotatedLanguageDropdownOpen && (
                            <ul className="pill-list">
                                {Object.keys(supportedLanguages).map(
                                    (language) => (
                                        <li
                                            key={language}
                                            onClick={() =>
                                                handleChangeRotatedLanguage(
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
                    <div className="pill-wrapper">
                        <button
                            title={
                                originalText === "" || isLoading
                                    ? "No text to rotate"
                                    : "Rotate text by a certain degree"
                            }
                            type="button"
                            className={`pill ${isRotPopoverOpen ? "open" : ""}`}
                            onClick={() => {
                                setIsRotPopoverOpen(!isRotPopoverOpen);
                                setIsRotatedLanguageDropdownOpen(false);
                            }}
                            disabled={originalText === "" || isLoading}
                        >
                            rot{rot}
                        </button>
                        {isRotPopoverOpen && (
                            <input
                                ref={rotInputRef}
                                title="Rotate text by a certain degree"
                                type="number"
                                className="popover"
                                name="rot"
                                value={rot}
                                autoComplete="off"
                                onChange={handleRotate}
                                min={0}
                                max={
                                    supportedLanguages[rotatedLanguage]
                                        .characterCount - 1
                                }
                                disabled={originalText === "" || isLoading}
                            />
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
                            rotatedText === "" || isLoading
                                ? "No text to download"
                                : "Download rotated text"
                        }
                        disabled={rotatedText === "" || isLoading}
                    >
                        <DownloadIcon className="icon" />{" "}
                        <span>Download result</span>
                    </button>
                </a>
            </div>
        </section>
    );
};

export default RotatedTextSection;
