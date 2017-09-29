"""
Main file where app-engine runs the website
"""
from flask import Flask, render_template

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


if __name__ == '__main__':
    """
    This is only used when running locally. When running live, gunicorn runs
    the application.
    """
    app.run(host='127.0.0.1', port=8080, debug=True)
