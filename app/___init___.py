from flask import Flask
from .navigation import NAV_ITEMS
from .routes import main_bp

def create_app():
    app = Flask(__name__)

    app.register_blueprint(main_bp)

    @app.context_processor
    def inject_nav():
        return {"NAV_ITEMS": NAV_ITEMS}

    return app
