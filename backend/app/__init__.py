from flask import Flask
from flask_cors import CORS
from bson import json_util
import json
from config import Config
from .views import init_app as view_init
from .db import mongo
# from db import get_mongo_client



def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app)
    # app.config.from_object(config_class)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/lms"


    # Initialize Flask extensions here
    mongo.init_app(app)
    view_init(app)


    # Register blueprints here


    @app.route('/test/')
    def test_page():
        online_users = mongo.db.admin.find_one({"username": "admin"})
        o = json.loads(json_util.dumps(online_users))
        print(online_users)
        return {'users':o}

    return app