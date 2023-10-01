from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-password_hash", "-_password_hash")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
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

    @validates("password")
    def validates_password(self, key, password):
        if not password:
            raise ValueError("Users must enter a password.")
        if len(password) < 8:
            raise ValueError("Passwords must be at least 8 characters.")

    def __repr__(self):
        return f"Username: {self.username}"
