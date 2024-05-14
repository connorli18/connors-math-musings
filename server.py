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

if __name__ == '__main__':
    app.run(debug=True)