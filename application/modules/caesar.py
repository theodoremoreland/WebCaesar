ALPHABET = "abcdefghijklmnopqrstuvwxyz"


def alphabet_position(character):
    lower = character.lower()

    return ALPHABET.index(lower)


def rotate_character(char, rot):
    rotated_idx = (alphabet_position(char) + rot) % 26

    if char.isupper():
        return ALPHABET[rotated_idx].upper()
    else:
        return ALPHABET[rotated_idx]


def rotate_string(text, rot):
    rotated = ""

    for char in text:
        if char.isalpha():
            rotated = rotated + rotate_character(char, rot)
        else:
            rotated = rotated + char

    return rotated
