from flask import Blueprint, request, jsonify
from ..db import mongo
import json
from bson import json_util
from bson.objectid import ObjectId
from datetime import datetime


payments_bp = Blueprint("payments", __name__)


def serialize_doc(doc):
    """Custom serialization function to convert ObjectId to string."""
    serialized = json.dumps(doc, default=str)
    return json.loads(serialized)

@payments_bp.route('/create', methods=['POST'])
def make_payment():
    data = request.json
    print(data)
    payment_info = {
        "user_id":data['user_id'],
        "username":data['username'],
        "amount":data['amount'],
        "payment_date":datetime.now(),
        "description":data['description'],
        "credit_card": {
            "card_no":data['card']['card_no'],
            "expiry_date":data['card']['expiry_date'],
            "cvv":data['card']['cvv'],
            "card_holder":data['card']['card_holder']
        }
    }
    inserted_rec = mongo.db.payments.insert_one(payment_info)
    return str(inserted_rec.inserted_id), 200

@payments_bp.route('/fetch', methods=["GET"])
def fetch_payments():
    payments_data = list(mongo.db.payments.find())
    data_to_send = [serialize_doc(doc) for doc in payments_data]
    return jsonify(data_to_send), 200