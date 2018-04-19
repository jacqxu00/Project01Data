import sqlite3
import os
import base64
import requests
import json
from flask import session
# import account

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
        #print('Response HTTP Status Code: {status_code}'.format(
        #    status_code=response.status_code))
        #   ('Response HTTP Response Body: {content}'.format(
        #    content=response.content))
        return response.json()
    except requests.exceptions.RequestException:
        print('HTTP Request failed')
playerData = send_player_request()

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

        #print('Response HTTP Status Code: {status_code}'.format(
        #    status_code=response.status_code))
        #print('Response HTTP Response Body: {content}'.format(
        #    content=response.content))
        return response.json()
    except requests.exceptions.RequestException:
        print('HTTP Request failed')


#teamData = send_team_request()
#print json.dumps(teamData)


# if a item has 0 the user is not using the item. If it is 1 they user is using
#c.execute('CREATE TABLE IF NOT EXISTS items (user TEXT, item TEXT, playing INTEGER);')

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

''' def completeInfo(xstat, ystat, team):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    ans = []
    ans.append(team)                                #team name
    ans.append(teamData(xstat, team)[0])            #team x stat avg
    ans.append(teamData(ystat, team)[0])            #team y stat avg
    ans.append(teamData(ystat, team)[1])            #team size
    ans.append(positionData(xstat, team, "C")[0])   #center x stat avg
    ans.append(positionData(ystat, team, "C")[0])   #center y stat avg
    ans.append(positionData(ystat, team, "C")[1])   #center size
    ans.append(positionData(xstat, team, "F")[0])   #forward x stat avg
    ans.append(positionData(ystat, team, "F")[0])   #forward y stat avg
    ans.append(positionData(ystat, team, "F")[1])   #forward size
    ans.append(positionData(xstat, team, "G")[0])   #guard x stat avg
    ans.append(positionData(ystat, team, "G")[0])   #guard y stat avg
    ans.append(positionData(ystat, team, "G")[1])   #guard size
    db.commit()
    db.close()
    return ans '''

def getTeams():
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    ans = []
    c.execute("SELECT team FROM nbaTeams") # CHANGE
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

#getArrayQuery("nbaTeams", ["games", "win"])

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

def getAvgBMI(team):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("SELECT bmi FROM players WHERE team = '%s';" % (team))
    #print c.fetchall()
    sumScore = 0
    counter = 0
    for each in c.fetchall():
        #print each
        sumScore = sumScore + float(each[0])
        counter = counter + 1
        #print counter
    db.commit()
    db.close()
    return sumScore / counter

#print getAvgBMI("Houston Rockets")
#print getQuery("nbaTeams", "team", "games", "lose");


def getAvgHeight(team):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("SELECT height FROM players WHERE team = '%s';" % (team))
    #print c.fetchall()
    sumScore = 0
    counter = 0
    for each in c.fetchall():
        #print each
        sumScore = sumScore + float(each[0])
        counter = counter + 1
        #print counter
    db.commit()
    db.close()
    return sumScore / counter

def getAvgWeight(team):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("SELECT weight FROM players WHERE team = '%s';" % (team))
    #print c.fetchall()
    sumScore = 0
    counter = 0
    for each in c.fetchall():
        #print each
        sumScore = sumScore + float(each[0])
        counter = counter + 1
        #print counter
    db.commit()
    db.close()
    return sumScore / counter

def getAvg(team, stat):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("SELECT " + str(stat) + " FROM players WHERE team = '%s';" % (team))
    #print c.fetchall()
    sumScore = 0
    counter = 0
    for each in c.fetchall():
        #print each
        sumScore = sumScore + float(each[0])
        counter = counter + 1
        #print counter
    data = sumScore / counter
    db.commit()
    db.close()
    return data

def getPostionAvg(team, pos, stat):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("SELECT " + str(stat) + " FROM players WHERE team = '%s' AND position = '%s';" % (team, pos))
    #print c.fetchall()
    sumScore = 0
    counter = 0
    for each in c.fetchall():
        #print each
        sumScore = sumScore + float(each[0])
        counter = counter + 1
        #print counter
    data = sumScore / counter
    db.commit()
    db.close()
    return data

#print getPostionAvg("Houston Rockets", "C", "weight")

def getPlayerCount(team):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("SELECT count(*) FROM players WHERE team = '%s';" % (team))
    data = c.fetchall()[0][0]
    db.commit()
    db.close()
    return data


#print getPlayerCount("Houston Rockets")
#print getAvg("Houston Rockets", "bmi")

def getPositionCount(team, pos):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("SELECT count(*) FROM players WHERE team = '%s' AND position = '%s';" % (team, pos))
    data = c.fetchall()[0][0]
    db.commit()
    db.close()
    return data

#print getPositionCount("Houston Rockets", "C")

def createTables():
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()

    # creating team table
    c.execute('CREATE TABLE IF NOT EXISTS nbaTeams(team TEXT, games INTEGER, win INTEGER, lose INTEGER, points INTEGER, UNIQUE(team));')
    c.execute('SELECT count(*) from nbaTeams;')
    size = c.fetchall()[0][0]
    #print size
    if size == 0:
        #counter = 0
        teamData = send_team_request()
        #while counter < 30:
        for each in teamData["overallteamstandings"]["teamstandingsentry"]:
            losses = each["stats"]["Losses"]["#text"]
            wins = each["stats"]["Wins"]["#text"]
            games = each["stats"]["GamesPlayed"]["#text"]
            points = each["stats"]["Pts"]["#text"]
            city = each["team"]["City"]
            teamName = each["team"]["Name"]
            # print "INSERT OR REPLACE INTO nbaTeams VALUES (?,?,?,?,?)", (str(city) + " " + str(teamName), int(games), int(wins), int(losses), int(points))
            c.execute("INSERT OR REPLACE INTO nbaTeams VALUES (?,?,?,?,?)", (str(city) + " " + str(teamName), int(games), int(wins), int(losses), int(points)))
            #counter = counter + 1

    # creating player table
    c.execute('CREATE TABLE IF NOT EXISTS players(last_name TEXT, first_name TEXT, team TEXT, position TEXT, height INTEGER, weight INTEGER, bmi FLOAT);')
    c.execute('SELECT count(*) from players;')
    size = c.fetchall()[0][0]
    #print size
    if size == 0:
        for entry in playerData["rosterplayers"]["playerentry"]:
            if ("Height" in entry['player'].keys() and "team" in entry.keys()):
                player = entry['player']
                team = entry['team']
                height = convertHeight(player['Height'])
                c.execute('INSERT INTO players VALUES("%s", "%s", "%s", "%s", %d, %d, %f);' %
            (player['LastName'], player['FirstName'], team['City'] + ' ' + team['Name'], singlify(player['Position']), height, int(player['Weight']), getBMI(height, int(player['Weight']))))
    db.commit()
    db.close()

#createTables()
