# First party
import json

# Third party
from flask import Flask, request, send_from_directory

# Custom
from modules.caesar import rotate_string

application = Flask(__name__, static_folder="ui/dist", static_url_path="/")
application.config["DEBUG"] = True


@application.route("/", methods=["GET"])
def index():
    return send_from_directory("ui/dist", "index.html")


@application.route("/encrypt", methods=["POST"])
def encrypt():
    data = request.json
    rot = data["rot"]
    text = data["text"]
    encrypted_text = rotate_string(text, rot)

    return json.dumps({"encrypted_text": encrypted_text})


if __name__ == "__main__":
    application.run()
