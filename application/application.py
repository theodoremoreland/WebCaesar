# First party
import json
import random

# Third party
from flask import Flask, request, send_from_directory, make_response
from flask_cors import CORS

# Custom
from modules.caesar import rotate_string, decrypt
from modules.dad_jokes import get_random_dad_joke

application = Flask(__name__, static_folder="ui/dist", static_url_path="/")
application.config["DEBUG"] = True
CORS(application)


@application.route("/", methods=["GET"])
def index():
    return send_from_directory("ui/dist", "index.html")


@application.route("/dad_joke", methods=["GET"])
def dad_joke_route():
    joke = get_random_dad_joke()
    encrypted_dad_joke = rotate_string(joke, random.randint(1, 25))

    return json.dumps({"dad_joke": joke, "encrypted_dad_joke": encrypted_dad_joke})


@application.route("/encrypt", methods=["POST"])
def encrypt_route():
    data = request.json

    try:
        rot = data["rot"]
        text = data["text"]

        if text == "" or type(text) != str:
            raise KeyError("text")
        if type(rot) != int:
            raise KeyError("rot")

        encrypted_text = rotate_string(text, rot)

        return json.dumps({"encrypted_text": encrypted_text})
    except KeyError as e:
        return make_response(
            {
                "message": f"Invalid key error. Keys: 'rot' (int) and 'text' (non-empty string) must be provided. Invalid key: {e}"
            },
            400,
        )


@application.route("/decrypt", methods=["POST"])
def decrypt_route():
    data = request.json

    try:
        text = data["text"]

        if text == "" or type(text) != str:
            raise KeyError("text")

        decrypted = decrypt(text)

        return json.dumps(decrypted)
    except KeyError:
        return make_response(
            {
                "message": "Invalid key error. Key: 'text' must be of type 'string' and cannot be empty."
            },
            400,
        )
    except ValueError as e:
        return make_response({"message": str(e)}, 422)


if __name__ == "__main__":
    application.run()
