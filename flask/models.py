from flask import Flask
from flask_sqlalchemy import SQLAlchemy, BaseQuery
from sqlalchemy.ext.declarative import declarative_base
from os import environ
from sqlalchemy_searchable import make_searchable, search, SearchQueryMixin
from sqlalchemy_utils.types import TSVectorType


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

make_searchable()

class ArtistQuery(BaseQuery, SearchQueryMixin):
    pass
class VenueQuery(BaseQuery, SearchQueryMixin):
    pass
class ArtTypeQuery(BaseQuery, SearchQueryMixin):
    pass
class MediumQuery(BaseQuery, SearchQueryMixin):
    pass
class WorkQuery(BaseQuery, SearchQueryMixin):
    pass

artist_to_art_type = db.Table(
    'artist_to_art_type',
    db.Column('artist_id', db.Integer, db.ForeignKey('artist.id'), primary_key=True),
    db.Column('art_type_id', db.Integer, db.ForeignKey('art_type.id'), primary_key=True),
)

class Artist(db.Model):
    query_class = ArtistQuery
    __tablename__ = 'artist'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    birth = db.Column(db.Integer)
    death = db.Column(db.Integer)
    birthplace = db.Column(db.String(128))
    deathplace = db.Column(db.String(128))
    culture = db.Column(db.String(64))
    image_url = db.Column(db.String(512))

    search_vector = db.Column(TSVectorType('name', 'birthplace', 'deathplace', 'culture'))

    def __repr__(self):
        return '<Artist %s>' % self.name


class Venue(db.Model):
    query_class = VenueQuery
    __tablename__ = 'venue'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    street = db.Column(db.String(128))
    city = db.Column(db.String(64))
    country = db.Column(db.String(64))
    zipcode  = db.Column(db.String(64))
    works = db.relationship("Work", back_populates="venue")

    search_vector = db.Column(TSVectorType('name', 'street', 'city', 'country', 'zipcode'))

    def __repr__(self):
        return '<Venue %s>' % self.name


class ArtType(db.Model):
    query_class = ArtTypeQuery
    __tablename__ = 'art_type'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    media = db.relationship("Medium", back_populates="art_type")
    works = db.relationship("Work", backref="art_type")
    artists = db.relationship(
        'Artist',
        secondary=artist_to_art_type, 
        lazy='subquery',
        backref=db.backref('art_types', lazy=True)
    )

    search_vector = db.Column(TSVectorType('name'))

    def __repr__(self):
        return '<ArtType %s>' % self.name


class Medium(db.Model):
    query_class = MediumQuery
    __tablename__ = 'medium'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    art_type_id = db.Column(db.Integer, db.ForeignKey('art_type.id'))
    art_type = db.relationship("ArtType", back_populates="media")
    works = db.relationship("Work", back_populates="medium")

    search_vector = db.Column(TSVectorType('name'))

    def __repr__(self):
        return '<Medium %s>' % self.name


class Work(db.Model):
    query_class = WorkQuery
    __tablename__ = 'work'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'))
    artist = db.relationship("Artist", backref="works")
    art_type_id = db.Column(db.Integer, db.ForeignKey('art_type.id'))
    medium = db.relationship("Medium", back_populates="works")
    medium_id = db.Column(db.Integer, db.ForeignKey('medium.id'))
    date = db.Column(db.String(128))
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'))
    venue = db.relationship("Venue", back_populates="works")
    image_url = db.Column(db.String(512))
    description = db.Column(db.String(1024))

    search_vector = db.Column(TSVectorType('name', 'date'))

    def __repr__(self):
        return '<Work %s>' % self.name

if __name__=='__main__':
    db.configure_mappers()
    db.create_all()
    db.session.commit()

