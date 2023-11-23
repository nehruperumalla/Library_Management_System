from .authentication import authentication_bp
from .users import users_bp
from .main import main_bp
from .locations import location_bp
# ...

def init_app(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(authentication_bp, url_prefix='/auth')
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(location_bp, url_prefix='/locations')