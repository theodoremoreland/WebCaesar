// React
import { ReactElement, useState } from "react";

// Custom
import { SupportedLanguage, supportedLanguages } from "../modules/rotateString";

// Styles
import "./LettersDraggable.css";

interface CharacterPositions {
    original: {
        [character: string]: {
            x: number;
            y: number;
            index: number;
        };
    };
    rotated: {
        [character: string]: {
            x: number;
            y: number;
            index: number;
        };
    };
}

interface Props {
    originalLanguage: SupportedLanguage;
    rotatedLanguage: SupportedLanguage;
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);

    const ol: HTMLOListElement = document.getElementById(
        "character-list-original"
    ) as HTMLOListElement;

    const elements = ol.getElementsByTagName("li");

    console.log(
        "onMouseUp",
        [...elements].map((e) => {
            return {
                letter: e.innerText,
                position: e.getBoundingClientRect().top + window.scrollY,
            };
        }),
        window.innerHeight,
        `Center: ${window.innerHeight / 2}`
    );
}

function onMouseMove(event: MouseEvent) {
    document.addEventListener("mouseup", onMouseUp);
    const ol = document.getElementById(
        "character-list-original"
    ) as HTMLOListElement;

    const y = event.clientY;

    ol.style.transition = "transform 0.2s ease";
    ol.style.transform = `translateY(${y}px)`;
}

function onMouseDown() {
    document.addEventListener("mousemove", onMouseMove);
}

const LettersDraggable = ({
    originalLanguage,
    rotatedLanguage,
}: Props): ReactElement => {
    const [characterPositions] = useState<CharacterPositions>({
        original: {},
        rotated: {},
    });

    console.debug(characterPositions);

    const originalCharactersDoubled: string[] = [
        ...Object.values(
            supportedLanguages[originalLanguage].indexToCharacters
        ),
        ...Object.values(
            supportedLanguages[originalLanguage].indexToCharacters
        ),
    ];
    const rotatedCharactersDoubled: string[] = [
        ...Object.values(supportedLanguages[rotatedLanguage].indexToCharacters),
        ...Object.values(supportedLanguages[rotatedLanguage].indexToCharacters),
    ];

    return (
        <section className="LettersDraggable">
            <ol id="character-list-original" onMouseDown={onMouseDown}>
                {originalCharactersDoubled.map((character, index) => {
                    return <li key={index + character}>{character}</li>;
                })}
            </ol>
            <ol id="character-list-rotated">
                {rotatedCharactersDoubled.map((character, index) => {
                    return <li key={index + character}>{character}</li>;
                })}
            </ol>
        </section>
    );
};

export default LettersDraggable;
