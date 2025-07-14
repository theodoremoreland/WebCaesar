export enum SupportedLanguage {
    English = 'English',
    Spanish = 'Spanish',
    French = 'French',
    Portuguese = 'Portuguese',
    German = 'German',
    Italian = 'Italian',
    Russian = 'Russian',
    Basque = 'Basque',
    Latvian = 'Latvian',
    Dutch = 'Dutch',
}

export interface IndexToCharacters {
    [index: number]: string[];
}

export interface CharactersToIndex {
    [character: string]: number;
}

export enum LocalStorageKeys {
    ORIGINAL_TEXT = 'originalText',
    ROTATED_TEXT = 'rotatedText',
    ROT = 'rot',
    ORIGINAL_LANGUAGE = 'originalLanguage',
    ROTATED_LANGUAGE = 'rotatedLanguage',
    DONT_SHOW_INTRO = 'dontShowIntro',
    INTRO_MODAL_LAST_SHOWN_DATE = 'introModalLastShownDate',
}
