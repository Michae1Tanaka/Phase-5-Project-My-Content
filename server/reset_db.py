from config import app, db
from flask_migrate import upgrade
from sqlalchemy_utils import database_exists, drop_database
from models import User, Content, Tag, content_tags


def reset_database():
    with app.app_context():
        database_url = app.config["SQLALCHEMY_DATABASE_URI"]
        print("Deleting all records...")
        User.query.delete()
        Content.query.delete()
        Tag.query.delete()

        if database_exists(database_url):
            print("Dropping existing database...")
            drop_database(database_url)

        print("Applying migrations...")
        upgrade()

        print("Database reset completed!")


if __name__ == "__main__":
    reset_database()
