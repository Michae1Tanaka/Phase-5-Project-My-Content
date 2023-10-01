from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-password_hash", "-_password_hash", "-content")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    content = db.relationship("Content", backref="user", lazy="dynamic")

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        if not password:
            raise ValueError("Users must enter a password.")
        if len(password) < 8:
            raise ValueError("Passwords must be at least 8 characters.")
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    @validates("username")
    def validates_username(self, key, username):
        if not username:
            raise ValueError("You must input a username.")
        user_check = User.query.filter_by(username=username).first()
        if user_check:
            raise ValueError(f"This username is already in use.")
        return username

    def __repr__(self):
        return f"Username: {self.username}"


class Content(db.Model, SerializerMixin):
    __tablename__ = "content"

    serialize_rules = "-user_id"

    id = db.Column(db.Integer, primary_key=True)
    creator = db.Column(db.String, nullable=False, server_default="Unknown")
    title = db.Column(db.String, nullable=False)
    thumbnail = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    uploaded_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime)
    url = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
