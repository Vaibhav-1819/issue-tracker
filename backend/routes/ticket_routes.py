from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from models import db
from schema import User, Ticket, Comment
import os
from datetime import datetime
from reportlab.pdfgen import canvas

ticket_bp = Blueprint('ticket_bp', __name__)

# 🔹 Create a new user (not used, but functional)
@ticket_bp.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    user = User(name=data['name'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created', 'user': {'id': user.id, 'name': user.name}}), 201

# 🔹 Get all tickets (includes assigned user + comments)
@ticket_bp.route('/api/tickets', methods=['GET'])
def get_tickets():
    tickets = Ticket.query.all()
    result = []
    for t in tickets:
        result.append({
            'id': t.id,
            'title': t.title,
            'priority': t.priority,
            'status': t.status,
            'assigned_to': t.assignee.name if t.assignee else None,
            'comments': [
                {
                    'user_name': c.user_name,
                    'text': c.text
                } for c in t.comments
            ]
        })
    return jsonify(result)

# 🔹 Create a ticket
@ticket_bp.route('/api/tickets', methods=['POST'])
def create_ticket():
    data = request.json
    ticket = Ticket(
        title=data['title'],
        description=data.get('description'),
        priority=data.get('priority', 3),
        assigned_to=data.get('assigned_to')
    )
    db.session.add(ticket)
    db.session.commit()
    return jsonify({'message': 'Ticket created', 'id': ticket.id}), 201

# 🔹 Update a ticket
@ticket_bp.route('/api/tickets/<int:id>', methods=['PUT'])
def update_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    data = request.json
    ticket.title = data.get('title', ticket.title)
    ticket.description = data.get('description', ticket.description)
    ticket.priority = data.get('priority', ticket.priority)
    ticket.status = data.get('status', ticket.status)
    ticket.assigned_to = data.get('assigned_to', ticket.assigned_to)
    db.session.commit()
    return jsonify({'message': 'Ticket updated'})

# 🔹 Add a comment
@ticket_bp.route('/api/tickets/<int:id>/comment', methods=['POST'])
def add_comment(id):
    data = request.json
    comment = Comment(
        ticket_id=id,
        user_name=data['user_name'],
        text=data['text']
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify({'message': 'Comment added'}), 201

# 🔹 Upload patch/file
@ticket_bp.route('/api/tickets/<int:id>/upload', methods=['POST'])
def upload_patch(id):
    ticket = Ticket.query.get_or_404(id)
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['file']
    filename = secure_filename(file.filename)
    path = os.path.join('uploads', filename)
    file.save(path)
    ticket.patch_file = path
    db.session.commit()
    return jsonify({'message': 'File uploaded', 'path': path})

# 🔹 Export ticket to PDF
@ticket_bp.route('/api/tickets/<int:id>/export', methods=['GET'])
def export_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    filename = f"ticket_{id}.pdf"
    filepath = os.path.join('uploads', filename)
    c = canvas.Canvas(filepath)
    c.drawString(100, 800, f"Ticket ID: {ticket.id}")
    c.drawString(100, 780, f"Title: {ticket.title}")
    c.drawString(100, 760, f"Description: {ticket.description}")
    c.drawString(100, 740, f"Status: {ticket.status}")
    c.drawString(100, 720, f"Priority: {ticket.priority}")
    c.drawString(100, 700, f"Assigned to: {ticket.assignee.name if ticket.assignee else 'None'}")
    c.drawString(100, 680, f"Created: {ticket.created_at.strftime('%Y-%m-%d')}")
    c.save()
    return send_file(filepath, as_attachment=True)
