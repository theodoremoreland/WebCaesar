export default (isPositiveRotation: boolean): void => {
    const root: HTMLElement = document.documentElement;

    if (isPositiveRotation) {
        root.style.setProperty("--highlight-color", "var(--secondary-color)");
    } else {
        root.style.setProperty("--highlight-color", "var(--quaternary-color)");
    }
};
