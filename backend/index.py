from flask import Flask
from flask import request
from flask import jsonify
import json
from flask_cors import CORS

app = Flask(__name__)

# enable CORS since the back-end is on a different place than th front-end
CORS(app)

app.debug = True

settings_file = 'settings.json'

@app.route("/vmix-remote/settings", methods=['GET', 'POST'])
def settings():
    if request.method == 'POST':
        # store the settings
        with open(settings_file, 'wb') as file:
            file.write(request.data)
            return jsonify({"ok": True})
    else:
        # load the settings
        with open(settings_file, 'r') as file:
            return jsonify(json.load(file))

if __name__ == "__main__":
    app.run()
