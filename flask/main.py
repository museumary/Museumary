"""
Main file where app-engine runs the website
"""

from flask import Flask, render_template, jsonify
from flask_io import FlaskIO, fields
from flask_sqlalchemy import SQLAlchemy
from os import environ
import models
from models import Artist, Work, ArtType, Venue, Medium

app = Flask(__name__)
io = FlaskIO(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route('/')
def index():
    """
    Home and root directory of our site
    """
    return render_template('home.html')


@app.route('/about')
def about():
    """
    The about page
    """
    return render_template('about.html')


@app.route('/types')
def art_forms():
    """
    The types of artworks
    """
    return render_template('types.html')


@app.route('/venues')
def venues():
    """
    The venues pages
    """
    return render_template('venues.html')


@app.route('/works')
def works():
    """
    The artworks page
    """
    return render_template('works.html')


@app.route('/artists')
def artists():
    """
    The artists page
    """
    return render_template('artists.html')


@app.route('/artist')
def artist():
    """
    A artist page
    """
    return render_template('artist.html')


@app.route('/work')
def work():
    """
    A work page
    """
    return render_template('work.html')


@app.route('/venue')
def venue():
    """
    A venue page
    """
    return render_template('venue.html')


@app.route('/type')
def type():
    """
    A type of artwork
    """
    return render_template('type.html')

# API requests

def get_info(page, entries_per_page, num_entries):
    return {
        'page': page,
        'entries_per_page': entries_per_page,
        'num_pages': num_entries // entries_per_page + 1,
        'num_entries': num_entries
    }


@app.route('/api/work/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
def get_works(page, entries_per_page):
    """
    API GET request for all works of art in the database
    """
    works = Work.query
    num_entries = len(works.all())

    # if(sort_by):
    # if(filter):

    # set the number of works given in the response
    if entries_per_page:
        works = works.limit(entries_per_page)
    # set the offset for response pagination
    if page:
        works = works.offset(page)

    works = works.all()
    results = []
    for work in works:
        results.append(get_work_data(work))

    info = get_info(page, entries_per_page, num_entries)

    return jsonify({"info":info, "objects":results})



@app.route('/api/work/<int:work_id>', methods=['GET'])
def get_work(work_id):
    """
    API GET request for a single work given work id
    """
    work = Work.query.filter_by(id=work_id).first()
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



@app.route('/api/artist/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
def get_artists(page, entries_per_page):
    """
    API GET request for all artists in the database
    """
    artists = Artist.query
    num_entries = len(artists.all())

    # set the number of works given in the response
    if entries_per_page:
        artists = artists.limit(entries_per_page)
    # set the offset for response pagination
    if page:
        artists = artists.offset(page)

    info = get_info(page, entries_per_page, num_entries)

    artists = artists.all()

    results = []
    for artist in artists:
        results.append(get_artist_data(artist))

    return jsonify({"info":info, "objects":results})



@app.route('/api/artist/<int:artist_id>', methods=['GET'])
def get_artist(artist_id):
    """
    API GET request for a single artist given its id
    """
    artist = Artist.query.filter_by(id=artist_id).first()
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


@app.route('/api/venue/', methods=['GET'])
def get_venues():
    """
    API GET request for all museums in the database
    """
    venues = Venue.query.all()
    results = []
    for venue in venues:
        results.append(get_venue_data(venue))

    info = get_info(1, 25, len(venues))

    return jsonify({'info':info, 'objects':results})



@app.route('/api/venue/<int:venue_id>', methods=['GET'])
def get_venue(venue_id):
    """
    API GET request for a single museum given its id
    """
    venue = Venue.query.filter_by(id=venue_id).first()
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
        # 'work_ids': [work.id for work in venue.works]
    }
    return result



@app.route('/api/art_type/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
def get_art_types(page, entries_per_page):
    """
    API GET request for all the art_types in the database
    """
    art_types = ArtType.query
    num_entries = len(art_types.all())

    # set the number of works given in the response
    if entries_per_page:
        art_types = art_types.limit(entries_per_page)
    # set the offset for response pagination
    if page:
        art_types = art_types.offset(page)

    info = get_info(page, entries_per_page, num_entries)

    art_types = art_types.all()

    results = []
    for art_type in art_types:
        results.append(get_art_type_data(art_type))

    return jsonify({"info":info, "objects":results})



@app.route('/api/art_type/<int:art_type_id>', methods=['GET'])
def get_art_type(art_type_id):
    """
    API GET request for a single art_type given its id
    """
    art_type = ArtType.query.filter_by(id=art_type_id).first()
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



@app.route('/api/medium/', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('entries_per_page', fields.Integer(missing=25))
def get_mediums(page, entries_per_page):
    """
    API GET request for all media types
    """
    media = Medium.query
    num_entries = len(media.all())

    # set the number of works given in the response
    if entries_per_page:
        media = media.limit(entries_per_page)
    # set the offset for response pagination
    if page:
        media = media.offset(page)

    info = get_info(page, entries_per_page, num_entries)
    media = media.all()

    results = []
    for medium in media:
        results.append(get_medium_data(medium))

    return jsonify({"info":info, "objects":results})



@app.route('/api/medium/<int:medium_id>', methods=['GET'])
def get_medium(medium_id):
    """
    API GET request for a single medium given its id
    """
    medium = Medium.query.filter_by(id=medium_id).first()
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
