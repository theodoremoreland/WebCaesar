# First party
from typing import Dict, Any, List

# Third party
from spellchecker import SpellChecker

ALPHABET_EN: str = "abcdefghijklmnopqrstuvwxyz"
ALPHABET_ES: str = "abcdefghijklmnñopqrstuvwxyz"
ALPHABET_FR: str = "abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ"
ALPHABET_PT: str = "abcdefghijklmnopqrstuvwxyzàáâãçéêíóôõú"
ALPHABET_DE: str = "abcdefghijklmnopqrstuvwxyzäöüß"
ALPHABET_IT: str = "abcdefghijklmnopqrstuvwxyzàèéìíîòóùú"
ALPHABET_RU: str = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
ALPHABET_AR: str = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي"
ALPHABET_EU: str = "abcdefghijklmnopqrstuvwxyzñ"
ALPHABET_LV: str = "aābcčdeēfgģhiījkķlļmnņoprsštuūvzž"
ALPHABET_NL: str = "abcdefghijklmnopqrstuvwxyz"
LANGUAGES: List[Dict[str, str]] = [
    {"name": "English", "code": "en", "alphabet": ALPHABET_EN},
    {"name": "Spanish", "code": "es", "alphabet": ALPHABET_ES},
    {"name": "French", "code": "fr", "alphabet": ALPHABET_FR},
    {"name": "Portuguese", "code": "pt", "alphabet": ALPHABET_PT},
    {"name": "German", "code": "de", "alphabet": ALPHABET_DE},
    {"name": "Italian", "code": "it", "alphabet": ALPHABET_IT},
    {"name": "Russian", "code": "ru", "alphabet": ALPHABET_RU},
    {"name": "Arabic", "code": "ar", "alphabet": ALPHABET_AR},
    {"name": "Basque", "code": "eu", "alphabet": ALPHABET_EU},
    {"name": "Latvian", "code": "lv", "alphabet": ALPHABET_LV},
    {"name": "Dutch", "code": "nl", "alphabet": ALPHABET_NL},
]


def alphabet_position(character: str, alphabet: List[str]) -> int:
    lower: str = character.lower()

    return alphabet.index(lower)


def rotate_character(char: str, rot: int, alphabet: List[str]) -> str:
    rotated_idx: int = (alphabet_position(char, alphabet) + rot) % len(alphabet)

    if char.isupper():
        return alphabet[rotated_idx].upper()
    else:
        return alphabet[rotated_idx]


def rotate_string(text: str, rot: int, alphabet: List[str] = ALPHABET_EN) -> str:
    rotated: str = ""

    for char in text:
        if char.isalpha():
            rotated = rotated + rotate_character(char, rot, alphabet)
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
        # TODO - Likely a bottleneck, investigate alternative of lifting this out of the loop
        spell = SpellChecker(distance=1, language=language["code"])
        alphabet: List[str] = language["alphabet"]

        try:
            for i in range(len(alphabet)):
                rot_result: str = rotate_string(text, i, alphabet)
                words: List[str] = rot_result.split()
                known = spell.known(words)

                if len(known) > best_match["matches"]:
                    best_match["rot"] = i
                    best_match["result"] = rot_result
                    best_match["matches"] = len(known)
                    best_match["language"] = language["name"]
                    best_match["language_code"] = language["code"]
        except:
            continue

    return best_match
