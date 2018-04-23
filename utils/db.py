import sqlite3
import os
import base64
import requests
import json
from flask import session

def send_player_request():
    # Request

    try:
        response = requests.get(
            url='https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/roster_players.json',
            params={
                "fordate": "20180411"
            },
            headers={
                "Authorization": "Basic " + base64.b64encode('{}:{}'.format('awong21','tacocat').encode('utf-8')).decode('ascii')
            }
        )

        return response.json()
    except requests.exceptions.RequestException:
        print('HTTP Request failed')

def send_team_request():
    # Request

    try:
        response = requests.get(
            url="https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/overall_team_standings.json?teamstats=W,L,PTS,PTSA",
            params={
                "fordate": "20180411",
            },
            headers={
                "Authorization": "Basic " + base64.b64encode('{}:{}'.format('awong21','tacocat').encode('utf-8')).decode('ascii')
            }
        )

        return response.json()
    except requests.exceptions.RequestException:
        print('HTTP Request failed')

def send_stat_request():
    # Request

    try:
        response = requests.get(
            url="https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/daily_player_stats.json?playerstats=PTS/G,AST/G,REB/G,BS/G,STL/G,F/G",
            params={
                "fordate": "20180411",

            },
            headers={
                "Authorization": "Basic " + base64.b64encode('{}:{}'.format('awong21','tacocat').encode('utf-8')).decode('ascii')
            }
        )

        return response.json()
    except requests.exceptions.RequestException:
        print('HTTP Request failed')

# condense 5 positions to 3 categories
def singlify(position):
    if 'G' in position:
        return 'G'
    if 'F' in position:
        return 'F'
    if 'C' in position:
        return 'C'
    else:
        print 'ERROR'

# convert height in "ft, in" to inches
def convertHeight(height):
    height = height.replace('"', "'").split("'")
    return 12 * int(height[0]) + int(height[1])

# calculate player's bmi
def getBMI(hgt, wgt):
    bmi = 1.0 * wgt / (hgt**2) * 703
    return bmi

# calculate team average of a stat
def teamData(stat, team):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    ans = []
    c.execute("SELECT '%s' FROM players WHERE team = '%s';" %(stat, team)) # CHANGE
    data = c.fetchall()
    num = 0
    for each in data:
        num += each[0]
    den = len (data)
    avg = 1.0 * num / den
    ans.append(avg)
    ans.append(den)
    db.commit()
    db.close()
    return ans

# calculate position average of a stat
def positionData(stat, team, position):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    ans = []
    c.execute("SELECT '%s' FROM players WHERE team = '%s' AND position = '%s';" %(stat, team, position)) # CHANGE
    data = c.fetchall[0][0]
    num = 0
    for each in data:
        num += each[0]
    den = len (data)
    avg = 1.0 * num / den
    ans.append(avg)
    ans.append(den)
    db.commit()
    db.close()
    return ans

def getTeams():
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    ans = []
    c.execute("SELECT team FROM nbaTeams")
    data = c.fetchall()
    #print data
    for each in data:
        ans.append(str(each[0]))
    db.commit()
    db.close()
    return ans

def getArrayQuery(database, array):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    ans = []
    query = "SELECT "
    for each in array:
        #print "each: " + each
        query = query + each + ", "
    query = query[:len(query) - 2] + " FROM " + database + ";"
    #print query
    c.execute(query)
    data = c.fetchall()
    for each in data:
        temp = []
        for each2 in each:
            temp.append(each2)
        ans.append(temp)
    db.commit()
    db.close()
    return ans

def getQuery(database, name, xStat, yStat):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    ans = []
    c.execute("SELECT " + name + ", "+ xStat + ", " + yStat + " FROM " + database + ";")
    data = c.fetchall()
    for each in data:
        temp = []
        for each2 in each:
            temp.append(each2)
        ans.append(temp)
    db.commit()
    db.close()
    return ans

def getAllQuery(database):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    ans = []
    c.execute("SELECT * FROM " + database + ";")
    data = c.fetchall()
    for each in data:
        temp = []
        for each2 in each:
            temp.append(each2)
        ans.append(temp)
    db.commit()
    db.close()
    return ans

def getAvg(team, stat):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    if ((stat == "BMI") or (stat == "Weight") or (stat == "Height")):
        c.execute("SELECT " + str(stat) + " FROM players WHERE team = '%s';" % (team))
        sumScore = 0
        counter = 0
        for each in c.fetchall():
            sumScore = sumScore + float(each[0])
            counter = counter + 1
        data = 0
        if (counter != 0):
            data = sumScore / counter
        db.commit()
        db.close()
        return data
    else:
        c.execute("SELECT " + str(stat) + " FROM playerStat WHERE team = '%s';" % (team))
        sumScore = 0
        counter = 0
        for each in c.fetchall():
            sumScore = sumScore + float(each[0])
            counter = counter + 1
        data = 0
        if (counter != 0):
            data = sumScore / counter
        db.commit()
        db.close()
        return data
    return data

