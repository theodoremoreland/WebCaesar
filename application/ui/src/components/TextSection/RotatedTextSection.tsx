// React
import { ReactElement, useState } from 'react';

// Custom
import { languageMetadata } from '../../constants/languageMetadata';
import { copyToClipboard } from './TextSection.controller';

// Components
import RotInfo from '../Modal/RotInfo/RotInfo';
import Modal from '../Modal/Modal';

// Utils
import { getFirstThreeLetters } from '../../utils';

// Types
import { SupportedLanguage } from '../../types';

// Images
import DownloadIcon from '../../assets/images/download.svg?react';
import InfoIcon from '../../assets/images/info.svg?react';
import NumbersIcon from '../../assets/images/numbers.svg?react';
import LanguageIcon from '../../assets/images/language.svg?react';
import SettingsIcon from '../../assets/images/settings.svg?react';

// Styles
import './TextSection.css';

interface Props {
    /**
     * Describes anything loading external to this component.
     */
    isOtherLoading: boolean;
    originalText: string;
    rotatedText: string;
    rot: number;
    setRot: (rot: number) => void;
    rotatedLanguage: SupportedLanguage;
    setRotatedLanguage: (language: SupportedLanguage) => void;
}

const RotatedTextSection = ({
    isOtherLoading,
    originalText,
    rotatedText,
    rot,
    setRot,
    rotatedLanguage,
    setRotatedLanguage,
}: Props): ReactElement => {
    const [isRotatedLanguageDropdownOpen, setIsRotatedLanguageDropdownOpen] =
        useState<boolean>(false);
    const [isRotInfoModalOpen, setIsRotInfoModalOpen] =
        useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const isLoading: boolean = isOtherLoading; // Here in case we need to add more loading states

    const handleChangeRotatedLanguage = (language: SupportedLanguage): void => {
        const alphabetLength: number =
            languageMetadata[language].characterCount;
        const isRotGreaterThanOrEqualToAlphabetLength: boolean =
            rot >= alphabetLength;
        const _rot: number = isRotGreaterThanOrEqualToAlphabetLength
            ? alphabetLength - 1
            : rot;

        setRot(_rot);
        setRotatedLanguage(language);
        setIsRotatedLanguageDropdownOpen(false);
    };

    return (
        <section id="rotated-textarea-section" className="textarea-section">
            {isRotInfoModalOpen && (
                <RotInfo
                    title="How to change the rotation"
                    handleClose={() => setIsRotInfoModalOpen(false)}
                />
            )}
            {isRotatedLanguageDropdownOpen && (
                <div
                    className="clickaway"
                    onClick={() => setIsRotatedLanguageDropdownOpen(false)}
                ></div>
            )}
            {isMobileMenuOpen && (
                <Modal
                    title="Output options"
                    handleClose={() => setIsMobileMenuOpen(false)}
                >
                    <ul className="menu">
                        <li>
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
                                        rotatedText === '' || isLoading
                                            ? 'No text to download'
                                            : 'Download rotated text'
                                    }
                                    disabled={rotatedText === '' || isLoading}
                                >
                                    <DownloadIcon
                                        id="download-icon"
                                        className="icon"
                                    />
                                    <span className="text">
                                        Download result
                                    </span>
                                </button>
                            </a>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsRotatedLanguageDropdownOpen(false);
                                    setIsMobileMenuOpen(false);
                                    setIsRotInfoModalOpen(true);
                                }}
                            >
                                <NumbersIcon className="icon" />
                                <span className="text">rot </span>
                                <span>{rot}</span>
                            </button>
                        </li>
                    </ul>
                </Modal>
            )}
            <label htmlFor="rotated-text">Rotated text</label>
            <div className="textarea-container">
                <textarea
                    id="rotated-text"
                    name="rotated-text"
                    placeholder="Rotated text will appear here..."
                    spellCheck="false"
                    title={rotatedText === '' ? undefined : 'Click to copy'}
                    readOnly
                    value={rotatedText}
                    disabled={isLoading}
                    onClick={() => copyToClipboard(rotatedText)}
                />
                <div className="pills desktop-only">
                    <div className="pill-wrapper">
                        <button
                            title={
                                originalText === '' || isLoading
                                    ? 'Must write text before changing alphabet'
                                    : 'Change alphabet used'
                            }
                            type="button"
                            className={`pill inverse ${
                                isRotatedLanguageDropdownOpen ? 'open' : ''
                            }`}
                            onClick={() => {
                                setIsRotatedLanguageDropdownOpen(
                                    !isRotatedLanguageDropdownOpen
                                );
                            }}
                            disabled={originalText === '' || isLoading}
                        >
                            <LanguageIcon className="icon" />
                            <span className="text">
                                {getFirstThreeLetters(rotatedLanguage)} (
                                {rotatedLanguage})
                            </span>
                        </button>
                        {isRotatedLanguageDropdownOpen && (
                            <ul className="pill-list">
                                {Object.keys(languageMetadata).map(
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
                            type="button"
                            className="pill inverse"
                            onClick={() => {
                                setIsRotatedLanguageDropdownOpen(false);
                                setIsRotInfoModalOpen(true);
                            }}
                        >
                            <span className="text">rot </span>
                            <span>{rot}</span>
                            <InfoIcon className="icon" />
                        </button>
                    </div>
                </div>
            </div>
            <hr className="desktop-only" />
            <div className="buttons">
                <button
                    id="menu"
                    className="mobile-only"
                    type="button"
                    title="Output options"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <SettingsIcon className="icon" />
                    <span className="text">Options</span>
                </button>
                <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                        rotatedText
                    )}`}
                    download="rotated_text.txt"
                    className="desktop-only"
                >
                    <button
                        id="download"
                        type="button"
                        title={
                            rotatedText === '' || isLoading
                                ? 'No text to download'
                                : 'Download rotated text'
                        }
                        disabled={rotatedText === '' || isLoading}
                    >
                        <DownloadIcon id="download-icon" className="icon" />
                        <span className="text">Download result</span>
                    </button>
                </a>
            </div>
        </section>
    );
};

export default RotatedTextSection;
