// React
import { ReactElement, useRef, useCallback, useMemo } from "react";

// Custom
import { languageMetadata } from "../../constants/languageMetadata";
import {
    quadruple,
    get25Percent,
    fill,
    onMouseDown,
    onWheelMove,
    determineLiClassName,
    getCenterLetters,
    FillObject,
} from "./LettersDraggable.controller";

// Types
import { SupportedLanguage } from "../../types";

// Images
import SwipeVerticalIcon from "../../assets/images/swipe_vertical.svg?react";
import TouchDoubleIcon from "../../assets/images/touch_double.svg?react";

// Styles
import "./LettersDraggable.css";

interface Props {
    originalLanguage: SupportedLanguage;
    rotatedLanguage: SupportedLanguage;
    isPositiveRotation: boolean;
    setIsPositiveRotation: React.Dispatch<React.SetStateAction<boolean>>;
}

const LettersDraggable = ({
    originalLanguage,
    rotatedLanguage,
    isPositiveRotation,
    setIsPositiveRotation,
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

    const lengthOfLongestAlphabet: number = useMemo(
        () =>
            Math.max(
                languageMetadata[originalLanguage].characterCount,
                languageMetadata[rotatedLanguage].characterCount
            ),
        [originalLanguage, rotatedLanguage]
    );
    const originalCharactersFilled: FillObject[] = useMemo(
        () =>
            fill(
                languageMetadata[originalLanguage].characters,
                lengthOfLongestAlphabet
            ),
        [originalLanguage, lengthOfLongestAlphabet]
    );
    const rotatedCharactersFilled: FillObject[] = useMemo(
        () =>
            fill(
                languageMetadata[rotatedLanguage].characters,
                lengthOfLongestAlphabet
            ),
        [rotatedLanguage, lengthOfLongestAlphabet]
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

        getCenterLetters(originalOlRef, rotatedOlRef);
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

        getCenterLetters(originalOlRef, rotatedOlRef);
    }, []);

    const onRotatedOlMouseUp = useCallback(() => {
        document.removeEventListener("mousemove", onRotatedOlMouseMove);
        document.removeEventListener("mouseup", onRotatedOlMouseUp);
    }, [onRotatedOlMouseMove]);

    return (
        <section ref={sectionRef} className="LettersDraggable">
            <div className="icons">
                <SwipeVerticalIcon className="icon swipe-vertical" />
                <TouchDoubleIcon className="icon touch-double" />
            </div>
            <ol
                ref={originalOlRef}
                id="character-list-original"
                className={`character-list ${
                    isPositiveRotation ? "positive" : "negative"
                }`}
                title="Drag vertically to rotate text. Double click to change rotation sign (positive/negative)."
                onDoubleClick={() => setIsPositiveRotation(!isPositiveRotation)}
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
                {quadruple(originalCharactersFilled).map(
                    (fillObject, index) => {
                        return (
                            <li
                                key={index + fillObject.value}
                                className={`${determineLiClassName(
                                    languageMetadata[originalLanguage]
                                        .charactersToIndex,
                                    languageMetadata[originalLanguage]
                                        .characterCount,
                                    fillObject.value
                                )}`}
                                data-index={fillObject.index}
                                data-index-plus-one={fillObject.index + 1}
                            >
                                {fillObject.value}
                            </li>
                        );
                    }
                )}
            </ol>
            <ol
                ref={rotatedOlRef}
                id="character-list-rotated"
                className={`character-list ${
                    isPositiveRotation ? "positive" : "negative"
                }`}
                title="Drag vertically to rotate text. Double click to change rotation sign (positive/negative)."
                onDoubleClick={() => setIsPositiveRotation(!isPositiveRotation)}
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
                {quadruple(rotatedCharactersFilled).map((fillObject, index) => {
                    return (
                        <li
                            key={index + fillObject.value}
                            className={`${determineLiClassName(
                                languageMetadata[rotatedLanguage]
                                    .charactersToIndex,
                                languageMetadata[rotatedLanguage]
                                    .characterCount,
                                fillObject.value
                            )}`}
                            data-index={fillObject.index}
                            data-index-plus-one={fillObject.index + 1}
                        >
                            {fillObject.value}
                        </li>
                    );
                })}
            </ol>
            <div className="icons">
                <SwipeVerticalIcon className="icon swipe-vertical" />
                <TouchDoubleIcon className="icon touch-double" />
            </div>
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
