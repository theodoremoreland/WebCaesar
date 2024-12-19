// React
import { ReactElement, useRef } from "react";

// Custom
import { SupportedLanguage, supportedLanguages } from "../modules/rotateString";

// Styles
import "./LettersDraggable.css";

interface Props {
    originalLanguage: SupportedLanguage;
    rotatedLanguage: SupportedLanguage;
}

const filled = (array: string[], desiredLength: number): string[] => {
    const newArray: string[] = [...array];

    while (newArray.length < desiredLength) {
        newArray.push("");
    }

    return newArray;
};

const quadruple = (array: string[]): string[] => {
    const newArray: string[] = [];

    for (let i = 0; i < 4; i++) {
        newArray.push(...array);
    }

    return newArray;
};

const get25Percent = (value: number): number => {
    return value * 0.25;
};

const LettersDraggable = ({
    originalLanguage,
    rotatedLanguage,
}: Props): ReactElement => {
    // Global refs
    const sectionRef = useRef<HTMLElement | null>(null);
    const startingMousePositionRef = useRef<number | null>(null);

    // Original characters list refs
    const originalOlRef = useRef<HTMLOListElement | null>(null);
    const startingOriginalOlTop = useRef<number | null>(null);

    // Rotated characters list refs
    const rotatedOlRef = useRef<HTMLOListElement | null>(null);
    const startingRotatedOlTop = useRef<number | null>(null);

    const lengthOfLongestAlphabet: number = Math.max(
        supportedLanguages[originalLanguage].characters.length,
        supportedLanguages[rotatedLanguage].characters.length
    );
    const originalCharactersFilled: string[] = filled(
        supportedLanguages[originalLanguage].characters,
        lengthOfLongestAlphabet
    );
    const rotatedCharactersFilled: string[] = filled(
        supportedLanguages[rotatedLanguage].characters,
        lengthOfLongestAlphabet
    );

    function onOriginalOlMouseDown(event: React.MouseEvent<HTMLOListElement>) {
        if (!originalOlRef.current) {
            return;
        }

        startingOriginalOlTop.current = Number(
            window.getComputedStyle(originalOlRef.current).top.replace("px", "")
        );
        startingMousePositionRef.current = event.clientY;

        document.addEventListener("mousemove", onOriginalOlMouseMove);
        document.addEventListener("mouseup", onOriginalOlMouseUp);
    }

    function onOriginalOlMouseMove(event: MouseEvent) {
        if (
            originalOlRef.current === null ||
            startingMousePositionRef.current === null ||
            startingOriginalOlTop.current === null ||
            sectionRef.current === null
        ) {
            return;
        }

        const newMousePosition: number = event.clientY;
        const difference: number =
            newMousePosition - startingMousePositionRef.current;

        // Get the bounding rectangles of the child and parent elements
        const childRect: DOMRect =
            originalOlRef.current.getBoundingClientRect();

        const newTop: number = startingOriginalOlTop.current + difference;
        const isWithinResetThresholdScrollingDown: boolean =
            newTop - get25Percent(childRect.height) >= 10;
        const isWithinResetThresholdScrollingUp: boolean =
            newTop + get25Percent(childRect.height) <= 10;

        if (difference > 0 && isWithinResetThresholdScrollingDown) {
            originalOlRef.current.style.top = `${
                newTop - get25Percent(childRect.height)
            }px`;
        } else if (difference < 0 && isWithinResetThresholdScrollingUp) {
            originalOlRef.current.style.top = `${
                newTop + get25Percent(childRect.height)
            }px`;
        } else {
            originalOlRef.current.style.top = `${
                startingOriginalOlTop.current + difference
            }px`;
        }
    }

    function onOriginalOlMouseUp() {
        document.removeEventListener("mousemove", onOriginalOlMouseMove);

        if (!originalOlRef.current) {
            return;
        }
        // const elements = originalOlRef.current.getElementsByTagName("li");

        // console.log(
        //     "onMouseUp",
        //     [...elements].map((e) => {
        //         return {
        //             letter: e.innerText,
        //             position: e.getBoundingClientRect().top + window.scrollY,
        //         };
        //     }),
        //     window.innerHeight,
        //     `Center: ${window.innerHeight / 2}`
        // );

        document.removeEventListener("mouseup", onOriginalOlMouseUp);
    }

    function onOriginalWheelMove(event: React.WheelEvent<HTMLOListElement>) {
        event.preventDefault();

        if (
            originalOlRef.current === null ||
            startingMousePositionRef.current === null ||
            startingOriginalOlTop.current === null
        ) {
            return;
        }

        const deltaY: number =
            event.deltaY > 10 ? 10 : event.deltaY < -10 ? -10 : event.deltaY;

        originalOlRef.current.style.top = `${
            Number(originalOlRef.current.style.top.replace("px", "")) + deltaY
        }px`;
    }

    function onRotatedOlMouseDown(event: React.MouseEvent<HTMLOListElement>) {
        if (!rotatedOlRef.current) {
            return;
        }

        startingRotatedOlTop.current = Number(
            window.getComputedStyle(rotatedOlRef.current).top.replace("px", "")
        );
        startingMousePositionRef.current = event.clientY;

        document.addEventListener("mousemove", onRotatedOlMouseMove);
        document.addEventListener("mouseup", onRotatedOlMouseUp);
    }

    function onRotatedOlMouseMove(event: MouseEvent) {
        if (
            rotatedOlRef.current === null ||
            startingMousePositionRef.current === null ||
            startingRotatedOlTop.current === null ||
            sectionRef.current === null
        ) {
            return;
        }

        const newMousePosition: number = event.clientY;
        const difference: number =
            newMousePosition - startingMousePositionRef.current;

        rotatedOlRef.current.style.top = `${
            startingRotatedOlTop.current + difference
        }px`;
    }

    function onRotatedOlMouseUp() {
        document.removeEventListener("mousemove", onRotatedOlMouseMove);
        document.removeEventListener("mouseup", onRotatedOlMouseUp);
    }

    function onRotatedWheelMove(event: React.WheelEvent<HTMLOListElement>) {
        event.preventDefault();

        if (
            rotatedOlRef.current === null ||
            startingMousePositionRef.current === null ||
            startingRotatedOlTop.current === null
        ) {
            return;
        }

        const deltaY: number =
            event.deltaY > 10 ? 10 : event.deltaY < -10 ? -10 : event.deltaY;

        rotatedOlRef.current.style.top = `${
            Number(rotatedOlRef.current.style.top.replace("px", "")) + deltaY
        }px`;
    }

    return (
        <section ref={sectionRef} className="LettersDraggable">
            <ol
                ref={originalOlRef}
                id="character-list-original"
                onMouseDown={onOriginalOlMouseDown}
                onWheel={onOriginalWheelMove}
            >
                {quadruple(originalCharactersFilled).map((character, index) => {
                    return (
                        <li
                            key={index + character}
                            className={`${
                                supportedLanguages[originalLanguage]
                                    .charactersToIndex[character] === 0
                                    ? "first"
                                    : ""
                            }`}
                        >
                            {character}
                        </li>
                    );
                })}
            </ol>
            <ol
                ref={rotatedOlRef}
                id="character-list-rotated"
                onMouseDown={onRotatedOlMouseDown}
                onWheel={onRotatedWheelMove}
            >
                {quadruple(rotatedCharactersFilled).map((character, index) => {
                    return (
                        <li
                            key={index + character}
                            className={`${
                                supportedLanguages[rotatedLanguage]
                                    .charactersToIndex[character] === 0
                                    ? "first"
                                    : ""
                            }`}
                        >
                            {character}
                        </li>
                    );
                })}
            </ol>
            <ul id="character-grid">
                {Object.values(
                    supportedLanguages[rotatedLanguage].indexToCharacters
                ).map((character, index) => {
                    return <li key={index + character + "grid"}></li>;
                })}
            </ul>
        </section>
    );
};

export default LettersDraggable;
