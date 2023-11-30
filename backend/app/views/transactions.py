from flask import Blueprint, request, jsonify
from ..db import mongo
import json
from bson import json_util
from bson.objectid import ObjectId
from datetime import datetime

transaction_bp = Blueprint("transactions", __name__)

def serialize_doc(doc):
    """Custom serialization function to convert ObjectId to string."""
    serialized = json.dumps(doc, default=str)
    return json.loads(serialized)

@transaction_bp.route("/checkin", methods=["POST"])
def add_transaction():
    data = request.json
    print(data)
    transaction = {
        "user_id": ObjectId(data["user_id"]),
        "user_name": data["user_name"],
        "location_name": data["location_name"],
        "books": [{"book_id":ObjectId(books_data["book_id"]), 
                   "book_title":books_data["book_title"], 
                   "checkin_time":datetime.now(), 
                   "checkout_time":'', 
                   "returned_location":''} for books_data in data["books"]]
    }
    added_rec = mongo.db.transactions.insert_one(transaction)
    new_record = mongo.db.transactions.find_one({'_id':added_rec.inserted_id})
    ids_to_be_deleted = [ObjectId(book['store_id']) for book in data['books']]
    mongo.db.stores.delete_many({'_id':{'$in':ids_to_be_deleted}})
    add_books_to_member(data)
    return json.loads(json_util.dumps(new_record)), 201

def add_books_to_member(user_data):
    print('Inside Add Boos to Member')
    user_id = ObjectId(user_data['user_id'])
    books = [book['book_title'] for book in user_data['books']]
    updates = {'books':books}
    mongo.db.members.update_one({'_id':user_id}, {'$set':updates})
    return "Updated books for user succesfully", 200


@transaction_bp.route("/checkout", methods=["POST"])
def update_transaction():
    data = request.json
    print(data)
    op = serialize_doc(mongo.db.transactions.find_one({'_id':ObjectId(data['_id']), "books.book_id":ObjectId(data['book_id'])}))
    print(op)
    mongo.db.transactions.update_one({'_id':ObjectId(data['_id']), "books.book_id":ObjectId(data['book_id'])}, 
                                         {'$set':{"books.$.checkout_time":datetime.now(), 
                                                  "books.$.returned_location":data['returned_location']
                                                  }})
    docs = [serialize_doc(doc) for doc in mongo.db.transactions.find()]
    location_info = serialize_doc(mongo.db.locations.find_one({"name":data['returned_location']}))
    book_info = serialize_doc(mongo.db.books.find_one({"_id":ObjectId(data['book_id'])}))
    mongo.db.stores.insert_one({"location_id":location_info['_id'], "book_id":book_info['_id'], "location_name":location_info['name'], "book_title":book_info['title']})
    return docs, 201

@transaction_bp.route("/search/<user_id>", methods=["GET"])
def search_transactions_by_id(user_id):
    print("user_id", user_id)
    data = mongo.db.transactions.find({'user_id':ObjectId(user_id)})
    return [serialize_doc(item) for item in data], 200