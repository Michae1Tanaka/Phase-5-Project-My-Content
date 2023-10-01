#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Content

if __name__ == "__main__":
    with app.app_context():
        print("Deleting all records...")
        User.query.delete()
        Content.query.delete()

        fake = Faker()

        print("Creating users...")

        users = []
        usernames = []

        for _ in range(10):
            username = fake.first_name() + "user"
            while not username or username in usernames:
                username = fake.first_name() + "user"

            usernames.append(username)

            user = User(username=username)
            user.password_hash = username + "password"

            users.append(user)
        test_user = User(username="potatoes")
        test_user.password_hash = "potatoes"
        users.append(test_user)

        db.session.add_all(users)

        db.session.commit()
        print("Users Completed")

        print("Creating Content...")

        video_links = [
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
            "https://www.youtube.com/watch?v=rfscVS0vtbw&ab_channel=freeCodeCamp.org",
            "https://www.youtube.com/watch?v=u6gSSpfsoOQ&ab_channel=freeCodeCamp.org",
            "https://www.youtube.com/watch?v=Z1RJmh_OqeA&ab_channel=freeCodeCamp.org",
            "https://www.youtube.com/watch?v=0sOvCWFmrtA&ab_channel=freeCodeCamp.org",
            "https://www.youtube.com/watch?v=yBDHkveJUf4&ab_channel=freeCodeCamp.org",
            "https://www.youtube.com/watch?v=Z1RJmh_OqeA&t=3s&ab_channel=freeCodeCamp.org",
            "https://www.youtube.com/watch?v=byHcYRpMgI4&ab_channel=freeCodeCamp.org",
            "https://www.youtube.com/watch?v=HXV3zeQKqGY&ab_channel=freeCodeCamp.org",
        ]

        articles_links = [
            "https://realpython.com/preview/python-tuple/#getting-started-with-pythons-tuple-data-type",
            "https://realpython.com/preview/python312-new-features/",
            "https://realpython.com/python312-typing/",
        ]

        user_ids = [user.id for user in User.query.all()]

        content_data = []

        for x in range(100):
            content = Content(
                title=fake.sentence(),
                creator=fake.name(),
                thumbnail=fake.image_url(),
                description=fake.sentence(),
                uploaded_at=fake.date_time_between(start_date="-1y", end_date="now"),
                created_at=fake.date_time_between(start_date="-2y", end_date="-1y"),
                user_id=rc(user_ids),
            )
            if x < 33:
                content.type = "Video"
                content.url = rc(video_links)
            elif 33 <= x < 66:
                content.type = "Article"
                content.url = rc(articles_links)
            else:
                content.type = "Other"
                content.url = fake.url()

            content_data.append(content)

        db.session.add_all(content_data)
        db.session.commit()
        print("Content Created!")
