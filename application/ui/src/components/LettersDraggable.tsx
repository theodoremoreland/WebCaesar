import { ReactElement } from "react";
import { SupportedLanguage, supportedLanguages } from "../modules/rotateString";

// Styles
import "./LettersDraggable.css";

interface Props {
    originalLanguage: SupportedLanguage;
    rotatedLanguage: SupportedLanguage;
}

const LettersDraggable = ({
    originalLanguage,
    rotatedLanguage,
}: Props): ReactElement => {
    const originalCharactersDoubled = [
        ...Object.values(
            supportedLanguages[originalLanguage].indexToCharacters
        ),
        ...Object.values(
            supportedLanguages[originalLanguage].indexToCharacters
        ),
    ];
    const rotatedCharactersDoubled = [
        ...Object.values(supportedLanguages[rotatedLanguage].indexToCharacters),
        ...Object.values(supportedLanguages[rotatedLanguage].indexToCharacters),
    ];
    return (
        <div className="LettersDraggable rot-wheel-container">
            <ol>
                {originalCharactersDoubled.map((character, index) => {
                    return (
                        <li key={index + character} draggable={true}>
                            {character}
                        </li>
                    );
                })}
            </ol>
            <ol>
                {rotatedCharactersDoubled.map((character, index) => {
                    return (
                        <li key={index + character} draggable={true}>
                            {character}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default LettersDraggable;
