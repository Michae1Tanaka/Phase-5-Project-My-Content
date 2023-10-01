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
        username = data.get("username")
        password = data.get("password")
        remember_me = data.get("remember_me", False)
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            if remember_me:
                session.permanent = True
            else:
                session.permanent = False

            return jsonify(user.to_dict()), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401


class SignUp(Resource):
    def post(self):
        data = request.get_json()
        usernames = [user.username for user in User.query.all()]

        username = data.get("username")
        remember_me = data.get("remember_me")

        if username in usernames:
            return {"message": "That username is already taken."}, 409

        if not username or not data.get("password"):
            return {"message": "Username and password are required."}, 422

        user = User(username=username, is_admin=False)

        if len(data.get("password")) < 8:
            return {"message": "Passwords must be at least 8 characters."}

        user.password_hash = data.get("password")

        session["user_id]"] = user.id
        if remember_me:
            session.permanent = True
        else:
            session.permanent = False

        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201


class Users(Resource):
    def get(self):
        users = User.query.all()
        if not users:
            return [], 200

        return [user.to_dict() for user in users], 200


api.add_resource(Users, "/users")
api.add_resource(SignUp, "/signup")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
