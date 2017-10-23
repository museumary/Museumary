"""
Main file where app-engine runs the website
"""

from flask import Flask, render_template
from models import db, Artist, Work, ArtType, Venue, Medium

app = Flask(__name__)


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

@app.route('/api/work', methods=['GET'])
@io.from_query('page', fields.Integer(missing=1))
@io.from_query('works_per_page', fields.Integer(missing=25))
def get_works():
    """
    API GET request for all works of art in the database
    """
    works = Work.query
    num_works = len(works)
    num_pages = num_works // works_per_page + 1

    # if(sort_by):
    # if(filter):

    # set the number of works given in the response
    if works_per_page:
        works = works.limit(works_per_page)
    # set the offset for response pagination
    if page:
        works = works.offset(page)

    info = {
        "page":page,
        "works_per_page":works_per_page,
        "num_works":num_works,
    }

    return jsonify({"info":info, "works":works.all()})


@app.route('/api/work/<int:work_id>', methods=['GET'])
def get_work(work_id):
    """
    API GET request for a single work given work id
    """
    return Work.query.filter_by(id=work_id).first()


@app.route('/api/artist', methods=['GET'])
def get_artists():
    """
    API GET request for all artists in the database
    """

@app.route('/api/artist/<int:artist_id', methods=['GET'])
def get_artist(artist_id):
    """
    API GET request for a single artist given its id
    """
    return Artist.query.filter_by(id=artist_id).first()

@app.route('/api/venue', methods=['GET'])
def get_venues():
    """
    API GET request for all museums in the database
    """

@app.route('/api/venue/<int:venue_id', methods=['GET'])
def get_venue(venue_id):
    """
    API GET request for a single museum given its id
    """
    return Venue.query.filter_by(id=venue_id).first()

@app.route('/api/art_type/', methods=['GET'])
def get_art_types():
    """
    API GET request for all the art_types in the database
    """

@app.route('/api/art_type/<int:art_type_id>', methods=['GET'])
def get_art_type():
    """
    API GET request for a single art_type given its id
    """
    return ArtType.query.filter_by(id=art_type_id).first()

# @app.route('/api/medium', methods=['GET'])
# def get_mediums():
#     """
#     API GET request for a single art_type given its id
#     """
# @app.route('/api/medium/<int:medium_id')


if __name__ == '__main__':
    """
    This is only used when running locally. When running live, gunicorn runs
    the application.
    """
    app.run(host='127.0.0.1', port=8080, debug=True)
