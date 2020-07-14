# Third party
from flask import Flask, request, render_template

# Custom
from scripts.caesar import rotate_string

app = Flask(__name__)
app.config['DEBUG'] = False


@app.route("/", methods=['GET'])
def index():
    return render_template("index.html", text="")


@app.route("/", methods=['POST'])
def return_encrypted_text():
    rot = int(request.form["rot"])
    text = request.form["text"]
    encrypted_text = rotate_string(text, rot)
    return render_template("index.html", text=encrypted_text)

    
if __name__ == "__main__":
    app.run()