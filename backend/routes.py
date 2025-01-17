from app import app, db
from flask import request, jsonify
from models import Note
import random

# Get all notes
@app.route("/api/notes", methods=["GET"])
def get_notes():
    notes = Note.query.all()
    notes_json = [note.to_json() for note in notes]
    return jsonify(notes_json)

# Create note
@app.route("/api/notes", methods=["POST"])
def create_note():
    try:
        data = request.json
        
        #Validation
        required_fields = ["title","date","content"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f"Missing required field: {field}"}), 400
        
        title = data.get("title")
        content = data.get("content")
        date = data.get("date")
        category = data.get("category")
        
        if category == "personal":
            img_url = f"/personal-icon/{random.randint(1, 10)}.png"
        elif category == "work":
            img_url = f"/work-icon/{random.randint(1, 10)}.png"
        else:
            img_url = None
        
        new_note = Note(title=title, content=content, img_url=img_url, date=date, category=category)
        db.session.add(new_note)
        db.session.commit()
        return jsonify(new_note.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500

# Delete note
@app.route("/api/notes/<int:id>", methods=["DELETE"])
def delete_note(id):
    try:
        note = Note.query.get(id)
        if note is None:
            return jsonify({"error":"Note not found"}), 404
        db.session.delete(note)
        db.session.commit()
        return jsonify({"msg":"Note deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    
# Update note
@app.route("/api/notes/<int:id>", methods=["PATCH"])
def update_note(id):
    try:
        note = Note.query.get(id)
        if note is None:
            return jsonify({"error":"Note not found"}), 404
        data = request.json
        
        note.title = data.get("title", note.title)
        note.content = data.get("content", note.content)
        note.date = data.get("date", note.date)
        note.category = data.get("category", note.category)

        if note.category == "personal":
            note.img_url = f"/personal-icon/{random.randint(1, 10)}.png"
        elif note.category == "work":
            note.img_url = f"/work-icon/{random.randint(1, 10)}.png"
        else:
            note.img_url = None

        db.session.commit()
        return jsonify(note.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500