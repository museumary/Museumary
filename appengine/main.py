from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('home.html')


@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/art_forms')
def art_forms():
    return render_template('art_forms.html')

@app.route('/venues')
def venues():
    return render_template('venues.html')

@app.route('/works')
def works():
    return render_template('works.html')

@app.route('/artists')
def artists():
    return render_template('artists.html')

# This is only used when running locally. When running live, gunicorn runs
# the application.
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
