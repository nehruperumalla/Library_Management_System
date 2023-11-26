from .authentication import authentication_bp
from .users import users_bp
from .main import main_bp
from .locations import location_bp
from .books import books_bp
from .transactions import transaction_bp
from .payments import payments_bp
from .stores import stores_bp
# ...

def init_app(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(authentication_bp, url_prefix='/auth')
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(location_bp, url_prefix='/locations')
    app.register_blueprint(books_bp, url_prefix='/books')
    app.register_blueprint(transaction_bp, url_prefix='/transactions')
    app.register_blueprint(payments_bp, url_prefix='/payments')
    app.register_blueprint(stores_bp, url_prefix='/stores')