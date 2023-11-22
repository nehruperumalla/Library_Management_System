from flask import Blueprint

users_bp = Blueprint("users", __name__)


@users_bp.route("/", methods=('GET', 'POST'))
def login():
    return "Users BP Working fine.."