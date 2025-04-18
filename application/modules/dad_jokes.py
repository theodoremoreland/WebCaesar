import random
from typing import List

DAD_JOKES: List[str] = [
    "When my son told me to stop impersonating a flamingo, I had to put my foot down.",
    "Why can't a bicycle stand on its own? It's two-tired.",
    "I told my wife she should embrace her mistakes. She gave me a hug.",
    "I'm reading a book on the history of glue. I just can't seem to put it down.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I'm terrified of elevators, so I'm going to start taking steps to avoid them.",
    "I was up all night wondering where the sun went, but then it dawned on me.",
    "I used to play piano by ear, but now I use my hands.",
    "I was wondering why the baseball was getting bigger. Then it hit me.",
    "I didn't like my beard at first. Then it grew on me.",
    "Atheism is a non-prophet organization.",
    "Time flies like an arrow. Fruit flies like a banana.",
    "A plateau is the highest form of flattery.",
    "How do you find Will Smith in the snow? Look for fresh prints.",
    "What did the grape say when it was stepped on? Nothing, it just let out a little wine.",
    "A burger walks into a bar. The bartender says 'Sorry, we don't serve food here'.",
    "Orion's Belt is a huge waist of space.",
    "To the guy who invented zero: Thanks for nothing!",
    "What's brown and sticky? A stick.",
    "There are only two things I don't eat for breakfast: Lunch and dinner.",
    "What do you call a fake dad? A faux pas.",
    "Today, my son asked 'Can I have a book mark?' and I burst into tears. 11 years old and he still doesn't know my name is Brian.",
]


def get_random_dad_joke() -> str:
    return random.choice(DAD_JOKES)
