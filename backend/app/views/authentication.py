from flask import Blueprint, request
from ..db import mongo

authentication_bp = Blueprint("authentication", __name__)
# mongo = get_mongo_client()

@authentication_bp.route("/login/", methods=('GET','POST'))
def login():
    data= request.json
    print("Login",data)
    
    try:
        data = mongo.db.userDetails.find_one({"email":data['username']})
        print(data)
        return data['firstName'], 200
    except Exception as e:
        return "Unable to Login", 401

@authentication_bp.route("/register/", methods=('GET', 'POST'))
def register():
    data= request.json
    print("Register",data)
    try:
        mongo.db.userDetails.insert_one(data)
        return "Registered Successfully", 201
    except:
        return "Something went wrong, Please try again later!", 401