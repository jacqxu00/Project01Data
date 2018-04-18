from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from utils import db
import requests
import os, sqlite3, hashlib, json, requests, sys


app = Flask(__name__)
app.secret_key = os.urandom(64)

@app.route('/', methods = ['GET', 'POST'])
def root():
    db.createTables()
    #if ('x' in request.form) and ('y' in request.form) and ('graph' in request.form):
    if ('x' in request.form) and ('y' in request.form):
        xstat = request.form['x']
        ystat = request.form['y']
        #print xStat, yStat
        info = []
        teams = db.getTeams()
        #print teams
        for each in teams:
            info.append([])
            for eachLine in teams:
                info.append(db.getQuarry("nbaTeams", each, xstat, ystat))
        #print info
        return render_template("index.html", x = xstat, y = ystat)
    #xstat = 'BMI'
    #ystat = 'Points'
    return render_template("index.html")

@app.route('/query', methods = ['GET', 'POST'])
def query():
    if request.method == 'POST':
        send_back = {"status": "failed"}
        print request.data.split("&")
        try:
            dataDump = request.data.split("&")
            tempArray = []
            for each in dataDump:
                tempArray.append(each[each.find("=") + 1 :])
            searchRes = db.getQuery(tempArray[0], tempArray[1], tempArray[2], tempArray[3])
            send_back["status"] = "success"
            print jsonify(searchRes)
        except:
            return "failed AJAX call"
    return jsonify(searchRes)

if __name__ == '__main__':
    app.debug = True
    app.run()
