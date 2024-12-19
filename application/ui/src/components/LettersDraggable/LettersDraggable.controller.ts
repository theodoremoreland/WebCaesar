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
