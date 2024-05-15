from flask import Flask
from flask import render_template 
from flask import Response, request, jsonify
from flask import sessions
import json
import random

app = Flask(__name__)
app.secret_key = 'super secret key'

@app.route('/')
def index():
    return render_template('homepage.html')

@app.route('/home')
def home():
    return render_template('homepage.html')

@app.route('/search')
def search():
    query = request.args.get('query', '')  # Get the 'query' parameter from the request
    result = []
    return render_template('search.html', query=query, result=result)

@app.route('/articles')
def articles():
    return render_template('articles.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)