# First party
import json
import random

# Third party
from flask import Flask, request, send_from_directory, make_response
from flask_cors import CORS

# Custom
from modules.caesar import rotate_string, decrypt
from modules.dad_jokes import get_random_dad_joke
from modules.logger import logger

application = Flask(__name__, static_folder="ui/dist", static_url_path="/")
application.config["DEBUG"] = True

CORS(application)


@application.route("/", methods=["GET"])
def index():
    logger.info(f"Request: {request.method} {request.url}")

    return send_from_directory("ui/dist", "index.html")


@application.route("/dad_joke", methods=["GET"])
def dad_joke_route():
    logger.info(f"Request: {request.method} {request.url}")

    try:
        joke = get_random_dad_joke()
        encrypted_dad_joke = rotate_string(joke, random.randint(1, 25))

        return json.dumps({"dad_joke": joke, "encrypted_dad_joke": encrypted_dad_joke})
    except Exception as e:
        error_message: str = str(e)

        logger.exception(e)

        return make_response({"message": error_message}, 500)


@application.route("/decrypt", methods=["POST"])
def decrypt_route():
    logger.info(f"Request: {request.method} {request.url}")
    data = request.json

    try:
        text = data["text"]

        if text == "" or type(text) != str:
            raise KeyError("text")

        decrypted = decrypt(text)

        return json.dumps(decrypted)
    except KeyError:
        error_message: str = (
            "Invalid key error. Key: 'text' must be of type 'string' and cannot be empty."
        )

        logger.exception(e)

        return make_response(
            {"message": error_message},
            400,
        )
    except ValueError as e:
        error_message: str = str(e)

        logger.exception(e)

        return make_response({"message": error_message}, 422)


if __name__ == "__main__":
    application.run()
