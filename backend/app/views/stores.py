from flask import Blueprint, request, jsonify
from ..db import mongo
import json
from bson import json_util
from bson.objectid import ObjectId
from datetime import datetime

stores_bp = Blueprint("stores", __name__)

def serialize_doc(doc):
    """Custom serialization function to convert ObjectId to string."""
    serialized = json.dumps(doc, default=str)
    return json.loads(serialized)



@stores_bp.route("/create", methods=["POST"])
def create_store():
    data = request.json
    location_name = serialize_doc(mongo.db.locations.find_one({'_id':ObjectId(data['location_id'])}))['name']
    book_name = serialize_doc(mongo.db.books.find_one({'_id':ObjectId(data['book_id'])}))['title']
    store_data = {
        "location_id":data['location_id'],
        "book_id":data["book_id"],
        "location_name":location_name,
        "book_name":book_name
    }
    inserted_rec = mongo.db.stores.insert_one(store_data)
    return str(inserted_rec.inserted_id), 200