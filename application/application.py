# First party
import json
import random

# Third party
from flask import Flask, request, send_from_directory

# Custom
from modules.caesar import rotate_string
from modules.dad_jokes import get_random_dad_joke

application = Flask(__name__, static_folder="ui/dist", static_url_path="/")
application.config["DEBUG"] = True


@application.route("/", methods=["GET"])
def index():
    return send_from_directory("ui/dist", "index.html")


@application.route("/dad_joke", methods=["GET"])
def dad_joke():
    joke = get_random_dad_joke()
    encrypted_dad_joke = rotate_string(joke, random.randint(1, 25))

    return json.dumps({"dad_joke": joke, "encrypted_dad_joke": encrypted_dad_joke})


@application.route("/encrypt", methods=["POST"])
def encrypt():
    data = request.json
    rot = data["rot"]
    text = data["text"]
    encrypted_text = rotate_string(text, rot)

    return json.dumps({"encrypted_text": encrypted_text})


if __name__ == "__main__":
    application.run()
