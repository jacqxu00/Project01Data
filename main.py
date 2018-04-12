from flask import Flask, render_template, request, redirect, url_for, flash
from db import *
from utils import db
import requests
import os

app = Flask(__name__)

@app.route('/')
def root():
    xstat = "bmi"
    ystat = "Fg3PtAtt"
    info = [][]
    teams = getTeams()
    for each in teams:
        info.append(completeInfo(xstat, ystat, each))
    return render_template("index.html", data = info)

if __name__ == '__main__':
    app.debug = True
    app.run()
