from flask import Flask
from flask import render_template 
from flask import Response, request, jsonify
from flask import sessions
from flask import abort
import json
import random
from article_list import math_article_list, cs_article_list
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'super secret key'

@app.route('/articlespec/<article>')
def articlespec(article):
    # Assuming article_list is a dictionary with article names as keys and filenames as values
    if article not in math_article_list and article not in cs_article_list:
        abort(404)

    if article in math_article_list:
        filename = math_article_list[article]['filename']
        title = math_article_list[article]['title']
        author = math_article_list[article]['author']

        publish_date = math_article_list[article]['publish-date']
        date = datetime.strptime(publish_date, '%Y-%m-%d')
        formatted_date = date.strftime('%B %Y')
    
    elif article in cs_article_list:
        filename = cs_article_list[article]['filename']
        title = cs_article_list[article]['title']
        author = cs_article_list[article]['author']

        publish_date = cs_article_list[article]['publish-date']
        date = datetime.strptime(publish_date, '%Y-%m-%d')
        formatted_date = date.strftime('%B %Y')

    if filename is None:
        abort(404)  

    full_path = os.path.join('latex_converter', filename)
    with open(full_path, 'r') as file:
        article_content = file.read()
    return render_template('articlespec.html', content=article_content, title=title, author=author, date=formatted_date)

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

    # Search in math_article_list
    for key, article in math_article_list.items():
        full_path = os.path.join('latex_converter', article['filename'].split('.txt')[0] + '.tex')
        with open(full_path, 'r') as file:
            content = file.read()
        if query in content or query in article['title'] or query in article['author']:
            result.append({'key': key, 'title': article['title'], 'author': article['author']})

    # Search in cs_article_list
    for key, article in cs_article_list.items():
        full_path = os.path.join('latex_converter', article['filename'].split('.txt')[0] + '.tex')
        with open(full_path, 'r') as file:
            content = file.read()
        if query in content or query in article['title'] or query in article['author']:
            result.append({'key': key, 'title': article['title'], 'author': article['author']})

    return render_template('search.html', query=query, result=result)

@app.route('/matharticles')
def matharticles():
    return render_template('matharticles.html', articles=math_article_list)

@app.route('/csarticles')
def csarticles():
    return render_template('csarticles.html', articles=cs_article_list)

@app.route('/about')
def about():
    return render_template('about.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)