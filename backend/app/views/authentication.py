from flask import Blueprint, request
from ..db import mongo

authentication_bp = Blueprint("authentication", __name__)
# mongo = get_mongo_client()

@authentication_bp.route("/login", methods=('GET','POST'))
def login():
    data= request.json
    print("Login",data)
    
    try:
        data = mongo.db.members.find_one({"username":data['username']})
        print(data)
        return {'username':data['username'], 'user_id':str(data['_id'])}, 200
    except Exception as e:
        return "Unable to Login", 401

@authentication_bp.route("/register", methods=('GET', 'POST'))
def register():
    data= request.json
    print("Register",data)
    try:
        member = {
                    "username":data["username"], 
                    "name":data["name"], 
                    "email":data["email"], 
                    "contact_info": {
                        "address": data["address"],
                        "phone":data['phone']
                    },
                    "password":data["password"],
                    "books":[]
                  }
        mongo.db.members.insert_one(member)
        return "Registered Successfully", 201
    except:
        return "Something went wrong, Please try again later!", 401