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
