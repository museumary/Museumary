from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('home.html')


@app.route('/about')
def about():
    return render_template('about.html')


# This is only used when running locally. When running live, gunicorn runs
# the application.
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
