from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('home.html')


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/types')
def art_forms():
    return render_template('types.html')

@app.route('/venues')
def venues():
    return render_template('venues.html')

@app.route('/works')
def works():
    return render_template('works.html')

@app.route('/artists')
def artists():
    return render_template('artists.html')

@app.route('/artist')
def artist():
    return render_template('artist.html')

@app.route('/work')
def work():
    return render_template('work.html')

@app.route('/venue')
def venue():
    return render_template('venue.html')

@app.route('/type')
def type():
    return render_template('type.html')

# This is only used when running locally. When running live, gunicorn runs
# the application.
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
