from flask import Flask, render_template, request, redirect, url_for, flash
from utils import db
import requests
import os, sqlite3, hashlib, json, requests, sys

app = Flask(__name__)
app.secret_key = os.urandom(64)

@app.route('/', methods = ['GET', 'POST'])
def root():
    db.createTables()
    if ('x' in request.form) and ('y' in request.form) and ('graph' in request.form):
        xstat = request.form['x']
        ystat = request.form['y']
        graph = request.form['graph']
        print xStat, yStat, graph
        info = []
        teams = db.getTeams()
        print teams
        for each in teams:
            info.append([])
            for eachLine in teams:
                info.append(db.getQuarry("nbaTeams", each, xstat, ystat))
        print info
        return render_template("index.html", data = info)
    return render_template("index.html")#, data = info)

if __name__ == '__main__':
    app.debug = True
    app.run()
