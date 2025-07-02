from flask import Flask
from flask_cors import CORS
from models import db  # import db from models.py
import os

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    from schema import *  # Load models
    db.create_all()

# ✅ Import routes AFTER db is initialized and schema is loaded
from routes.ticket_routes import ticket_bp
app.register_blueprint(ticket_bp)

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.mkdir('uploads')
    app.run(debug=True, port=5000)
