// React
import { ReactElement, useRef, useCallback, useMemo, useEffect } from 'react';

// Custom
import { languageMetadata } from '../../constants/languageMetadata';
import {
    quadruple,
    fill,
    onMouseDown,
    onWheelMove,
    onTouchStart,
    moveListOnTouchMove,
    determineLiClassName,
    FillObject,
    moveListOnMouseMove,
    calculateRot,
} from './LettersDraggable.controller';

// Types
import { SupportedLanguage } from '../../types';

// Images
import SwipeVerticalIcon from '../../assets/images/swipe_vertical.svg?react';
import TouchDoubleIcon from '../../assets/images/touch_double.svg?react';

// Styles
import './LettersDraggable.css';

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

    const onOriginalOlTouchMove = useCallback(
        (event: TouchEvent) => {
            moveListOnTouchMove(event, {
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
        document.removeEventListener('mousemove', onOriginalOlMouseMove);
        document.removeEventListener('mouseup', onOriginalOlMouseUp);
    }, [onOriginalOlMouseMove]);

    const onOriginalOlTouchEnd = useCallback(() => {
        document.removeEventListener('touchmove', onOriginalOlTouchMove);
        document.removeEventListener('touchend', onOriginalOlTouchEnd);
    }, [onOriginalOlTouchMove]);

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

    const onRotatedOlTouchMove = useCallback(
        (event: TouchEvent) => {
            moveListOnTouchMove(event, {
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
        document.removeEventListener('mousemove', onRotatedOlMouseMove);
        document.removeEventListener('mouseup', onRotatedOlMouseUp);
    }, [onRotatedOlMouseMove]);

    const onRotatedOlTouchEnd = useCallback(() => {
        document.removeEventListener('touchmove', onRotatedOlTouchMove);
        document.removeEventListener('touchend', onRotatedOlTouchEnd);
    }, [onRotatedOlTouchMove]);

    useEffect(() => {
        updateRot();
    }, [isRotPositive, updateRot]);

    // TODO: Refactor, this is terrible
    useEffect(() => {
        try {
            if (isAutoRotating && rot !== 0) {
                const originalOlRect: DOMRect | undefined =
                    originalOlRef.current?.getBoundingClientRect();
                const originalOlHeight: number | undefined =
                    originalOlRect?.height;

                if (originalOlHeight === undefined) {
                    setIsAutoRotating(false);

                    return;
                }

                // Attempt to move the list by half the size of a single letter in the list
                // This is to ensure the letter is aligned horizontally flush (assuming the list is not scrolled prior)
                const deltaY: number =
                    originalOlHeight / 4 / lengthOfLongestAlphabet;
                let newRot: undefined | number;
                let yDistanceTraveled: number = 0;

                // Stop the auto-rotation if already scrolled entirety of two alphabets (e.g. olHeight / 2). Could also be olHeight / 4 I guess.
                while (
                    newRot !== rot &&
                    yDistanceTraveled < originalOlHeight / 2
                ) {
                    onWheelMove(
                        {
                            nativeEvent: new WheelEvent('wheel', { deltaY }),
                            preventDefault: () => {},
                        } as React.WheelEvent<HTMLOListElement>,
                        {
                            olRef: originalOlRef,
                            isAutomated: true,
                        }
                    );

                    newRot = calculateRot({
                        originalOlRef,
                        rotatedOlRef,
                        isRotPositive,
                        lengthOfLongestAlphabet,
                    });

                    yDistanceTraveled += deltaY;
                }

                setIsAutoRotating(false);
            }
        } catch (error) {
            console.error(error);
        }
    }, [
        isAutoRotating,
        setIsAutoRotating,
        rot,
        isRotPositive,
        lengthOfLongestAlphabet,
    ]);

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
                    isRotPositive ? 'positive' : 'negative'
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
                onTouchStart={(event) => {
                    onTouchStart(event, {
                        olRef: originalOlRef,
                        startingMousePositionRef,
                        startingOlTop: startingOriginalOlTop,
                        onTouchMove: onOriginalOlTouchMove,
                        onTouchEnd: onOriginalOlTouchEnd,
                    });
                }}
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
                    isRotPositive ? 'positive' : 'negative'
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
                onTouchStart={(event) => {
                    onTouchStart(event, {
                        olRef: rotatedOlRef,
                        startingMousePositionRef,
                        startingOlTop: startingRotatedOlTop,
                        onTouchMove: onRotatedOlTouchMove,
                        onTouchEnd: onRotatedOlTouchEnd,
                    });
                }}
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
            <div id="overlay">
                <ul className="character-grid">
                    {quadruple(fill([], lengthOfLongestAlphabet)).map(
                        (_, index) => {
                            return <li key={index}></li>;
                        }
                    )}
                </ul>
                <ul className="character-grid">
                    {quadruple(fill([], lengthOfLongestAlphabet)).map(
                        (_, index) => {
                            return <li key={index}></li>;
                        }
                    )}
                </ul>
            </div>
        </section>
    );
};

export default LettersDraggable;
