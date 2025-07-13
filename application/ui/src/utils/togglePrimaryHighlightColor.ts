export default (isRotPositive: boolean): void => {
    const root: HTMLElement = document.documentElement;

    if (isRotPositive) {
        root.style.setProperty('--primary-color', '#0d1117');
        root.style.setProperty('--secondary-color', '#fee715');
        root.style.setProperty('--font-color', 'var(--tertiary-color)');
        root.style.setProperty('--border-color', '#fee71599');
    } else {
        root.style.setProperty('--primary-color', '#fee715');
        root.style.setProperty('--secondary-color', '#0d1117');
        root.style.setProperty('--font-color', 'var(--secondary-color)');
        root.style.setProperty('--border-color', '#0d1117a6');
    }
};
