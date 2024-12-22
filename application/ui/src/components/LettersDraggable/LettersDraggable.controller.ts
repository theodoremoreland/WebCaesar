import isFirstLetter from "../../utils/isFirstLetter";
import isLastLetter from "../../utils/isLastLetter";

import { CharactersToIndex } from "../../types";

export const fill = (array: string[], desiredLength: number): string[] => {
    const newArray: string[] = [...array];

    while (newArray.length < desiredLength) {
        newArray.push("");
    }

    return newArray;
};

export const quadruple = (array: string[]): string[] => {
    const newArray: string[] = [];

    for (let i = 0; i < 4; i++) {
        newArray.push(...array);
    }

    return newArray;
};

export const get25Percent = (value: number): number => {
    return value * 0.25;
};

const getClosestToCenter = (
    elementsWithPosition: { letter: string; position: number }[]
) => {
    const center: number = window.innerHeight / 2;

    return elementsWithPosition.reduce((prev, curr) => {
        return Math.abs(curr.position - center) <
            Math.abs(prev.position - center)
            ? curr
            : prev;
    });
};

export const getCenterLetters = (
    originalOlRef: React.MutableRefObject<HTMLOListElement | null>,
    rotatedOlRef: React.MutableRefObject<HTMLOListElement | null>
) => {
    if (!originalOlRef.current || !rotatedOlRef.current) {
        return;
    }

    const originalElements: HTMLCollectionOf<HTMLLIElement> =
        originalOlRef.current.getElementsByTagName("li");
    const rotatedElements: HTMLCollectionOf<HTMLLIElement> =
        rotatedOlRef.current.getElementsByTagName("li");

    const originalElementsWithPosition: { letter: string; position: number }[] =
        [...originalElements].map((e) => {
            return {
                letter: e.innerText,
                position: e.getBoundingClientRect().top + window.scrollY,
            };
        });
    const rotatedElementsWithPosition: { letter: string; position: number }[] =
        [...rotatedElements].map((e) => {
            return {
                letter: e.innerText,
                position: e.getBoundingClientRect().top + window.scrollY,
            };
        });

    console.log(
        getClosestToCenter(originalElementsWithPosition),
        getClosestToCenter(rotatedElementsWithPosition)
    );
};

export const onWheelMove = (
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
) => {
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
};

export const onMouseDown = (
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
) => {
    if (!olRef.current) {
        return;
    }

    startingOlTop.current = Number(
        window.getComputedStyle(olRef.current).top.replace("px", "")
    );
    startingMousePositionRef.current = event.clientY;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
};

export const determineLiClassName = (
    charactersToIndex: CharactersToIndex,
    characterCount: number,
    character: string
) => {
    if (isFirstLetter(charactersToIndex, character)) {
        return "first";
    } else if (isLastLetter(charactersToIndex, characterCount, character)) {
        return "last";
    }

    return "";
};
