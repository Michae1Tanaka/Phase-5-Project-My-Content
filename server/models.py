from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt


content_tags = db.Table(
    "content_tags",
    db.Column("content_id", db.Integer, db.ForeignKey("content.id"), primary_key=True),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"), primary_key=True),
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-password_hash", "-_password_hash", "-content")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(24), unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    content = db.relationship(
        "Content", backref="user", lazy="dynamic", cascade="all,delete-orphan"
    )

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
        if not 3 <= len(username) <= 24:
            raise ValueError("Username must be between and 24 characters.")
        if not username:
            raise ValueError("You must input a username.")
        user_check = User.query.filter_by(username=username).first()
        if user_check:
            raise ValueError(f"This username is already in use.")
        return username


class Content(db.Model, SerializerMixin):
    __tablename__ = "content"

    serialize_rules = ("-user_id",)

    id = db.Column(db.Integer, primary_key=True)
    _creator = db.Column(
        "creator", db.String(24), nullable=False, server_default="Unknown"
    )
    title = db.Column(db.String(64), nullable=False)
    _thumbnail = db.Column("thumbnail", db.String)
    description = db.Column(db.String(64), nullable=False)
    uploaded_at = db.Column(db.DateTime, server_default=db.func.now())
    created_at = db.Column(db.DateTime, nullable=True)
    url = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    tags = db.relationship(
        "Tag", secondary=content_tags, backref="content", lazy="dynamic"
    )

    @validates("title")
    def validate_title(self, key, title):
        if not 3 <= len(title) <= 64:
            raise ValueError("Title must be between 3 and 64 characters.")
        return title

    @validates("type")
    def validate_type(self, key, content_type):
        if content_type not in ["Video", "Article"]:
            raise ValueError('Type must be either "Video" or "Article".')
        return content_type

    @validates("description")
    def validate_description(self, key, description):  # Fixed typo in function name
        if not description:
            raise ValueError("Description is required.")
        if not 16 <= len(description) <= 64:
            raise ValueError("Descriptions must be between 16 and 64 characters.")
        return description

    @hybrid_property
    def creator(self):
        return self._creator

    @creator.setter
    def creator(self, creator):
        if not creator:
            self._creator = "Unknown"

    @hybrid_property
    def thumbnail(self):
        return self._thumbnail

    @thumbnail.setter
    def thumbnail(self, thumbnail):
        if not thumbnail:
            if self.type == "Video":
                self._thumbnail = "https://www.keytechinc.com/wp-content/uploads/2022/01/video-thumbnail.jpg"
            elif self.type == "Article":
                self._thumbnail = "https://www.intl-spectrum.com/articles/r75/ArticleDefault.jpg?x=528x372"
        else:
            self._thumbnail = thumbnail

    def __repr__(self):
        return f"<Content(id={self.id}, title='{self.title}', creator='{self.creator}',description={self.description}, type={self.type},created_at = {self.created_at}, uploaded_at={self.uploaded_at})>"


class Tag(db.Model, SerializerMixin):
    __tablename__ = "tags"

    serialize_rules = ("-content",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), nullable=False, unique=True)

    @validates("name")
    def validate_name(self, key, name):
        if not 1 <= len(name) <= 16:
            raise ValueError("Tag name must be between 1 and 16 characters.")
        return name

    def __repr__(self):
        return f"<Tag(id={self.id}, name='{self.name}')>"
