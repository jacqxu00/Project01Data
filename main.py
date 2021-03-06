from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from utils import db
import requests
import os, sqlite3, hashlib, json, requests, sys


app = Flask(__name__)
app.secret_key = os.urandom(64)

@app.route('/', methods = ['GET', 'POST'])
def root():
    db.createTables()
    '''
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
    xstat = 'BMI'
    ystat = 'Points'
    '''
    return render_template("index.html")

@app.route('/query', methods = ['GET', 'POST'])
def query():
    if request.method == 'POST':
        send_back = {"status": "failed"}
        #print request.data.split("&")
        try:
            dataDump = request.data.split("&")
            tempArray = []
            searchRes = []
            for each in dataDump:
                tempArray.append(each[each.find("=") + 1 :])
            #searchRes = db.getQuery(tempArray[0], tempArray[1], tempArray[2], tempArray[3])
            #0 --> db
            #1 --> name
            #2 --> xStat (now this is 0)
            #3 --> yStat (now this is 1)
            #db.getAvg()
            # You want
            #   team, teamXAvg, teamYAvg, teamSize
            #   cXAvg, cYAvg, cSize
            #   fXAvg, fYAvg, fSize
            #   gXAvg, gYAvg, gSize
            #print tempArray
            #print db.getTeams()
            for each in db.getTeams():
                #print each
                #print tempArray[0], tempArray[1]
                dataArray = []
                team = str(each)
                xStat = str(tempArray[0])
                yStat = str(tempArray[1])
                #print "..."
                #print db.getAvg(team, xStat)
                #print float(db.getAvg(team, xStat))
                #print "...d"
                #print float(db.getAvg(team, yStat))
                #print "complete"
                teamXAvg = float(db.getAvg(team, xStat))
                teamYAvg = float(db.getAvg(team, yStat))
                teamSize = float(db.getPlayerCount(team))
                cXAvg = float(db.getPostionAvg(team, "C", xStat))
                cYAvg = float(db.getPostionAvg(team, "C", yStat))
                cSize = float(db.getPositionCount(team, "C"))
                fXAvg = float(db.getPostionAvg(team, "F", xStat))
                fYAvg = float(db.getPostionAvg(team, "F", yStat))
                fSize = float(db.getPositionCount(team, "F"))
                gXAvg = float(db.getPostionAvg(team, "G", xStat))
                gYAvg = float(db.getPostionAvg(team, "G", yStat))
                gSize = float(db.getPositionCount(team, "G"))
                dataArray.extend([team,teamXAvg,teamYAvg, teamSize, cXAvg, cYAvg, cSize, fXAvg, fYAvg, fSize, gXAvg, gYAvg, gSize])
                searchRes.append(dataArray)
                #print searchRes
            send_back["status"] = "success"
            #print searchRes
            #print jsonify(searchRes)
        except:
            return "failed AJAX call"
    return jsonify(searchRes)

if __name__ == '__main__':
    app.debug = True
    app.run()
