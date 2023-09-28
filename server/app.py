#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User

# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


class Users(Resource):
    def get(self):
        users = User.query.all()
        if not users:
            return [], 200

        return [user.to_dict() for user in users], 200


api.add_resource(Users, "/users")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
