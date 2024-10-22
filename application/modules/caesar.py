# First party
from typing import Dict, Any, List

# Third party
from spellchecker import SpellChecker

ALPHABET: str = "abcdefghijklmnopqrstuvwxyz"
LANGUAGES: List[Dict[str, str]] = [
    {"name": "English", "code": "en"},
    {"name": "Spanish", "code": "es"},
    {"name": "French", "code": "fr"},
    {"name": "Portuguese", "code": "pt"},
    {"name": "German", "code": "de"},
    {"name": "Italian", "code": "it"},
    {"name": "Russian", "code": "ru"},
    {"name": "Arabic", "code": "ar"},
    {"name": "Basque", "code": "eu"},
    {"name": "Latvian", "code": "lv"},
    {"name": "Dutch", "code": "nl"},
]


def alphabet_position(character: str) -> int:
    lower = character.lower()

    return ALPHABET.index(lower)


def rotate_character(char: str, rot: int) -> str:
    rotated_idx = (alphabet_position(char) + rot) % 26

    if char.isupper():
        return ALPHABET[rotated_idx].upper()
    else:
        return ALPHABET[rotated_idx]


def rotate_string(text: str, rot: int) -> str:
    rotated = ""

    for char in text:
        if char.isalpha():
            rotated = rotated + rotate_character(char, rot)
        else:
            rotated = rotated + char

    return rotated


def decrypt(text: str) -> Dict[str, Any]:
    best_match: Dict[str, Any] = {
        "rot": 0,
        "result": "",
        "matches": 0,
        "language": "",
        "language_code": "",
    }

    for language in LANGUAGES:
        spell = SpellChecker(distance=1, language=language["code"])

        for i in range(25):
            rot_result: str = rotate_string(text, i)
            words: List[str] = rot_result.split()
            known = spell.known(words)

            if len(known) > best_match["matches"]:
                best_match["rot"] = i
                best_match["result"] = rot_result
                best_match["matches"] = len(known)
                best_match["language"] = language["name"]
                best_match["language_code"] = language["code"]

    return best_match