def getPostionAvg(team, pos, stat):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    data = 0
    if ((stat == "BMI") or (stat == "Weight") or (stat == "Height")):
        c.execute("SELECT " + str(stat) + " FROM players WHERE team = '%s' AND position = '%s';" % (team, pos))
        sumScore = 0
        counter = 0
        for each in c.fetchall():
            sumScore = sumScore + float(each[0])
            counter = counter + 1
        data = 0
        if (counter != 0):
            data = sumScore / counter
        db.commit()
        db.close()
        return data
    else:
        c.execute("SELECT " + str(stat) + " FROM playerStat WHERE team = '%s' AND position = '%s';" % (team, pos))
        sumScore = 0
        counter = 0
        for each in c.fetchall():
            sumScore = sumScore + float(each[0])
            counter = counter + 1
        data = 0
        if (counter != 0):
            data = sumScore / counter
        db.commit()
        db.close()
        return data
    return data


def getPlayerCount(team):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("SELECT count(*) FROM players WHERE team = '%s';" % (team))
    data = c.fetchall()[0][0]
    db.commit()
    db.close()
    return data

def getPositionCount(team, pos):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("SELECT count(*) FROM players WHERE team = '%s' AND position = '%s';" % (team, pos))
    data = c.fetchall()[0][0]
    db.commit()
    db.close()
    return data

def createTables():
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()

    # creating team table
    c.execute('CREATE TABLE IF NOT EXISTS nbaTeams(team TEXT, games INTEGER, win INTEGER, lose INTEGER, points INTEGER, UNIQUE(team));')
    c.execute('SELECT count(*) from nbaTeams;')
    size = c.fetchall()[0][0]

    if size == 0:
        teamData = send_team_request()
        for each in teamData["overallteamstandings"]["teamstandingsentry"]:
            losses = each["stats"]["Losses"]["#text"]
            wins = each["stats"]["Wins"]["#text"]
            games = each["stats"]["GamesPlayed"]["#text"]
            points = each["stats"]["Pts"]["#text"]
            city = each["team"]["City"]
            teamName = each["team"]["Name"]
            c.execute("INSERT OR REPLACE INTO nbaTeams VALUES (?,?,?,?,?)", (str(city) + " " + str(teamName), int(games), int(wins), int(losses), int(points)))

    c.execute('CREATE TABLE IF NOT EXISTS playerStat(last_name TEXT, first_name TEXT, team TEXT, position TEXT, Assists FLOAT , Blocks FLOAT, Fouls FLOAT, Points FLOAT, Rebounds FLOAT, Steals FLOAT);')
    c.execute('SELECT count(*) from playerStat;')
    size = c.fetchall()[0][0]
    if size == 0:
        statData = send_stat_request()
        for each in statData["dailyplayerstats"]["playerstatsentry"]:
            if ("team" in each.keys()):
                lastName = each["player"]["LastName"]
                firstName = each["player"]["FirstName"]
                position = singlify(each["player"]['Position'])
                team = each["team"]["City"] + " " + each["team"]["Name"]
                playerStats = ["AstPerGame", "PtsPerGame", "StlPerGame", "FoulsPerGame",  "BlkPerGame", "RebPerGame"]
                if all(stat in playerStats for stat in each['stats'].keys()):
                    avgAssists = each["stats"]["AstPerGame"]["#text"]
                    avgPoints = each["stats"]["PtsPerGame"]["#text"]
                    avgSteals = each["stats"]["StlPerGame"]["#text"]
                    avgFouls = each["stats"]["FoulsPerGame"]["#text"]
                    avgBlocks = each["stats"]["BlkPerGame"]["#text"]
                    avgRebounds = each["stats"]["RebPerGame"]["#text"]
                    c.execute("INSERT OR REPLACE INTO playerStat VALUES (?,?,?,?,?,?,?,?,?,?)", (str(lastName), str(firstName), str(team), str(position), float(avgAssists), float(avgBlocks), float(avgFouls), float(avgPoints), float(avgRebounds), float(avgSteals)))

    # creating player table
    c.execute('CREATE TABLE IF NOT EXISTS players(last_name TEXT, first_name TEXT, team TEXT, Position TEXT, Height INTEGER, Weight INTEGER, BMI FLOAT);')
    c.execute('SELECT count(*) from players;')
    size = c.fetchall()[0][0]
    if size == 0:
        playerData = send_player_request()
        for entry in playerData["rosterplayers"]["playerentry"]:
            if ("Height" in entry['player'].keys() and "team" in entry.keys()):
                player = entry['player']
                team = entry['team']
                height = convertHeight(player['Height'])
                c.execute('INSERT INTO players VALUES("%s", "%s", "%s", "%s", %d, %d, %f);' %
            (player['LastName'], player['FirstName'], team['City'] + ' ' + team['Name'], singlify(player['Position']), height, int(player['Weight']), getBMI(height, int(player['Weight']))))
    db.commit()
    db.close()
