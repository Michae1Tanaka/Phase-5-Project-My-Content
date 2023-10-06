#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Content

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


@app.route("/logout", methods=["DELETE"])
def logout():
    if session.get("user_id"):
        session.clear()
        return {}, 204
    else:
        return {"message": "Unauthorized Request"}, 401


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter_by(id=session["user_id"]).first()
            return user.to_dict(), 200
        elif not user_id:
            return {"message": "Unauthorized Request."}, 401


class UserAccount(Resource):
    def post(self):
        data = request.get_json()
        usernames = [user.username for user in User.query.all()]

        username = data.get("username")
        remember_me = data.get("remember_me")

        if username in usernames:
            return {"message": "That username is already taken."}, 409

        if not username or not data.get("password"):
            return {"message": "Username and password are required."}, 422

        user = User(username=username)

        if len(data.get("password")) < 8:
            return {"message": "Passwords must be at least 8 characters."}, 400

        user.password_hash = data.get("password")

        db.session.add(user)
        db.session.commit()

        session["user_id"] = user.id
        if remember_me:
            session.permanent = True
        else:
            session.permanent = False

        return user.to_dict(), 201

    def delete(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter_by(id=user_id).first()
            if user:
                db.session.delete(user)
                db.session.commit()
                return ({},)
            else:
                return {"message": "User not found"}, 404
        else:
            return {"message": "Unauthorized Request."}, 401

    def patch(self):
        user_id = session.get("user_id")
        user_to_update = User.query.filter_by(id=user_id).first()
        updated_data = request.get_json()
        username = updated_data.get("username", "")
        password = updated_data.get("password", "")
        usernames = [user.username for user in User.query.all()]
        if not user_to_update:
            return {"message": "User Not Found"}, 404
        if (
            username
            and username != user_to_update.username
            and username not in usernames
        ):
            user_to_update.username = username
        else:
            return {"message": "That username is already taken."}, 409
        if password and len(password) >= 8:
            user_to_update.password_hash = password
        else:
            return ({"message": "Passwords must be at least 8 characters."},), 400
        db.session.add(user_to_update)
        db.session.commit()

        return user_to_update.to_dict(), 200


class Videos(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            videos = Content.query.filter_by(user_id=user_id, type="Video").all()
            return [video.to_dict() for video in videos], 200
        else:
            return {"message": "Unauthorized Request."}, 401


class Articles(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            articles = Content.query.filter_by(user_id=user_id, type="Article").all()
            return [article.to_dict() for article in articles], 200
        else:
            return {"message": "Unauthorized Request."}, 401


class UserContent(Resource):
    def post(self):
        user = User.query.filter_by(id=session.get("user_id")).first()
        if not user:
            return {"message": "User not found."}, 404
        content_data = request.get_json()
        mandatory_fields = ["title", "thumbnail", "description", "url", "type"]
        for field in mandatory_fields:
            if field not in content_data:
                return {"message": f"Missing field: {field}"}, 400

        new_content = Content(
            creator=content_data.get("creator"),
            title=content_data["title"],
            thumbnail=content_data["thumbnail"],
            description=content_data["description"],
            uploaded_at=db.func.now(),
            created_at=content_data.get("created_at", db.func.now()),
            url=content_data["url"],
            type=content_data["type"],
            user_id=user.id,
        )

        try:
            db.session.add(new_content)
            db.session.commit()
            return new_content.to_dict(), 201
        except Exception:
            db.session.rollback()
            return {
                "message": "Failed to create content. Please try again later.",
                "error": str(Exception),
            }, 500


api.add_resource(UserAccount, "/account")
api.add_resource(CheckSession, "/check_session")
api.add_resource(Videos, "/videos")
api.add_resource(Articles, "/articles")
api.add_resource(UserContent, "/content")
if __name__ == "__main__":
    app.run(port=5555, debug=True)
