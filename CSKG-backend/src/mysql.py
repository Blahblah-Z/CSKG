from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql

class SqlDB:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    def conn(self):
        db = pymysql.connect(self.host, self.user, self.password, self.database)
        
