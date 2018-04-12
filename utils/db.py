import sqlite3
import os
from flask import session

f = "sports.db"
db = sqlite3.connect(f)
c = db.cursor()

# if a item has 0 the user is not using the item. If it is 1 they user is using
#c.execute('CREATE TABLE IF NOT EXISTS items (user TEXT, item TEXT, playing INTEGER);')


#c.execute('CREATE TABLE IF NOT EXISTS nba(team TEXT, player TEXT, position TEXT, height INTEGER, weight INTEGER, bmi FLOAT);')
db.close()

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
        num += each
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
        num += each
    den = len (data)
    avg = 1.0 * num / den
    ans.append(avg)
    ans.append(den)
    db.commit()
    db.close()
    return ans
