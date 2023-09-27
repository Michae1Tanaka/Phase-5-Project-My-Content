#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
import os
from dotenv import load_dotenv


# Local imports
from config import app, db, api

# Add your model imports


load_dotenv()
secret_key = os.environ.get("Test")
print(secret_key)

# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
