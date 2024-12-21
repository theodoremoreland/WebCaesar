import { CharactersToIndex } from "../../modules/rotateString";

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

// export const getCenterLetters = () => {
//         // const elements = originalOlRef.current.getElementsByTagName("li");

//         // console.log(
//         //     "onMouseUp",
//         //     [...elements].map((e) => {
//         //         return {
//         //             letter: e.innerText,
//         //             position: e.getBoundingClientRect().top + window.scrollY,
//         //         };
//         //     }),
//         //     window.innerHeight,
//         //     `Center: ${window.innerHeight / 2}`
//         // );
// }

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

const isFirstLetter = (
    charactersToIndex: CharactersToIndex,
    character: string
): boolean => {
    return charactersToIndex[character] === 0;
};

const isLastLetter = (
    charactersToIndex: CharactersToIndex,
    characterCount: number,
    character: string
): boolean => {
    return charactersToIndex[character] === characterCount - 1;
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
