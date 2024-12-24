export default (isPositiveRotation: boolean): void => {
    const root: HTMLElement = document.documentElement;

    if (isPositiveRotation) {
        root.style.setProperty(
            "--primary-highlight-color",
            "var(--tertiary-color)"
        );
    } else {
        root.style.setProperty(
            "--primary-highlight-color",
            "var(--quaternary-color)"
        );
    }
};
