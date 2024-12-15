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
    const originalOlRef = useRef<HTMLOListElement | null>(null);
    const rotatedOlRef = useRef<HTMLOListElement | null>(null);
    const originalMousePosition = useRef<number | null>(null);
    const originalOlTopPosition = useRef<number | null>(null);

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

        originalOlTopPosition.current = Number(
            window.getComputedStyle(originalOlRef.current).top.replace("px", "")
        );
        originalMousePosition.current = event.clientY;

        document.addEventListener("mousemove", onOriginalOlMouseMove);
        document.addEventListener("mouseup", onOriginalOlMouseUp);
    }

    function onOriginalOlMouseMove(event: MouseEvent) {
        if (
            originalOlRef.current === null ||
            originalMousePosition.current === null ||
            originalOlTopPosition.current === null
        ) {
            return;
        }

        const newMousePosition = event.clientY;
        const difference = newMousePosition - originalMousePosition.current;

        if (false) {
            originalOlRenderBefore();
            originalOlRenderAfter();
        }

        originalOlRef.current.style.top = `${
            originalOlTopPosition.current + difference
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
            originalMousePosition.current === null ||
            originalOlTopPosition.current === null
        ) {
            return;
        }

        const deltaY: number =
            event.deltaY > 10 ? 10 : event.deltaY < -10 ? -10 : event.deltaY;

        originalOlRef.current.style.top = `${
            Number(originalOlRef.current.style.top.replace("px", "")) + deltaY
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
                    return <li key={index + character}>{character}</li>;
                })}
            </ol>
            <ol ref={rotatedOlRef} id="character-list-rotated">
                {rotatedCharactersDoubled.map((character, index) => {
                    return <li key={index + character}>{character}</li>;
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
