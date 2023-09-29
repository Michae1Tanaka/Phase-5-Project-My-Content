#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import sys

print(sys.path)

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == "__main__":
    with app.app_context():
        print("Deleting all records...")
        User.query.delete()

        fake = Faker()

        print("Creating users...")

        users = []
        usernames = []

        for _ in range(30):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(username=username)

            user.password_hash = user.username + "password"

            users.append(user)
        test_user = User(username="potato", is_admin=True)
        test_user.password_hash = "potato"
        users.append(test_user)

        db.session.add_all(users)

        db.session.commit()

        print("Complete.")
