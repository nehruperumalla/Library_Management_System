from flask import Blueprint, render_template
from ..db import mongo
from bson.objectid import ObjectId
import json

main_bp = Blueprint("main", __name__)

def serialize_doc(doc):
    """Custom serialization function to convert ObjectId to string."""
    serialized = json.dumps(doc, default=str)
    return json.loads(serialized)

@main_bp.route("/getUser/<user_id>", methods=["GET"])
def get_user(user_id):
    print('In Get User', user_id)
    user_data = mongo.db.members.find_one({'_id':ObjectId(user_id)})
    # print(serialize_doc(user_data))
    return serialize_doc(user_data), 200

def get_dummy_data():
    admin = {
        "username":"admin",
        "password":"admin"
    }

    store = [
        {"store_id":1, "location_id":1, "book_id":1, }
    ]

    payments = [
        {"user_id":""}
    ]

    transactions = [
        {}
    ]

    members = [
        {
            "username":"Alice", 
            "name":"Alice Parker", 
            "email":"alice@gmail.com", 
            "contact_info": {
                "address": "456 Library Ave",
                "phone": "+9876543210"
            },
            "books": ["Rich Dad Poor Dad", "DBMS"]
         }
    ]