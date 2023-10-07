#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Content, Tag, content_tags

if __name__ == "__main__":
    with app.app_context():
        print("Deleting all records...")
        User.query.delete()
        Content.query.delete()
        Tag.query.delete()

        fake = Faker()

        print("Creating users...")

        users = []
        usernames = []

        for _ in range(10):
            username = fake.first_name()[:23]
            while not username or username in usernames:
                username = fake.first_name()[:23]
            usernames.append(username)
            user = User(username=username)
            user.password_hash = fake.password(
                length=8,
                special_chars=False,
                upper_case=False,
                lower_case=True,
                digits=True,
            )
            users.append(user)
        test_user = User(username="potatoes")
        test_user.password_hash = "potatoes"
        users.append(test_user)

        db.session.add_all(users)

        db.session.commit()
        print("Users Completed!")

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
            title = fake.sentence()[:64]
            creator = (
                fake.first_name()
                + " "
                + fake.last_name()[: 23 - len(fake.first_name()) - 1]
            )
            description = fake.sentence(nb_words=10)
            while not 16 <= len(description) <= 64:
                description = fake.sentence(nb_words=10)

            if x <= 45:
                content_type = "Video"
                url = rc(video_links)
                default_thumbnail = fake.image_url()
            elif 46 <= x <= 50:
                content_type = "Video"
                url = rc(video_links)
                default_thumbnail = None
            elif 51 <= x <= 95:
                content_type = "Article"
                url = rc(articles_links)
                default_thumbnail = fake.image_url()
            else:
                content_type = "Article"
                url = rc(articles_links)
                default_thumbnail = None

            content = Content(
                title=title,
                creator=creator,
                description=description,
                uploaded_at=fake.date_time_between(start_date="-1y", end_date="now"),
                created_at=fake.date_time_between(start_date="-2y", end_date="-1y"),
                user_id=rc(user_ids),
                type=content_type,
                thumbnail=default_thumbnail,
                url=url,
            )

            content_data.append(content)

        db.session.add_all(content_data)
        db.session.commit()
        print("Content Created!")

        print("Creating Tags...")
        TAGS = [
            "Python",
            "Javascript",
            "React",
            "SQL",
            "SQLite",
            "SQLAlchemy",
            "Family",
            "Fun",
            "Educational",
            "Video Games",
            "Cars",
            "Experiment",
        ]
        tags = []
        for tag in TAGS:
            new_tag = Tag(name=tag)
            tags.append(new_tag)

        db.session.add_all(tags)
        db.session.commit()

        print("Tags Completed!")

        for content in content_data:
            available_tags = list(Tag.query.all())
            tag = rc(available_tags)
            if tag not in content.tags:
                content.tags.append(tag)

        db.session.commit()
