from flask import Flask
from flask import request
from flask import jsonify
import json

app = Flask(__name__)
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
