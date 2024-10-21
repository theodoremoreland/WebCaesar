# First party
from typing import Dict, Any

# Third party
from spellchecker import SpellChecker

ALPHABET = "abcdefghijklmnopqrstuvwxyz"

# English - "en"
# Spanish - "es"
# French - "fr"
# Portuguese - "pt"
# German - "de"
# Italian - "it"
# Russian - "ru"
# Arabic - "ar"
# Basque - "eu"
# Latvian - "lv"
# Dutch - "nl"

spell = SpellChecker(distance=1)


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
    best_match = {"rot": 0, "result": "", "matches": 0}

    for i in range(25):
        rot_result = rotate_string(text, i)
        words = rot_result.split()
        known = spell.known(words)

        if len(known) > best_match["matches"]:
            best_match["rot"] = i
            best_match["result"] = rot_result
            best_match["matches"] = len(known)

    return best_match
