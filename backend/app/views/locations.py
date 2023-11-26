from flask import Blueprint, request, jsonify
from ..db import mongo
import json
from bson import json_util
from bson.objectid import ObjectId


location_bp = Blueprint("locations", __name__)

def serialize_doc(doc):
    """Custom serialization function to convert ObjectId to string."""
    serialized = json.dumps(doc, default=str)
    return json.loads(serialized)

@location_bp.route('/add', methods=['POST'])
def add_location():
    data = request.json
    location = {
        "name": data["name"],
        "address": data["address"],
        "city": data["city"],
        "state": data["state"],
        "zipcode": data["zipcode"]
    }
    added_rec = mongo.db.locations.insert_one(location)
    new_record = mongo.db.locations.find_one({'_id':added_rec.inserted_id})
    return json.loads(json_util.dumps(new_record)), 201

@location_bp.route('/update', methods=['PUT'])
def update_location():
    data = request.json
    location = {
        "name": data["name"],
        "address": data["address"],
        "city": data["city"],
        "state": data["state"],
        "zipcode": data["zipcode"]
    }
    mongo.db.locations.find_one_and_update({'_id':ObjectId(data['id'])}, {'$set':location})
    return "Location updated succesfully", 201

@location_bp.route('/fetch', methods=['GET'])
def get_locations():
    locations_data = list(mongo.db.locations.find())
    data_to_send = [serialize_doc(doc) for doc in locations_data]
    return jsonify(data_to_send), 200

@location_bp.route('/delete/<id>', methods=['DELETE'])
def delete_location(id):
    mongo.db.locations.delete_one({'_id':ObjectId(id)})
    return "Location deleted succesfully", 201