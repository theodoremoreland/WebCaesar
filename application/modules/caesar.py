# First party
from typing import Dict, Any, List

# Third party
from spellchecker import SpellChecker

ALPHABET_EN: str = "abcdefghijklmnopqrstuvwxyz"
# Note from Chat GPT:
# The Spanish alphabet is similar to the English alphabet but includes one additional letter: "ñ". Here is the traditional Spanish alphabet in order:
# a, b, c, d, e, f, g, h, i, j, k, l, m, n, ñ, o, p, q, r, s, t, u, v, w, x, y, z
# Historically, "ch" and "ll" were also considered separate letters in the Spanish alphabet, but in 2010, the Royal Spanish Academy officially removed them as distinct letters, aligning the Spanish alphabet more closely with the standard Latin alphabet plus the "ñ".
ALPHABET_ES: str = "abcdefghijklmnñopqrstuvwxyz"
# TODO address the following note from Chat GPT:
# The French alphabet has the exact same letters and order as the English alphabet:
# a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
# While the alphabet is the same, French uses additional accents and special characters in writing, like é, è, ê, ë and ç (cédille), but these are not considered separate letters in the French alphabet.
ALPHABET_FR: str = "abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ"
# TODO address the following note from Chat GPT:
# The Portuguese alphabet has the same 26 letters as the English alphabet. Here is the Portuguese alphabet in order:
# a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
# However, Portuguese also uses various diacritical marks (like accents) on vowels and the ç (c-cedilla), but these do not add extra letters to the alphabet.
ALPHABET_PT: str = "abcdefghijklmnopqrstuvwxyzàáâãçéêíóôõú"
# TODO address the following note from Chat GPT:
# The German alphabet has the same 26 letters as the English alphabet. Here it is in order:
# a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
# In addition to these letters, German has a few special characters:
# The Umlauted vowels: ä, ö, ü (variants of a, o, and u with umlauts)
# The Eszett (ß), also called the "sharp S," which is used in place of a double "s" in certain cases
# However, ä, ö, ü, and ß are not considered separate letters of the alphabet but variations of the existing letters.
ALPHABET_DE: str = "abcdefghijklmnopqrstuvwxyzäöüß"
# TODO address the following note from Chat GPT:
# The Italian alphabet traditionally has only 21 letters:
# a, b, c, d, e, f, g, h, i, l, m, n, o, p, q, r, s, t, u, v, z
# The letters j, k, w, x, and y are generally excluded from the traditional Italian alphabet because they are not native to Italian words. However, these letters do appear in borrowed foreign words, names, and scientific terms, so they are recognized and used in modern Italian when needed.
ALPHABET_IT: str = "abcdefghijklmnopqrstuvwxyzàèéìíîòóùú"
# TODO address the following note from Chat GPT:
# The Russian alphabet uses the Cyrillic script, which has 33 letters. Here is the Russian alphabet in order:
# А, Б, В, Г, Д, Е, Ё, Ж, З, И, Й, К, Л, М, Н, О, П, Р, С, Т, У, Ф, Х, Ц, Ч, Ш, Щ, Ъ, Ы, Ь, Э, Ю, Я
# Some letters may look similar to those in the Latin alphabet, but they often represent different sounds. For example, "В" sounds like the English "V" and "Н" sounds like the English "N".
ALPHABET_RU: str = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
# TODO address the following note from Chat GPT:
# The Basque alphabet uses the same 26 letters as the English alphabet, in the same order:
# a, b, c, d, e, f, g, h, i, j, k, l, m, n, ñ, o, p, q, r, s, t, u, v, w, x, y, z
# While "ñ" is not a separate letter in most Latin alphabets, it is commonly included in Basque. Additionally, Basque has some unique pronunciation rules and uses combinations like "tx," "ts," and "tz" to represent sounds that are distinct in Basque phonetics.
ALPHABET_EU: str = "abcdefghijklmnopqrstuvwxyzñ"
# TODO address the following note from Chat GPT:
# The Latvian alphabet has 33 letters and is based on the Latin alphabet with some additional letters that include diacritical marks. Here is the Latvian alphabet in order:
# a, ā, b, c, č, d, e, ē, f, g, ģ, h, i, ī, j, k, ķ, l, ļ, m, n, ņ, o, p, r, s, š, t, u, ū, v, z, ž
# Notably, the letters q, w, x, and y from the English alphabet are not used in standard Latvian and appear only in foreign words or names.
ALPHABET_LV: str = "aābcčdeēfgģhiījkķlļmnņoprsštuūvzž"
# TODO address the following note from Chat GPT:
# The Dutch alphabet has the same 26 letters as the English alphabet, in the same order:
# a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
# Dutch also uses digraphs (combinations of two letters) such as "ij" and "oe" to represent specific sounds, but these are not considered separate letters in the alphabet.
ALPHABET_NL: str = "abcdefghijklmnopqrstuvwxyz"
LANGUAGES: List[Dict[str, str]] = [
    {"name": "English", "code": "en", "alphabet": ALPHABET_EN},
    {"name": "Spanish", "code": "es", "alphabet": ALPHABET_ES},
    {"name": "French", "code": "fr", "alphabet": ALPHABET_FR},
    {"name": "Portuguese", "code": "pt", "alphabet": ALPHABET_PT},
    {"name": "German", "code": "de", "alphabet": ALPHABET_DE},
    {"name": "Italian", "code": "it", "alphabet": ALPHABET_IT},
    {"name": "Russian", "code": "ru", "alphabet": ALPHABET_RU},
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


def decrypt(text: str, threshold: int = 30) -> Dict[str, Any]:
    best_match: Dict[str, Any] = {
        "rot": 0,
        "result": "",
        "matches": 0,
        "language": "",
        "language_code": "",
        "percentage": 0,
    }

    for language in LANGUAGES:
        spell = SpellChecker(distance=1, language=language["code"])
        alphabet: List[str] = language["alphabet"]

        try:
            for i in range(len(alphabet)):
                rot_result: str = rotate_string(text, i, alphabet)
                words: List[str] = rot_result.split()
                known = spell.known(words)
                matches: int = len(known)

                if len(known) > best_match["matches"]:
                    best_match["rot"] = i
                    best_match["result"] = rot_result
                    best_match["matches"] = matches
                    best_match["language"] = language["name"]
                    best_match["language_code"] = language["code"]
                    best_match["percentage"] = (matches / len(words)) * 100
        except:
            continue

    if best_match["percentage"] < threshold:
        raise ValueError(
            f"""Did not find enough matches given the threshold of {threshold}%."""
        )

    return best_match
