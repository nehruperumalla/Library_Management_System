# from flask_pymongo import MongoClient

# # Initialize MongoDB client globally
# mongo_client = None

# def init_mongo(app):
#     global mongo_client

#     # Use the Flask app context to get MongoDB URI from app.config
#     mongo_uri = app.config['MONGO_URI']

#     # Initialize MongoDB client
#     mongo_client = MongoClient(mongo_uri)

#     # Return the initialized client
#     return mongo_client

from flask_pymongo import PyMongo

mongo = PyMongo()
