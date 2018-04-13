import sqlite3
import os
import base64
import requests
import json
from flask import session

def send_request():
    # Request

    try:
        response = requests.get(
            url='https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/daily_player_stats.json',
            params={
                "fordate": "20180411",
                "playerstats": "2PA,2PM,3PA,3PM,FTA,FTM"
            },
            headers={
                "Authorization": "Basic " + base64.b64encode('{}:{}'.format('awong21','tacocat').encode('utf-8')).decode('ascii')
            }
        )
        print('Response HTTP Status Code: {status_code}'.format(
            status_code=response.status_code))
        print('Response HTTP Response Body: {content}'.format(
            content=response.content))
        return response.json()
    except requests.exceptions.RequestException:
        print('HTTP Request failed')
playerData = send_request()

print json.dumps(playerData)

f = "sports.db"
db = sqlite3.connect(f)
c = db.cursor()

# if a item has 0 the user is not using the item. If it is 1 they user is using
#c.execute('CREATE TABLE IF NOT EXISTS items (user TEXT, item TEXT, playing INTEGER);')


#c.execute('CREATE TABLE IF NOT EXISTS nba(team TEXT, player TEXT, position TEXT, height INTEGER, weight INTEGER, bmi FLOAT);')
db.close()

# convert height in "ft, in" to inches
def convertHeight():
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    height = "6'2\"" # needs code from api pull, wip
    height = height.replace('"', "'").split("'")
    db.commit()
    db.close()
    return 12 * int(height[0]) + int(height[1])
    
# calculate player's bmi
def getBMI(player):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    hgt = 0 # CHANGE
    wgt = 1 # CHANGE
    bmi = 1.0 * wgt / (hgt**2) * 703
    db.commit()
    db.close()
    return bmi

# calculate team average of a stat
def teamData(stat, team):
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    ans = []
    data = c.execute("SELECT '%s' FROM nba WHERE team = '%s';" %(stat, team)) # CHANGE
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
    data = c.execute("SELECT '%s' FROM nba WHERE team = '%s' AND position = '%s';" %(stat, team, position)) # CHANGE
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

def completeInfo(xstat, ystat, team):
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
    return ans

def getTeams():
    f = "sports.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    ans = []
    data = c.execute("SELECT team FROM nbateams") # CHANGE
    for each in data:
        ans.append(each[0])
    db.commit()
    db.close()
    return ans
