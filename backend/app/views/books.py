from flask import Blueprint, request, jsonify
from ..db import mongo
import json
from bson import json_util
from bson.objectid import ObjectId
import re
from .dummy_data import books, locations

books_bp = Blueprint("books", __name__)

def serialize_doc(doc):
    """Custom serialization function to convert ObjectId to string."""
    serialized = json.dumps(doc, default=str)
    return json.loads(serialized)

@books_bp.route('/add', methods=['POST'])
def add_book():
    data = request.json
    book = {
        "title":data["title"],
        "author":data["author"],
        "description":data["description"],
        "genre": data["genre"],
        "published_year":data["published_year"],
        "ISBN":data["ISBN"]
    }
    added_rec = mongo.db.books.insert_one(book)
    new_record = mongo.db.books.find_one({'_id':added_rec.inserted_id})
    return json.loads(json_util.dumps(new_record)), 201

@books_bp.route('/update', methods=['PUT'])
def update_book():
    data = request.json
    mongo.db.books.find_one_and_update({'_id':ObjectId(data['id'])}, {'$set':data})
    return "Books updated succesfully", 201

@books_bp.route('/fetch', methods=['GET'])
def get_books():
    books_data = list(mongo.db.books.find())
    data_to_send = [serialize_doc(doc) for doc in books_data]
    return jsonify(data_to_send), 200

@books_bp.route('/delete/<id>', methods=['DELETE'])
def delete_book(id):
    mongo.db.books.delete_one({'_id':ObjectId(id)})
    return "Book deleted succesfully", 201

@books_bp.route('/search', methods=['GET'])
def search_by_item():
    # print(request.args)
    search_key = request.args.get('searchKey')
    # print(search_key)
    search_val = request.args.get('searchVal')
    # print(search_val)
    regex = re.compile(f'.*{search_val}.*', re.IGNORECASE)
    docs = mongo.db.books.find({search_key:{'$regex': regex}})
    docs = [serialize_doc(doc) for doc in docs]
    
    for doc in docs:
        obj = serialize_doc(mongo.db.stores.find_one({'book_id':doc['_id']}))
        if obj:
            doc["location_name"] = serialize_doc(obj)['location_name']
        else:
            doc["location_name"] = "NA"
    print(docs)
    return docs, 200

@books_bp.route('/init', methods=["GET"])
def load_dummy_books():
    mongo.db.books.insert_many(books)
    mongo.db.locations.insert_many(locations)
    books_dta = mongo.db.books.find()
    locations_dta = mongo.db.locations.find()
    books_data = [serialize_doc(book) for book in books_dta]
    locations_data = [serialize_doc(location) for location in locations_dta]
    data = {"book_id":books_data[0]["_id"], "location_id":locations_data[0]["_id"], "location_name":locations_data[0]["name"], "book_name":books_data[0]["title"]}
    mongo.db.stores.insert_one(data)

    data = {"book_id":books_data[1]["_id"], "location_id":locations_data[1]["_id"], "location_name":locations_data[1]["name"], "book_name":books_data[1]["title"]}
    mongo.db.stores.insert_one(data)
    return "true", 200