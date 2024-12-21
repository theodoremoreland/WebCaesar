// React
import { ReactElement, useRef, useCallback } from "react";

// Custom
import {
    SupportedLanguage,
    supportedLanguages,
} from "../../modules/rotateString";
import {
    quadruple,
    get25Percent,
    fill,
    onMouseDown,
    onWheelMove,
    determineLiClassName,
} from "./LettersDraggable.controller";

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

    const onOriginalOlMouseMove = useCallback((event: MouseEvent) => {
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
    }, []);

    const onOriginalOlMouseUp = useCallback(() => {
        document.removeEventListener("mousemove", onOriginalOlMouseMove);
        document.removeEventListener("mouseup", onOriginalOlMouseUp);
    }, [onOriginalOlMouseMove]);

    const onRotatedOlMouseMove = useCallback((event: MouseEvent) => {
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

        // Get the bounding rectangles of the child and parent elements
        const childRect: DOMRect = rotatedOlRef.current.getBoundingClientRect();

        const newTop: number = startingRotatedOlTop.current + difference;
        const isWithinResetThresholdScrollingDown: boolean =
            newTop - get25Percent(childRect.height) >= 10;
        const isWithinResetThresholdScrollingUp: boolean =
            newTop + get25Percent(childRect.height) <= 10;

        if (difference > 0 && isWithinResetThresholdScrollingDown) {
            rotatedOlRef.current.style.top = `${
                newTop - get25Percent(childRect.height)
            }px`;
        } else if (difference < 0 && isWithinResetThresholdScrollingUp) {
            rotatedOlRef.current.style.top = `${
                newTop + get25Percent(childRect.height)
            }px`;
        } else {
            rotatedOlRef.current.style.top = `${
                startingRotatedOlTop.current + difference
            }px`;
        }
    }, []);

    const onRotatedOlMouseUp = useCallback(() => {
        document.removeEventListener("mousemove", onRotatedOlMouseMove);
        document.removeEventListener("mouseup", onRotatedOlMouseUp);
    }, [onRotatedOlMouseMove]);

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
                            className={`${determineLiClassName(
                                supportedLanguages[originalLanguage]
                                    .charactersToIndex,
                                supportedLanguages[originalLanguage]
                                    .characterCount,
                                character
                            )}`}
                            data-original-letter-position={
                                supportedLanguages[originalLanguage]
                                    .charactersToIndex[character] + 1
                            }
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
                            className={`${determineLiClassName(
                                supportedLanguages[rotatedLanguage]
                                    .charactersToIndex,
                                supportedLanguages[rotatedLanguage]
                                    .characterCount,
                                character
                            )}`}
                            data-original-letter-position={
                                supportedLanguages[rotatedLanguage]
                                    .charactersToIndex[character] + 1
                            }
                        >
                            {character}
                        </li>
                    );
                })}
            </ol>
            <ul id="character-grid">
                {quadruple(fill([], lengthOfLongestAlphabet)).map(
                    (_, index) => {
                        return <li key={index}></li>;
                    }
                )}
            </ul>
        </section>
    );
};

export default LettersDraggable;
