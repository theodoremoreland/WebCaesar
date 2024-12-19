// React
import { ReactElement, useRef } from "react";

// Custom
import {
    SupportedLanguage,
    supportedLanguages,
} from "../../modules/rotateString";
import { quadruple, get25Percent, fill } from "./LettersDraggable.controller";

// Styles
import "./LettersDraggable.css";

interface Props {
    originalLanguage: SupportedLanguage;
    rotatedLanguage: SupportedLanguage;
}

function onWheelMove(
    event: React.WheelEvent<HTMLOListElement>,
    {
        olRef,
        startingMousePositionRef,
        startingOlTop,
    }: {
        olRef: React.MutableRefObject<HTMLOListElement | null>;
        startingMousePositionRef: React.MutableRefObject<number | null>;
        startingOlTop: React.MutableRefObject<number | null>;
    }
) {
    event.preventDefault();

    if (
        olRef.current === null ||
        startingMousePositionRef.current === null ||
        startingOlTop.current === null
    ) {
        return;
    }

    const deltaY: number =
        event.deltaY > 10 ? 10 : event.deltaY < -10 ? -10 : event.deltaY;

    // Get the bounding rectangles of the child and parent elements
    const childRect: DOMRect = olRef.current.getBoundingClientRect();

    const newTop: number =
        Number(olRef.current.style.top.replace("px", "")) + deltaY;
    const isWithinResetThresholdScrollingDown: boolean =
        newTop - get25Percent(childRect.height) >= 10;
    const isWithinResetThresholdScrollingUp: boolean =
        newTop + get25Percent(childRect.height) <= 10;

    olRef.current.style.top = `${newTop}px`;

    if (deltaY > 0 && isWithinResetThresholdScrollingDown) {
        olRef.current.style.top = `${
            newTop - get25Percent(childRect.height)
        }px`;
    } else if (deltaY < 0 && isWithinResetThresholdScrollingUp) {
        olRef.current.style.top = `${
            newTop + get25Percent(childRect.height)
        }px`;
    } else {
        olRef.current.style.top = `${newTop}px`;
    }
}

function onMouseDown(
    event: React.MouseEvent<HTMLOListElement>,
    {
        olRef,
        startingMousePositionRef,
        startingOlTop,
        onMouseMove,
        onMouseUp,
    }: {
        olRef: React.MutableRefObject<HTMLOListElement | null>;
        startingMousePositionRef: React.MutableRefObject<number | null>;
        startingOlTop: React.MutableRefObject<number | null>;
        onMouseMove: (event: MouseEvent) => void;
        onMouseUp: () => void;
    }
) {
    if (!olRef.current) {
        return;
    }

    startingOlTop.current = Number(
        window.getComputedStyle(olRef.current).top.replace("px", "")
    );
    startingMousePositionRef.current = event.clientY;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}

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
    const originalCharactersFilled: string[] = fill(
        supportedLanguages[originalLanguage].characters,
        lengthOfLongestAlphabet
    );
    const rotatedCharactersFilled: string[] = fill(
        supportedLanguages[rotatedLanguage].characters,
        lengthOfLongestAlphabet
    );

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

    return (
        <section ref={sectionRef} className="LettersDraggable">
            <ol
                ref={originalOlRef}
                id="character-list-original"
                onMouseDown={(event) =>
                    onMouseDown(event, {
                        olRef: originalOlRef,
                        startingMousePositionRef,
                        startingOlTop: startingOriginalOlTop,
                        onMouseMove: onOriginalOlMouseMove,
                        onMouseUp: onOriginalOlMouseUp,
                    })
                }
                onWheel={(event) =>
                    onWheelMove(event, {
                        olRef: originalOlRef,
                        startingMousePositionRef,
                        startingOlTop: startingOriginalOlTop,
                    })
                }
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
                onMouseDown={(event) =>
                    onMouseDown(event, {
                        olRef: rotatedOlRef,
                        startingMousePositionRef,
                        startingOlTop: startingRotatedOlTop,
                        onMouseMove: onRotatedOlMouseMove,
                        onMouseUp: onRotatedOlMouseUp,
                    })
                }
                onWheel={(event) =>
                    onWheelMove(event, {
                        olRef: rotatedOlRef,
                        startingMousePositionRef,
                        startingOlTop: startingRotatedOlTop,
                    })
                }
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
