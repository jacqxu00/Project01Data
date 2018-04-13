from flask import Flask, render_template, request, redirect, url_for, flash
from utils import db
import requests
import os, sqlite3, hashlib, json, requests, sys

app = Flask(__name__)
app.secret_key = os.urandom(64)

@app.route('/')
def root():
    db.createTables()
    xstat = "bmi"
    ystat = "Fg3PtAtt"
    
    #info = []
    #teams = db.getTeams()
    #print teams
    #for each in teams:
    #    info.append([])
    #    for eachLine in teams:
    #        info.append(db.completeInfo(xstat, ystat, each))
    #*/
    return render_template("index.html")#, data = info)

if __name__ == '__main__':
    app.debug = True
    app.run()
