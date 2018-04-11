import sqlite3
import os
from flask import session

f = "nba.db"
db = sqlite3.connect(f)
c = db.cursor()

# if a item has 0 the user is not using the item. If it is 1 they user is using
#c.execute('CREATE TABLE IF NOT EXISTS items (user TEXT, item TEXT, playing INTEGER);')
db.close()

#changes cash amount
def getBMI(player):
    f = "nba.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    # input calculations
    db.commit()
    db.close()
