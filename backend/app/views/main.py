from flask import Blueprint, render_template

main_bp = Blueprint("main", __name__)


@main_bp.route("/", methods=('GET', 'POST'))
def login():
    return "HEY MAIN"


# @main_bp.route("/data_load", methods=('PUT'))
# def init_data():
#     pass


def get_location_data():
    return [
        {'location-id': 1, 'name':'Abernathy Public Library', 'address':'811 Avenue D', 'city':'Abernathy', 'state':'Texas', 'zipcode':'79311' },
        {'location-id': 1, 'name':'Abernathy Public Library', 'address':'811 Avenue D', 'city':'Abernathy', 'state':'Texas', 'zipcode':'79311' },
        {'location-id': 1, 'name':'Abernathy Public Library', 'address':'811 Avenue D', 'city':'Abernathy', 'state':'Texas', 'zipcode':'79311' },
        {'location-id': 1, 'name':'Abernathy Public Library', 'address':'811 Avenue D', 'city':'Abernathy', 'state':'Texas', 'zipcode':'79311' },

    ]