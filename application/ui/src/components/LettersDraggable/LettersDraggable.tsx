// React
import { ReactElement, useRef, useCallback, useMemo, useEffect } from "react";

// Custom
import { languageMetadata } from "../../constants/languageMetadata";
import {
    quadruple,
    fill,
    onMouseDown,
    onWheelMove,
    determineLiClassName,
    FillObject,
    moveListOnMouseMove,
    calculateRot,
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
    isRotPositive: boolean;
    setIsRotPositive: React.Dispatch<React.SetStateAction<boolean>>;
    rot: number;
    setRot: React.Dispatch<React.SetStateAction<number>>;
    isAutoRotating: boolean;
    setIsAutoRotating: React.Dispatch<React.SetStateAction<boolean>>;
}

const LettersDraggable = ({
    originalLanguage,
    rotatedLanguage,
    isRotPositive,
    setIsRotPositive,
    rot,
    setRot,
    isAutoRotating,
    setIsAutoRotating,
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

    const updateRot = useCallback(() => {
        const newRot: number | undefined = calculateRot({
            originalOlRef,
            rotatedOlRef,
            isRotPositive,
            lengthOfLongestAlphabet,
        });

        if (newRot !== undefined) {
            setRot(newRot);
        }
    }, [isRotPositive, setRot, lengthOfLongestAlphabet]);

    const onOriginalOlMouseMove = useCallback(
        (event: MouseEvent) => {
            moveListOnMouseMove(event, {
                olRef: originalOlRef,
                startingMousePositionRef,
                startingOlTop: startingOriginalOlTop,
                sectionRef,
            });
            updateRot();
        },
        [updateRot]
    );

    const onOriginalOlMouseUp = useCallback(() => {
        document.removeEventListener("mousemove", onOriginalOlMouseMove);
        document.removeEventListener("mouseup", onOriginalOlMouseUp);
    }, [onOriginalOlMouseMove]);

    const onRotatedOlMouseMove = useCallback(
        (event: MouseEvent) => {
            moveListOnMouseMove(event, {
                olRef: rotatedOlRef,
                startingMousePositionRef,
                startingOlTop: startingRotatedOlTop,
                sectionRef,
            });
            updateRot();
        },
        [updateRot]
    );

    const onRotatedOlMouseUp = useCallback(() => {
        document.removeEventListener("mousemove", onRotatedOlMouseMove);
        document.removeEventListener("mouseup", onRotatedOlMouseUp);
    }, [onRotatedOlMouseMove]);

    useEffect(() => {
        updateRot();
    }, [isRotPositive, updateRot]);

    // TODO: Refactor, this is terrible
    useEffect(() => {
        try {
            if (isAutoRotating) {
                const deltaY: number = 100;
                let newRot: undefined | number = calculateRot({
                    originalOlRef,
                    rotatedOlRef,
                    isRotPositive: true,
                    lengthOfLongestAlphabet,
                });
                let tries: number = 0;

                while (newRot !== rot && tries < 10_000) {
                    onWheelMove(
                        {
                            nativeEvent: new WheelEvent("wheel", { deltaY }),
                            preventDefault: () => {},
                        } as React.WheelEvent<HTMLOListElement>,
                        {
                            olRef: originalOlRef,
                        }
                    );

                    newRot = calculateRot({
                        originalOlRef,
                        rotatedOlRef,
                        isRotPositive: true,
                        lengthOfLongestAlphabet,
                    });

                    tries++;
                }

                onWheelMove(
                    {
                        nativeEvent: new WheelEvent("wheel", { deltaY }),
                        preventDefault: () => {},
                    } as React.WheelEvent<HTMLOListElement>,
                    {
                        olRef: originalOlRef,
                    }
                );
                onWheelMove(
                    {
                        nativeEvent: new WheelEvent("wheel", { deltaY }),
                        preventDefault: () => {},
                    } as React.WheelEvent<HTMLOListElement>,
                    {
                        olRef: originalOlRef,
                    }
                );

                setIsAutoRotating(false);
            }
        } catch (error) {
            console.error(error);
        }
    }, [isAutoRotating, setIsAutoRotating, rot, lengthOfLongestAlphabet]);

    return (
        <section ref={sectionRef} className="LettersDraggable">
            <div
                className="icons"
                title="Drag vertically to rotate text. Double click to change rotation sign (positive/negative)."
            >
                <SwipeVerticalIcon className="icon swipe-vertical" />
                <TouchDoubleIcon className="icon touch-double" />
            </div>
            <ol
                ref={originalOlRef}
                id="character-list-original"
                className={`character-list ${
                    isRotPositive ? "positive" : "negative"
                }`}
                title="Drag vertically to rotate text. Double click to change rotation sign (positive/negative)."
                onDoubleClick={() => setIsRotPositive(!isRotPositive)}
                onMouseDown={(event) =>
                    onMouseDown(event, {
                        olRef: originalOlRef,
                        startingMousePositionRef,
                        startingOlTop: startingOriginalOlTop,
                        onMouseMove: onOriginalOlMouseMove,
                        onMouseUp: onOriginalOlMouseUp,
                    })
                }
                onWheel={(event) => {
                    onWheelMove(event, {
                        olRef: originalOlRef,
                    });
                    updateRot();
                }}
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
                    isRotPositive ? "positive" : "negative"
                }`}
                title="Drag vertically to rotate text. Double click to change rotation sign (positive/negative)."
                onDoubleClick={() => setIsRotPositive(!isRotPositive)}
                onMouseDown={(event) =>
                    onMouseDown(event, {
                        olRef: rotatedOlRef,
                        startingMousePositionRef,
                        startingOlTop: startingRotatedOlTop,
                        onMouseMove: onRotatedOlMouseMove,
                        onMouseUp: onRotatedOlMouseUp,
                    })
                }
                onWheel={(event) => {
                    onWheelMove(event, {
                        olRef: rotatedOlRef,
                    });
                    updateRot();
                }}
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
            <div
                className="icons"
                title="Drag vertically to rotate text. Double click to change rotation sign (positive/negative)."
            >
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
