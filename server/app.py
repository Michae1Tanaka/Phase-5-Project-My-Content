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


@app.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        user = User.query.filter_by(username=data.get("username")).first()
        if user and user.authenticate(data.get("password")):
            session["user_id"] = user.id
            return jsonify(user.to_dict()), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401


class Users(Resource):
    def get(self):
        users = User.query.all()
        if not users:
            return [], 200

        return [user.to_dict() for user in users], 200


api.add_resource(Users, "/users")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
