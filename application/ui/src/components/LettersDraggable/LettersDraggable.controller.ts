import isFirstLetter from "../../utils/isFirstLetter";
import isLastLetter from "../../utils/isLastLetter";

import { CharactersToIndex } from "../../types";

export interface FillObject {
    value: string;
    index: number;
}

export interface LiPositionMetadata {
    index: number;
    letter: string;
    positionY: number;
}

export const fill = (array: string[], desiredLength: number): FillObject[] => {
    const newArray: FillObject[] = array.map((value, index) => {
        return { value, index };
    });

    while (newArray.length < desiredLength) {
        newArray.push({
            value: "",
            index: newArray.length,
        });
    }

    return newArray;
};

export const quadruple = <T>(array: T[]): T[] => {
    const newArray: T[] = [];

    for (let i = 0; i < 4; i++) {
        newArray.push(...array);
    }

    return newArray;
};

export const get25Percent = (value: number): number => {
    return value * 0.25;
};

const getClosestToCenter = (
    elementsWithPosition: LiPositionMetadata[]
): LiPositionMetadata => {
    const center: number = window.innerHeight / 2;

    return elementsWithPosition.reduce((prev, curr) => {
        return Math.abs(curr.positionY - center) <
            Math.abs(prev.positionY - center)
            ? curr
            : prev;
    });
};

export const getCenterLetters = (
    originalOlRef: React.MutableRefObject<HTMLOListElement | null>,
    rotatedOlRef: React.MutableRefObject<HTMLOListElement | null>
):
    | {
          original: LiPositionMetadata;
          rotated: LiPositionMetadata;
      }
    | undefined => {
    if (!originalOlRef.current || !rotatedOlRef.current) {
        return;
    }

    const originalElements: HTMLCollectionOf<HTMLLIElement> =
        originalOlRef.current.getElementsByTagName("li");
    const rotatedElements: HTMLCollectionOf<HTMLLIElement> =
        rotatedOlRef.current.getElementsByTagName("li");

    const originalElementsWithPosition: LiPositionMetadata[] = [
        ...originalElements,
    ].map((e) => {
        return {
            index: Number(e.dataset.index),
            letter: e.innerText,
            positionY: e.getBoundingClientRect().top + window.scrollY,
        };
    });
    const rotatedElementsWithPosition: LiPositionMetadata[] = [
        ...rotatedElements,
    ].map((e) => {
        return {
            index: Number(e.dataset.index),
            letter: e.innerText,
            positionY: e.getBoundingClientRect().top + window.scrollY,
        };
    });

    return {
        original: getClosestToCenter(originalElementsWithPosition),
        rotated: getClosestToCenter(rotatedElementsWithPosition),
    };
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

export const moveListOnMouseMove = (
    event: MouseEvent,
    {
        olRef,
        startingMousePositionRef,
        startingOlTop,
        sectionRef,
    }: {
        olRef: React.MutableRefObject<HTMLOListElement | null>;
        startingMousePositionRef: React.MutableRefObject<number | null>;
        startingOlTop: React.MutableRefObject<number | null>;
        sectionRef: React.MutableRefObject<HTMLElement | null>;
    }
) => {
    if (
        olRef.current === null ||
        startingMousePositionRef.current === null ||
        startingOlTop.current === null ||
        sectionRef.current === null
    ) {
        return;
    }

    const newMousePosition: number = event.clientY;
    const difference: number =
        newMousePosition - startingMousePositionRef.current;

    // Get the bounding rectangles of the child and parent elements
    const childRect: DOMRect = olRef.current.getBoundingClientRect();

    const newTop: number = startingOlTop.current + difference;
    const isWithinResetThresholdScrollingDown: boolean =
        newTop - get25Percent(childRect.height) >= 10;
    const isWithinResetThresholdScrollingUp: boolean =
        newTop + get25Percent(childRect.height) <= 10;

    if (difference > 0 && isWithinResetThresholdScrollingDown) {
        olRef.current.style.top = `${
            newTop - get25Percent(childRect.height)
        }px`;
    } else if (difference < 0 && isWithinResetThresholdScrollingUp) {
        olRef.current.style.top = `${
            newTop + get25Percent(childRect.height)
        }px`;
    } else {
        olRef.current.style.top = `${startingOlTop.current + difference}px`;
    }
};
