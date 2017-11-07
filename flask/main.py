"""
Main file where app-engine runs the website
"""

from flask import Flask, render_template, jsonify, make_response
from flask_io import FlaskIO, fields
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from os import environ
import models
from models import Artist, Work, ArtType, Venue, Medium

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
io = FlaskIO(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

def get_info(page, entries_per_page, num_entries):
    """
    Fill in information for responses containing
    page number, entries_per_page, and total pages and entries
    """
    return {
        'page': page,
        'entries_per_page': entries_per_page,
        'num_pages': num_entries // entries_per_page + 1,
        'num_entries': num_entries
    }

#-------------------#
# Work API Requests #
#-------------------#

@app.route('/work/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
@io.from_query('order_by', fields.String(missing="name"))
@io.from_query('order', fields.String(missing="ascending"))
@io.from_query('startswith', fields.String(missing=None))
@io.from_query('art_type', fields.String(missing=None))
@io.from_query('medium', fields.String(missing=None))
@io.from_query('venue', fields.String(missing=None))
def get_works(page, entries_per_page, **kwargs):
    """
    API GET request for all works of art in the database
    """
    works = Work.query

    # order results according to passed arguments
    if kwargs['order_by']:
        if kwargs['order'] == 'ascending':
            works = works.order_by(getattr(Work, kwargs['order_by']))
        elif kwargs['order'] == 'descending':
            works = works.order_by(desc(getattr(Work, kwargs['order_by'])))

    # filter response by given parameters
    if kwargs['startswith']:
        works = works.filter(Work.name.startswith(kwargs['startswith']))
    if kwargs['art_type']:
        works = works.join(ArtType).filter(ArtType.name.ilike(kwargs['art_type']))
    if kwargs['medium']:
        works = works.join(Medium).filter(Medium.name.ilike(kwargs['medium']))
    if kwargs['venue']:
        works = works.join(Venue).filter(Venue.name.ilike(kwargs['venue']))

    # get total number of results before applying limit to query
    num_entries = len(works.all())

    # set the number of works and the page offset
    # for response pagination
    works = works.limit(entries_per_page)
    offset = (page - 1) * entries_per_page
    works = works.offset(offset)

    # build response from query results
    works = works.all()
    results = []
    for work in works:
        results.append(get_work_data(work))

    info = get_info(page, entries_per_page, num_entries)
    return jsonify({"info":info, "objects":results})

@app.route('/work/<int:work_id>', methods=['GET'])
def get_work(work_id):
    """
    API GET request for a single work given work id
    """
    work = Work.query.filter_by(id=work_id).first_or_404()
    result = get_work_data(work)
    return jsonify(result)

def get_work_data(work):
    return {
        'id': work.id,
        'name': work.name,
        'artist_id': work.artist_id,
        'art_type_id': work.art_type_id,
        'medium_id': work.medium_id,
        'date': work.date,
        'venue_id': work.venue_id,
        'image_url': work.image_url
    }

#---------------------#
# Artist API Requests #
#---------------------#

@app.route('/artist/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
@io.from_query('order_by', fields.String(missing="name"))
@io.from_query('order', fields.String(missing="ascending"))
@io.from_query('startswith', fields.String(missing=None))
@io.from_query('culture', fields.String(missing=None))
@io.from_query('date_lower', fields.Integer(missing=0))
@io.from_query('date_upper', fields.Integer(missing=3000))
def get_artists(page, entries_per_page, **kwargs):
    """
    API GET request for all artists in the database
    """
    artists = Artist.query

    # order results according to passed arguments
    if kwargs['order_by']:
        if kwargs['order'] == 'ascending':
            artists = artists.order_by(getattr(Artist, kwargs['order_by']))
        elif kwargs['order'] == 'descending':
            artists = artists.order_by(desc(getattr(Artist, kwargs['order_by'])))

    # filter response by given parameters
    if kwargs['startswith']:
        artists = artists.filter(Artist.name.startswith(kwargs['startswith']))
    if kwargs['culture']:
        artists = artists.filter(Artist.culture.ilike(kwargs['culture']))

    # get total number of results before applying limit to query
    num_entries = len(artists.all())

    # set the number of works and the page offset
    # for response pagination
    artists = artists.limit(entries_per_page)
    offset = (page - 1) * entries_per_page
    artists = artists.offset(offset)

    # build response from query results
    artists = artists.all()
    results = []
    for artist in artists:
        results.append(get_artist_data(artist))

    info = get_info(page, entries_per_page, num_entries)
    return jsonify({"info":info, "objects":results})

@app.route('/artist/<int:artist_id>', methods=['GET'])
def get_artist(artist_id):
    """
    API GET request for a single artist given its id
    """
    artist = Artist.query.filter_by(id=artist_id).first_or_404()
    result = get_artist_data(artist)
    return jsonify(result)

def get_artist_data(artist):
    return {
        'id': artist.id,
        'name': artist.name,
        'birth': artist.birth,
        'death': artist.death,
        'birthplace': artist.birthplace,
        'deathplace': artist.deathplace,
        'culture': artist.culture,
        'image_url': artist.image_url,
        'art_type_ids': [art_type.id for art_type in artist.art_types],
        'work_ids': [work.id for work in artist.works]
    }

#--------------------#
# Venue API Requests #
#--------------------#

@app.route('/venue/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
@io.from_query('order_by', fields.String(missing="name"))
@io.from_query('order', fields.String(missing="ascending"))
@io.from_query('startswith', fields.String(missing=None))
@io.from_query('country', fields.String(missing=None))
def get_venues(page, entries_per_page, **kwargs):
    """
    API GET request for all museums in the database
    """
    venues = Venue.query

    # order results according to passed arguments
    if kwargs['order_by']:
        if kwargs['order'] == 'ascending':
            venues = venues.order_by(getattr(Venue, kwargs['order_by']))
        elif kwargs['order'] == 'descending':
            venues = venues.order_by(desc(getattr(Venue, kwargs['order_by'])))

    # filter response by given parameters
    if kwargs['startswith']:
        venues = venues.filter(Venue.name.startswith(kwargs['startswith']))
    if kwargs['country']:
        venues = venues.filter(Venue.country.ilike(kwargs['country']))

    # get total number of results before applying limit to query
    num_entries = len(venues.all())

    # set the number of works and the page offset
    # for response pagination
    venues = venues.limit(entries_per_page)
    offset = (page - 1) * entries_per_page
    venues = venues.offset(offset)

    # create response from query results
    venues = venues.all()
    results = []
    for venue in venues:
        results.append(get_venue_data(venue))

    info = get_info(page, entries_per_page, num_entries)
    return jsonify({'info':info, 'objects':results})

@app.route('/venue/<int:venue_id>', methods=['GET'])
def get_venue(venue_id):
    """
    API GET request for a single museum given its id
    """
    venue = Venue.query.filter_by(id=venue_id).first_or_404()
    result = get_venue_data(venue)
    return jsonify(result)

def get_venue_data(venue):
    result = {
        'id':       venue.id,
        'name':     venue.name,
        'street':   venue.street,
        'city':     venue.city,
        'country':  venue.country,
        'zipcode':  venue.zipcode,
        'work_ids': [work.id for work in venue.works]
    }
    return result

#----------------------#
# ArtType API Requests #
#----------------------#

@app.route('/art_type/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
@io.from_query('order_by', fields.String(missing="name"))
@io.from_query('order', fields.String(missing="ascending"))
@io.from_query('startswith', fields.String(missing=None))
@io.from_query('medium', fields.String(missing=None))
@io.from_query('artist', fields.String(missing=None))
def get_art_types(page, entries_per_page, **kwargs):
    """
    API GET request for all the art_types in the database
    """
    art_types = ArtType.query

    # order results according to passed arguments
    if kwargs['order_by']:
        if kwargs['order'] == 'ascending':
            art_types = art_types.order_by(getattr(ArtType, kwargs['order_by']))
        elif kwargs['order'] == 'descending':
            art_types = art_types.order_by(desc(getattr(ArtType, kwargs['order_by'])))

    # filter response by given parameters
    if kwargs['startswith']:
        art_types = art_types.filter(ArtType.name.startswith(kwargs['startswith']))
    if kwargs['medium']:
        art_types = art_types.join(Medium).filter(Medium.name.ilike(kwargs['medium']))
    # if kwargs['artist']:
    #     art_types = art_types.join(Artist).filter(Artist.name.ilike(kwargs['artist']))

    # get total number of results before applying limit to query
    num_entries = len(art_types.all())

    # set the number of works and the page offset
    # for response pagination
    art_types = art_types.limit(entries_per_page)
    offset = (page - 1) * entries_per_page
    art_types = art_types.offset(offset)

    # create response from query results
    art_types = art_types.all()
    results = []
    for art_type in art_types:
        results.append(get_art_type_data(art_type))

    info = get_info(page, entries_per_page, num_entries)
    return jsonify({"info":info, "objects":results})

@app.route('/art_type/<int:art_type_id>', methods=['GET'])
def get_art_type(art_type_id):
    """
    API GET request for a single art_type given its id
    """
    art_type = ArtType.query.filter_by(id=art_type_id).first_or_404()
    result = get_art_type_data(art_type)
    return jsonify(result)

def get_art_type_data(art_type):
    result = {
        'id':           art_type.id,
        'name':         art_type.name,
        'artist_ids':   [artist.id for artist in art_type.artists],
        'medium_ids':   [medium.id for medium in art_type.media],
        'work_ids':     [work.id for work in art_type.works]
    }
    return result

#---------------------#
# Medium API Requests #
#---------------------#

@app.route('/medium/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
@io.from_query('order_by', fields.String(missing="name"))
@io.from_query('order', fields.String(missing="ascending"))
def get_mediums(page, entries_per_page, **kwargs):
    """
    API GET request for all media types
    """
    media = Medium.query

    # order results according to passed arguments
    if kwargs['order_by']:
        if kwargs['order'] == 'ascending':
            media = media.order_by(getattr(Medium, kwargs['order_by']))
        elif kwargs['order'] == 'descending':
            media = media.order_by(desc(getattr(Medium, kwargs['order_by'])))

    # get total number of results before applying limit to query
    num_entries = len(media.all())

    # set the number of works and the page offset
    # for response pagination
    media = media.limit(entries_per_page)
    offset = (page - 1) * entries_per_page
    media = media.offset(offset)

    media = media.all()
    results = []
    for medium in media:
        results.append(get_medium_data(medium))

    info = get_info(page, entries_per_page, num_entries)
    return jsonify({"info":info, "objects":results})

@app.route('/medium/<int:medium_id>', methods=['GET'])
def get_medium(medium_id):
    """
    API GET request for a single medium given its id
    """
    medium = Medium.query.filter_by(id=medium_id).first_or_404()
    result = get_medium_data(medium)
    return jsonify(result)

def get_medium_data(medium):
    return {
        'id': medium.id,
        'name': medium.name,
        'art_type_id': medium.art_type_id,
        'work_ids': [work.id for work in medium.works]
    }


if __name__ == '__main__':
    """
    This is only used when running locally. When running live, gunicorn runs
    the application.
    """
    app.run(host='127.0.0.1', port=8080, debug=True)
