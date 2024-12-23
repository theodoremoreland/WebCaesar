export default (isPositiveRotation: boolean): void => {
    const root: HTMLElement = document.documentElement;

    if (isPositiveRotation) {
        root.style.setProperty("--primary-highlight-color", "green");
    } else {
        root.style.setProperty("--primary-highlight-color", "red");
    }
};
