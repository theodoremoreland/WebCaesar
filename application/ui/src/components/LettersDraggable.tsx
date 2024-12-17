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

const LettersDraggable = ({
    originalLanguage,
    rotatedLanguage,
}: Props): ReactElement => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const startingMousePositionRef = useRef<number | null>(null);

    const originalOlRef = useRef<HTMLOListElement | null>(null);
    const startingOriginalOlTop = useRef<number | null>(null);

    const rotatedOlRef = useRef<HTMLOListElement | null>(null);
    const startingRotatedOlTop = useRef<number | null>(null);

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

    function originalOlRenderBefore() {
        if (!originalOlRef.current) {
            return;
        }

        Object.values(supportedLanguages[originalLanguage].indexToCharacters)
            .reverse()
            .forEach((character) => {
                const element: HTMLLIElement = document.createElement("li");
                element.innerText = character;
                element.classList.add("virtual");

                if (!originalOlRef.current) {
                    return;
                }

                originalOlRef.current.prepend(element);
            });
    }

    function originalOlRenderAfter() {
        if (!originalOlRef.current) {
            return;
        }

        Object.values(
            supportedLanguages[originalLanguage].indexToCharacters
        ).forEach((character) => {
            const element = document.createElement("li");
            element.innerText = character;

            if (!originalOlRef.current) {
                return;
            }

            originalOlRef.current.appendChild(element);
        });
    }

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
        const parentRect: DOMRect = sectionRef.current.getBoundingClientRect();

        // Calculate the empty space between the bottom of the child and the bottom of the parent
        const topEmptySpace: number = childRect.top - parentRect.top;
        const bottomEmptySpace: number = parentRect.bottom - childRect.bottom;

        console.log("topEmptySpace", topEmptySpace);
        // console.log("bottomEmptySpace", bottomEmptySpace);

        if (difference > 0 && topEmptySpace >= -10) {
            originalOlRenderBefore();
        }

        originalOlRef.current.style.top = `${
            startingOriginalOlTop.current + difference
        }px`;
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

    // TODO: rotated characters lists should have empty letters in case of different alphabet lengths
    return (
        <section ref={sectionRef} className="LettersDraggable">
            <ol
                ref={originalOlRef}
                id="character-list-original"
                onMouseDown={onOriginalOlMouseDown}
                onWheel={onOriginalWheelMove}
            >
                {originalCharactersDoubled.map((character, index) => {
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
                {rotatedCharactersDoubled.map((character, index) => {
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
