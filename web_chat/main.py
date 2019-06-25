#!/usr/bin/env python
import os

from flask import Flask, jsonify, request
from google.cloud import firestore

import runner, coffeeshop

RUN_ENV = os.getenv("RUN_ENV", "testing")

if RUN_ENV == "production":
    app = Flask(__name__, static_folder="build/")
else:
    app = Flask(__name__, static_folder="build/", static_url_path="")

db = firestore.Client()

@app.route("/", methods=["GET"])
def handle_main():
    return app.send_static_file("index.html")

@app.route("/handleUserInput", methods=["POST"])
def handle_input():
    payload = request.get_json()
    user_input = payload["text"]
    session_id = payload["sessionId"]

    state_ref = db.collection("session_states").document(session_id)

    state = state_ref.get().to_dict() or \
        {"control_stack": ["entry_comp"], "session_id": session_id}

    state, responses = runner.get_response(coffeeshop, state, user_input)

    state_ref.set(state)

    return jsonify({
        "author": "them",
        "type": "text",
        "data": {
            "text": ", ".join(responses)}
        })

@app.route('/_ah/warmup')
def warmup():
    # Handle your warmup logic here
    return '', 200, {}


if __name__ == "__main__":
    app.run()
